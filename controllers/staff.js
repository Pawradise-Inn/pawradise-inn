const prisma = require('../prisma/prisma');

// —— Utility: Bangkok day range (returns UTC Date objects) ——
// function getBangkokTodayRange() {
//   const tzOffsetMinutes = 7 * 60; // UTC+7
//   const now = new Date();
//   const bangkokNow = new Date(now.getTime() + tzOffsetMinutes * 60 * 1000);
//   const y = bangkokNow.getUTCFullYear();
//   const m = bangkokNow.getUTCMonth();
//   const d = bangkokNow.getUTCDate();
//   const startBangkok = new Date(Date.UTC(y, m, d, 0, 0, 0));
//   const endBangkok = new Date(Date.UTC(y, m, d, 23, 59, 59, 999));
//   const startUTC = new Date(startBangkok.getTime() - tzOffsetMinutes * 60 * 1000);
//   const endUTC = new Date(endBangkok.getTime() - tzOffsetMinutes * 60 * 1000);
//   return { startUTC, endUTC };
// } 

// /**
//  * 1) TAB: Today's Booking — any booking that intersects today
//  * GET /staff/today/bookings
//  */
// exports.getTodayBookings = async (req, res) => {
//   try {
//     const { startUTC, endUTC } = getBangkokTodayRange();
//     // Intersect condition: (checkIn <= endOfDay) AND (checkOut >= startOfDay)
//     const bookings = await prisma.booking.findMany({
//       where: {
//         checkIn: { lte: endUTC },
//         checkOut: { gte: startUTC },
//       },
//       include: {
//         customer: { include: { user: true } },
//         bookedRooms: { include: { pet: true, room: true } },   // ⬅️ adjust relation names if needed
//         bookedServices: { include: { service: true, pet: true } },
//       },
//       orderBy: { checkIn: 'asc' },
//     });
//     res.status(200).json({ success: true, data: bookings });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// /**
//  * 2) TAB: Check-in — pets scheduled to check in today
//  * GET /staff/today/checkins
//  */
// exports.getTodayCheckIns = async (req, res) => {
//   try {
//     const { startUTC, endUTC } = getBangkokTodayRange();
//     // BookedRoom (or your stay model) with checkIn BETWEEN today
//     const checkins = await prisma.bookedRoom.findMany({
//       where: {
//         checkIn: { gte: startUTC, lte: endUTC },
//       },
//       include: {
//         pet: true,
//         room: true,
//         booking: { include: { customer: { include: { user: true } } } },
//       },
//       orderBy: { checkIn: 'asc' },
//     });
//     res.status(200).json({ success: true, data: checkins });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// /**
//  * 3) TAB: Check-out — pets scheduled to check out today
//  * GET /staff/today/checkouts
//  */
// exports.getTodayCheckOuts = async (req, res) => {
//   try {
//     const { startUTC, endUTC } = getBangkokTodayRange();
//     // BookedRoom with checkOut BETWEEN today
//     const checkouts = await prisma.bookedRoom.findMany({
//       where: {
//         checkOut: { gte: startUTC, lte: endUTC },
//       },
//       include: {
//         pet: true,
//         room: true,
//         booking: { include: { customer: { include: { user: true } } } },
//       },
//       orderBy: { checkOut: 'asc' },
//     });
//     res.status(200).json({ success: true, data: checkouts });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// /**
//  * 4) TAB: Service Booked — active services where the end time hasn't arrived
//  * Definition: now < endAt (and optionally status === 'ACTIVE')
//  * GET /staff/today/services
//  */
// exports.getActiveServices = async (req, res) => {
//   try {
//     const now = new Date();
//     const { q, take = 50, skip = 0 } = req.query;

//     const where = {
//       // If you track status, uncomment:
//       // status: 'ACTIVE',
//       endAt: { gt: now },
//       ...(q
//         ? {
//             OR: [
//               { service: { name: { contains: q, mode: 'insensitive' } } },
//               { pet: { name: { contains: q, mode: 'insensitive' } } },
//               {
//                 booking: {
//                   customer: {
//                     user: {
//                       OR: [
//                         { firstname: { contains: q, mode: 'insensitive' } },
//                         { lastname: { contains: q, mode: 'insensitive' } },
//                       ],
//                     },
//                   },
//                 },
//               },
//             ],
//           }
//         : {}),
//     };

//     const [items, total] = await Promise.all([
//       prisma.bookedService.findMany({
//         where,
//         include: {
//           service: true,
//           pet: true,
//           booking: { include: { customer: { include: { user: true } } } },
//         },
//         orderBy: [{ scheduledAt: 'asc' }],
//         take: Number(take),
//         skip: Number(skip),
//       }),
//       prisma.bookedService.count({ where }),
//     ]);

//     res.status(200).json({ success: true, data: items, meta: { total, take: Number(take), skip: Number(skip) } });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// /**
//  * 5) Pets currently staying in the hotel "right now"
//  *    We look at BookedRoom stays where checkIn <= now AND (checkOut IS NULL OR checkOut > now)
//  * 
//  * GET /staff/current-stays
//  */
// exports.getCurrentStays = async (req, res) => {
//   try {
//     const now = new Date();

//     // If your relation name is BookedRoom, adjust to what your schema uses.
//     const stays = await prisma.bookedRoom.findMany({
//       where: {
//         checkIn: { lte: now },
//         OR: [
//           { checkOut: null },
//           { checkOut: { gt: now } },
//         ],
//       },
//       include: {
//         pet: true,
//         room: true,
//         booking: {
//           include: {
//             customer: { include: { user: true } },
//           },
//         },
//       },
//       orderBy: { checkIn: 'asc' },
//     });

//     // Map to unique pets in hotel
//     const petsInHotelMap = new Map();
//     stays.forEach(st => {
//       if (st.pet) petsInHotelMap.set(st.pet.id, st.pet);
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         stays,
//         petsInHotel: Array.from(petsInHotelMap.values()),
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

/**
 * 6) Add new service
 * 
 * POST /staff/services
 * body: { name, price, description, durationMinutes }
 */
exports.createService = async (req, res) => {
  try {
    const { name, price, petType, picture } = req.body;
    if (!name || price == null || !petType) {
      return res.status(400).json({ success: false, error: "name, price, and petType are required" });
    }

    const service = await prisma.service.create({
      data: {
        name,
        price,
        petType,
        picture: picture ? Buffer.from(picture, "base64") : null,
      },
    });

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * 7) Add new room
 * 
 * POST /staff/rooms
 * body: { number, type, capacity, pricePerNight, notes }
 */
exports.createRoom = async (req, res) => {
  try {
    const { capacity, price, picture, petType } = req.body;
    if (!capacity || price == null || !petType) {
      return res.status(400).json({ success: false, error: "capacity, price, and petType are required" });
    }

    const room = await prisma.room.create({
      data: {
        capacity,
        price,
        picture,
        petType,
      },
    });

    res.status(201).json({ success: true, data: room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
    console.log(err.stack);
  }
};

/**
 * 8) Update pet status
 * 
 * PATCH /staff/pets/:petId/status
 * body: { status }  // must be one of your PetStatus enum values
 */
exports.updatePetStatus = async (req, res) => {
  try {
    const petId = Number(req.params.id);
    console.log(petId);
    const { status } = req.body;
    if (Number.isNaN(petId)) {
      return res.status(400).json({ success: false, error: "Invalid petId" });
    }
    if (!status) {
      return res.status(400).json({ success: false, error: "status is required" });
    }

    const pet = await prisma.pet.update({
      where: { id: petId },
      data: { status }, // must match your Prisma enum PetStatus
    });

    res.status(200).json({ success: true, data: pet });
  } catch (err) {
    // If pet not found, Prisma throws P2025
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: "Pet not found" });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * 9) Update staff profile (update both User and Staff table fields)
 *    Requires auth: req.user.id should be the User.id of the staff member
 * 
 * PATCH /staff/profile
 * body: { firstname, lastname, phone_number, ...staffSpecificFields }
 */
exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ensure your auth middleware sets req.user
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { firstname, lastname, email, phone_number, user_name, password, wages, bank_company, bank_account} = req.body;

    // Update within a transaction to keep user/staff consistent
    const result = await prisma.$transaction(async (tx) => {
      // Update User base record
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          firstname,
          lastname,
          email,
          phone_number,
          user_name,
          password,
        },
      });

      // Update Staff record using userId (assuming Staff has userId unique)
      const updatedStaff = await tx.staff.update({
        where: { userId }, // adjust if your Staff primary key is different
        data: {
            wages,
            bank_company,
            bank_account
         },
      });

      return { updatedUser, updatedStaff };
    });

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: "Staff profile not found" });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};
