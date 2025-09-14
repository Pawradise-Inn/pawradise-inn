const prisma = require('../prisma/prisma');
const {createBookedRoom} = require('./bookedRoom');
const {createBookedService} = require('./bookedService');

const getBookings = async (req, res) => {
    try {
        const {customerId, status, fields} = req.query;
        const where = {}; 
        if (customerId) where.customerId = parseInt(customerId); 
        if (status) where.status = status; 
        if (fields) { 
            select = {}; 
            fields.split(',').forEach(f => { 
                select[f.trim()] = true; 
            }); 
        }
        const bookings = await prisma.booking.findMany({
            where,
            select
        });
        res.status(200).json({success: true, data: bookings});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const getBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        if (fields) { 
            select = {}; 
            fields.split(',').forEach(f => { 
                select[f.trim()] = true; 
            }); 
        }
        const booking = await prisma.booking.findUnique({
            where: {
                id: Number(bookingId)
            },
            select
        });
        if(!booking){
            return res.status(404).json({success: false, error: 'Booking not found'});
        }
        res.status(200).json({success: true, data: booking});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const updateBookingStatus = async (req, res) => { 
    try {
        const bookingId = req.params.id;
        const status = req.body.status;
        const booking = await prisma.booking.update({
            where: {
                id: Number(bookingId)
            },
            data: {
                status: status
            }
        });

        if (status === 'BOOKED'){
            const {bookedRoomData, bookedServiceData} = req.body;

            if (bookedRoomData && bookedRoomData.length > 0){
                for (const room of bookedRoomData){
                    await createBookedRoom({
                        body: {
                            roomId: room.roomId,
                            petId: room.petId,
                            bookingId: booking.id,
                            checkIn: room.checkIn,
                            checkOut: room.checkOut
                        }
                    },{
                        status: () => {},
                        json: () => {}
                    });
                }
            }

            if (bookedServiceData && bookedServiceData.length > 0){
                for (const service of bookedServiceData){
                    await createBookedService({
                        body: {
                            serviceId: service.serviceId,
                            petId: service.petId,
                            bookingId: booking.id,
                            scheduled: service.scheduled
                        }
                    },{
                        status: () => {},
                        json: () => {}
                    });
                }
            }
        }
        res.status(200).json({success: true, data: booking});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const createBooking = async (req, res) => {
    try {
        const bookingDate = req.body.date;
        const customerId = req.body.customerId;
        const booking = await prisma.booking.create({
            data: {
                customerId: customerId,
                date: new Date(bookingDate),
                status: 'PENDING',
                payment: 'PENDING'
            }
        });
        res.status(201).json({success: true, data: booking});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteBooking = async (req, res) => { 
    try {          
        const bookingId = req.params.id;                         
        const booking = await prisma.booking.delete({
            where : {id : Number(bookingId)}
        });
        res.status(200).json({success: true, data: {}});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const checkBookingStatus = async (req, res) => {
    const bookingId = Number(req.query.id);
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        }
    });

    if(!booking) res
};

const getMyBookings = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    if (!customerId) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    const bookings = await prisma.booking.findMany({
      where: { customerId },
      include: {
        booked_room: { include: { room: true, pet: true } },
        booked_service: { include: { service: true, pet: true } }
      },
    });

    const formattedBookings = bookings.map(b => ({
      bookingId: b.id,
      date: b.date,
      status: b.status,
      rooms: b.booked_room.map(br => ({
        id: br.id,
        image: br.room.picture[0] ?? null,
        roomId: br.room.id,
        checkIn: br.checkIn,
        checkOut: br.checkOut,
        petId: br.petId,
        pet: br.pet ? { id: br.pet.id, name: br.pet.name, type: br.pet.type } : null
      })),
      services: b.booked_service.map(bs => ({
        id: bs.id,
        image: bs.service.picture ?? null,
        serviceId: bs.service.id,
        scheduled: bs.scheduled,
        petId: bs.petId,
        pet: bs.pet ? { id: bs.pet.id, name: bs.pet.name, type: bs.pet.type } : null
      }))
    }));

    res.status(200).json({ success: true, data: formattedBookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
    getBookings,
    getBooking,
    updateBookingStatus,
    createBooking,
    deleteBooking,
    getMyBookings
};
