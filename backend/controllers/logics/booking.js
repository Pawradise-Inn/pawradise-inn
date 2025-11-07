const prisma = require("../../prisma/prisma");

const createBookingTransaction = async (user, body) => {
    const userId = user.id;       
    const customerId = user.roleId; 

    const {
        amount,
        status,
        slip,
    } = body;

    const { payment, booking } = await prisma.$transaction(async (tx) => {
        
        const userData = await tx.user.findUnique({
            where: { id: userId }, 
        });

        const newPayment = await tx.payment.create({
            data: {
                amount: amount,
                date: new Date(),
                status: status,
                slip: slip,
                customerId: customerId, 
            },
        });

        let newBooking = null;
        let bookingStatus = "PENDING";
        let itemStatus = "PENDING";
        if (status === "SUCCESS") {
            bookingStatus = "BOOKED";
            itemStatus = "RESERVED";
        }

        newBooking = await tx.booking.create({
            data: {
                customerId: customerId,
                date: new Date(),
                status: bookingStatus,
                paymentId: newPayment.id,
                customerName: userData.firstname + " " + userData.lastname,
                customerEmail: userData.email,
                customerNumber: userData.phone_number,
            },
        });

            // 9. Find the customer's cart
        const cart = await tx.cart.findFirst({
            where: { customerId: customerId },
            select: { id: true } 
        });

        if (cart) {
            // 10. Process and create BookedRooms
            const cartRooms = await tx.cartRoom.findMany({
                where: { cartId: cart.id, selected: true }, 
            });
            if (cartRooms?.length > 0) {
                const bookedRoomData = cartRooms.map((room) => ({
                    roomId: room.roomId,
                    petId: room.petId,
                    bookingId: newBooking.id, 
                    checkIn: room.checkIn,
                    checkOut: room.checkOut,
                    status: itemStatus,
                }));
                await tx.bookedRoom.createMany({ data: bookedRoomData });
            }

            const cartServices = await tx.cartService.findMany({
                where: { cartId: cart.id, selected: true }, 
            });
            if (cartServices?.length > 0) {
                const bookedServiceData = cartServices.map((service) => ({
                    serviceId: service.serviceId,
                    petId: service.petId,
                    booking_id: newBooking.id,
                    scheduled: service.scheduled,
                    status: itemStatus,
                }));
                await tx.bookedService.createMany({ data: bookedServiceData });
            }

            await tx.cartRoom.deleteMany({
                where: { cartId: cart.id, selected: true }
            });
            await tx.cartService.deleteMany({
                where: { cartId: cart.id, selected: true }
            });

        } else {
                console.log(`No cart found for customerId: ${customerId}. Booking created without items.`);
        }
        
        return { payment: newPayment, booking: newBooking };
    });

    return { payment, booking, status };
};

module.exports = {
    createBookingTransaction
};