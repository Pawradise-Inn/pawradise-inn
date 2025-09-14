const prisma = require('../prisma/prisma');
const {findBookedServiceById, overlappingService, isDuplicatedBooking} = require('./logics/bookedService');

const getBookedServices = async (req, res) => {
    try {
        const bookedServices = await prisma.bookedService.findMany();
        if(bookedServices.length === 0) return res.status(404).json({success: false, msg: "No booked services in database"});
        res.status(200).json({success: true, data: bookedServices});
    } catch (err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getBookedService = async (req, res) => { //requirement: 13
    try {
        const bookedServiceId = Number(req.params.id);
        const bookedService = await findBookedServiceById(bookedServiceId);
        if(!bookedService) return res.status(404).json({success: false, msg: 'Booked Service is not found'});
        res.status(200).json({success: true, data: bookedService});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const createBookedService = async (req, res) => {
    try {
        const {serviceId, petId, scheduled, bookingId} = req.body;
        const count = await overlappingService(serviceId, scheduled);
        if (count >= 3) {
            return res.status(400).json({success: false, msg: 'Service is not available'});
        }
        const check = await isDuplicatedBooking(serviceId, petId, scheduled);
        if (check) return res.status(400).json({success: false, msg: 'Your pet had already schedule in this day'});
        const bookedService = await prisma.bookedService.create({
            data: {
                serviceId: serviceId,
                petId: petId,
                bookingId: bookingId,
                checkIn: new Date(scheduled)
            }
        });
        res.status(201).json({success: true, data: bookedService});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const updateBookedService = async (req, res) => {
    try {
        const bookedId = Number(req.params.id);
        const scheduled = req.body.scheduled;
        if(!scheduled) return res.status(400).json({success: false, msg: "Nothing to update"});
        const updateScheduled = new Date(scheduled);
        const bookedService = await findBookedServiceById(bookedId);
        const count = await overlappingService(bookedService.serviceId, updateScheduled);
        if (count >= 3) {
            return res.status(400).json({success: false, msg: 'Service is not available'});
        }
        const check = await isDuplicatedBooking(bookedService.serviceId, bookedService.petId, updateScheduled);
        if (check) return res.status(400).json({success: false, msg: 'Your pet had already schedule in this day'});
        const updateBookedService = await prisma.bookedService.update({
            where: {id: bookedId},
            data: {scheduled: updateScheduled}
        });
        res.status(200).json({success: true, data: updateBookedService});
    } catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Booked service is not found or already deleted'});
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteBookedService = async (req, res) => {
    try {
        const bookedServiceId = Number(req.params.id);
        const bookedService = await prisma.bookedService.delete({
            where: {id: bookedServiceId}
        });
        res.status(200).json({success: true, data: {}});
    } catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Booked service is not found or already deleted'});
        res.status(400).json({success: false, error: err.message});
    }
};

const getMyBookings = async (req, res) => { //requirement: 12
  try {
    const customerId = req.query.customerId;
    const bookings = await prisma.bookedService.findMany({
      select: {
        id: true, 
        scheduled: true,
        booking: {
          select: {
            id: true,
            date: true,
            status: true,
          }
        },
        petId: true,
        pet: {
          select: {
            id: true,
            name: true,
            type: true,
            age: true,
            picture: true
          }
        },
        service: {
          select: {
            picture: true
          }
        }
      }
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ success: false, msg: "No bookings found" });
    }

    const formattedBookings = bookings.map(b => ({
      image: b.service.picture,
      booking_id: b.booking.id,
      booking: b.booking,
      petId: b.petId,
      pet: b.pet
    }));

    res.status(200).json({ success: true, data: formattedBookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = {
    getBookedServices,
    getBookedService,
    createBookedService,
    updateBookedService,
    deleteBookedService
};