/**
 * Swagger Components Module
 * This module exports reusable components for Swagger API documentation.
 * 
 * Security Schemes Definition
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token in the format **Bearer &lt;token&gt;**
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 *       description: Authentication token stored in cookie
 */
 
/** 
 * USER Schema Definition
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         firstname:
 *           type: string
 *           maxLength: 30
 *           description: The first name of this user.
 *         lastname:
 *           type: string
 *           maxLength: 30
 *           description: The last name of this user.
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 50
 *           description: The unique email of this user.
 *         phone_number:
 *           type: string
 *           minLength: 10
 *           maxLength: 10
 *           description: The unique phone number of this user.
 *         user_name:
 *           type: string
 *           maxLength: 50
 *           description: The unique username of this user.
 *         password:
 *           type: string
 *           format: password
 *           writeOnly: true
 *           maxLength: 255
 *           description: The password of this user.
 *         role:
 *           type: string
 *           description: The role of this user.
 *           enum: [STAFF, CUSTOMER]
 *           default: CUSTOMER
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - phone_number
 *         - user_name
 *         - password
 *       example:
 *         id: 3
 *         firstname: bung
 *         lastname: sell
 *         email: bungsell@gmail.com
 *         phone_number: "0987654321"
 *         user_name: bungsell
 *         password: $2b$10$xOEAFWicf92Tgi3Cm1rh.ORMgxbMPEaynVXDILbbhl/Ni2D7wAL.2
 *         role: CUSTOMER
 */

/**
 * STAFF Schema Definition
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the staff.
 *         wages:
 *           type: number
 *           format: double
 *           description: The wages of this staff.
 *         bank_company:
 *           type: string
 *           description: The bank company of this staff.
 *         bank_account:
 *           type: string
 *           description: The unique bank account number of this staff.
 *         userId:
 *           type: integer
 *           description: The user ID associated with this staff.
 *       required:
 *         - wages
 *         - bank_company
 *         - bank_account
 *         - userId
 *       example:
 *         id: 1
 *         wages: 15000.00
 *         bank_company: KASIKORN
 *         bank_account: "555-555-5555"
 *         userId: 1
 */

/**
 * CUSTOMER Schema Definition
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the customer.
 *         userId:
 *           type: integer           
 *           description: The user ID associated with this customer.
 *       required:
 *         - userId
 *       example:
 *         id: 1
 *         userId: 2
 */

/**
 * PET Schema Definition
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id: 
 *           type: integer
 *           description: The auto-generated id of the pet
 *         name:
 *           type: string
 *           maxLength: 30
 *           description: The name of the pet
 *         sex:
 *           type: string
 *           description: The sex of the pet
 *           default: MALE
 *           enum: [MALE, FEMALE]
 *         age:
 *           type: Integer
 *           description: The age of the pet
 *         type:
 *           type: string
 *           description: The type of the pet
 *           enum: [DOG, CAT, BIRD, MOUSE, RABBIT]
 *           default: DOG
 *         status:
 *          type: string
 *          description: The status of the pet
 *          enum: [IDLE, CHECKED_IN, CHECKED_OUT, QUEUE, IN_PROCESS, COMPLETED]
 *         breed:
 *           type: string
 *           maxLength: 30
 *           description: The breed of the pet
 *         disease:
 *           type: Array
 *           description: The disease of the pet
 *           items:
 *             maxLength: 30
 *             type: string
 *             uniqueItems: true
 *         allergic:
 *           type: Array
 *           description: The allergic of the pet
 *           items:
 *             maxLength: 30
 *             type: string
 *             uniqueItems: true
 *         picture:
 *           type: string
 *           description: The picture URL of the pet
 *           default: "https://storage.googleapis.com/paw_image/unnamed.jpg"
 *         customerId:
 *           type: Integer
 *           description: The customer ID associated with this pet
 *       required:
 *         - name
 *         - age
 *         - breed
 *         - disease
 *         - allergic
 *         - customerId
 *       example:
 *         id: 2
 *         name: Meow
 *         sex: FEMALE
 *         age: 21
 *         type: CAT
 *         status: IDLE
 *         breed: Scottish Fold
 *         disease:
 *           - Tiger's fur
 *         allergic:
 *           - Cucumber
 *         picture: "https://storage.googleapis.com/paw_image/unnamed.jpg"
 */

/**
 * ChatLog Schema Definition
 * @swagger
 * components:
 *   schemas:
 *     ChatLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the chat log.
 *         review:
 *           type: string
 *           nullable: true
 *           description: The review message from the customer.
 *         reply:
 *           type: string
 *           nullable: true
 *           description: The reply message from the staff.
 *         rating:
 *           type: integer
 *           nullable: true
 *           default: 5
 *           description: The rating given by the customer (1-5).
 *         review_date:
 *           type: string
 *           nullable: true
 *           format: date
 *           description: The date when the review was made.
 *         reply_date:
 *           type: string
 *           nullable: true
 *           format: date
 *           description: The date when the reply was made.
 *         show:
 *           type: boolean
 *           description: Indicates if the chat log is visible to customers.
 *         isRead:
 *           type: boolean
 *           description: Indicates if the chat log has been read when updated.
 *         customerId:
 *           type: integer
 *           description: The customer ID associated with this chat log.
 *         staffId:
 *           type: integer
 *           nullable: true
 *           description: The staff ID associated with this chat log.
 *         anyOf:
 *           properties:
 *             serviceId:
 *               type: integer
 *               nullable: false
 *               description: The service ID associated with this chat log.
 *             roomId:
 *               type: integer
 *               nullable: false
 *               description: The room ID associated with this chat log.
 *       required:
 *         - review
 *         - rating
 *         - review_date
 *         - customerId
 *       example:
 *         id: 4
 *         review: "I love this room"
 *         reply: "Thank you"
 *         rating: 4
 *         review_date: "2025-11-02"
 *         reply_date: "2025-11-03"
 *         customerId: 1
 *         staffId: 1
 *         serviceId: null
 *         roomId: 11
 *         show: true
 *         isRead: false
 */

/**
 * ROOM Schema Definition
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the room.
 *         name:
 *           type: string
 *           maxLength: 30
 *           description: The name of the room.
 *         number:
 *           type: integer
 *           description: The unique number of the room.
 *           default: 100
 *         capacity:
 *           type: integer
 *           description: The capacity of the room.
 *           default: 1
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the room.
 *           default: 2000.00
 *         picture:
 *           type: string
 *           description: The picture URL of the room.
 *           default: "https://storage.googleapis.com/paw_image/unnamed.jpg"
 *         petType:
 *           type: string
 *           description: The type of pet suitable for the room.
 *           enum: [DOG, CAT, BIRD, MOUSE, RABBIT]
 *           default: DOG
 *       required:
 *         - name
 *         - number
 *       example:
 *         id: 1
 *         name: "Large Standard Room"
 *         number: 101
 *         capacity: 20
 *         price: 200
 *         picture: "https://storage.googleapis.com/paw_image/unnamed.jpg"
 *         petType: "MOUSE"
 */

/**
 * BOOKEDROOM Schema Definition
 * @swagger
 * components:
 *   schemas:
 *     BookedRoom:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the booked room.
 *         checkIn:
 *           type: string
 *           format: date
 *           description: The check-in date for the booked room.
 *         checkOut:
 *           type: string
 *           format: date
 *           description: The check-out date for the booked room.
 *         status:
 *           type: string
 *           description: The status of the booked room.
 *           enum: [PENDING, RESERVED, CHECKED_IN, CHECKED_OUT, CANCELLED]
 *           default: RESERVED
 *         roomId:
 *           type: integer
 *           description: The room ID associated with this booked room.
 *         petId:
 *           type: integer
 *           description: The pet ID associated with this booked room.
 *         bookingId:
 *           type: integer
 *           description: The booking ID associated with this booked room.
 *       required:
 *         - checkIn
 *         - checkOut
 *         - roomId
 *         - petId
 *         - bookingId
 *       example:
 *         id: 1
 *         checkIn: "2025-12-01"
 *         checkOut: "2025-12-05"
 *         status: RESERVED
 *         roomId: 1
 *         petId: 1
 *         bookingId: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the service
 *         name:
 *           type: string
 *           maxLength: 30
 *           description: The name of the service
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the service
 *           default: 500.00
 *         petType:
 *           type: array
 *           items:
 *             type: string
 *             enum: [DOG, CAT, BIRD, RABBIT, MOUSE]
 *           description: The pet types applicable for the service
 *         picture:
 *           type: string
 *           description: The picture URL of the service
 *           default: "https://storage.googleapis.com/paw_image/unnamed.jpg"
 *       required:
 *         - name
 *         - petType
 *       example:
 *         id: 6
 *         name: Grooming
 *         price: 2000.00
 *         petType:
 *           - DOG
 *           - CAT
 *         picture: "https://storage.googleapis.com/paw_image/unnamed.jpg"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BookedService:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the booked service
 *         scheduled:
 *           type: string
 *           format: date-time
 *           description: The date and time of the booked service
 *         status:
 *           type: string
 *           description: The status of the booked service
 *           enum: [PENDING, RESERVED, QUEUE, IN_PROCESS, COMPLETED, CANCELLED]
 *           default: RESERVED
 *         serviceId:
 *           type: integer
 *           description: The service ID
 *         petId:
 *           type: integer
 *           description: The pet ID
 *         bookingId:
 *           type: integer
 *           description: The booking ID
 *       required:
 *         - scheduled
 *         - serviceId
 *         - petId
 *         - bookingId
 *       example:
 *         id: 1
 *         scheduled: "2025-10-15T10:00:00Z"
 *         status: RESERVED
 *         serviceId: 6
 *         petId: 1
 *         bookingId: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the booking.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the booking was made.
 *         status:
 *           type: string
 *           description: The status of the booking.
 *           enum: [BOOKED, CANCELLED]
 *           default: BOOKED
 *         customerId:
 *           type: integer
 *           description: The customer ID associated with this booking.
 *         paymentId:
 *           type: integer
 *           description: The payment ID associated with this booking.
 *         customerName:
 *           type: string
 *           description: The name of the customer who made the booking.
 *         customerEmail:
 *           type: string
 *           format: email
 *           description: The email of the customer who made the booking.
 *         customerNumber:
 *           type: string
 *           description: The phone number of the customer who made the booking.
 *       required:
 *         - date
 *         - customerId
 *         - paymentId
 *       example:
 *         id: 2
 *         date: "2025-11-06-T15:24:24.000Z"
 *         status: PENDING
 *         customerId: 1
 *         paymentId: 2
 *         customerName: "Bung Sell"
 *         customerEmail: "bungsell@gmail.com"
 *         customerNumber: "0987654321"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the payment.
 *         cost:
 *           type: number
 *           format: double
 *           description: The total cost of the payment.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the payment was made.
 *         status:
 *           type: string
 *           description: The status of the payment.
 *           enum: [PENDING, SUCCESS, FAILED]
 *           default: PENDING
 *         slip:
 *           type: string
 *           description: The picture URL of the payment receipt.
 *         customerId:
 *           type: integer
 *           description: The customer ID associated with this payment.
 *       required:
 *         - cost
 *         - date
 *         - status
 *         - slip
 *         - customerId
 *       example:
 *         id: 1
 *         cost: 4500.00
 *         date: "2025-10-10T14:40:00Z"
 *         status: SUCCESS
 *         slip: "https://storage.googleapis.com/paw_image/slip/slipExample.jpg"
 *         customerId: 2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartRoom:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the cart record.
 *         cartId:
 *           type: integer
 *           description: The cart ID which store this room.
 *         roomId:
 *           type: integer
 *           description: The room ID which wanted by customer.
 *         petId:
 *           type: integer
 *           description: The pet ID which reserve to this room.
 *         checkIn:
 *           type: string
 *           format: date
 *           description: The check-in date for the room. 
 *         checkOut:
 *           type: string
 *           format: date
 *           description: The check-out date for this room.
 *         selected:
 *           type: boolean
 *           description: The status for checking if this item is selected.
 *           default: false
 *       required:
 *         - roomId
 *         - petId
 *         - checkIn
 *         - checkOut
 *       example:
 *         id: 4
 *         cartId: 1
 *         roomId: 2
 *         petId: 5
 *         checkIn: "2025-11-06T00:00:00.000Z"
 *         checkOut: "2025-11-08T00:00:00.000Z"
 *         selected: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartService:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the cart record.
 *         cartId:
 *           type: integer
 *           description: The cart ID which store this service.
 *         serviceId:
 *           type: integer
 *           description: The service ID which wanted by customer.
 *         petId:
 *           type: integer
 *           description: The pet ID which reserve to this service.
 *         scheduled:
 *           type: string
 *           format: date-time
 *           description: The check-in date-time for the service. 
 *         selected:
 *           type: boolean
 *           description: The status for checking if this item is selected.
 *           default: false
 *       required:
 *         - serviceId
 *         - petId
 *         - scheduled
 *       example:
 *         id: 4
 *         cartId: 1
 *         serviceId: 1
 *         petId: 2
 *         scheduled: "2025-11-12T10:00:00.000Z"
 *         selected: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the cart record.
 *         customerId:
 *           type: integer
 *           description: The customer ID who provided the care.
 *       required:
 *         - customerId
 *       example:
 *         id: 4
 *         customerId: 1
 */        

/**
 * @swagger
 * components:
 *   schemas:
 *     Care:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the care record.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the care was provided.
 *         staff_id:
 *           type: integer
 *           description: The staff ID who provided the care.
 *         pet_id:
 *           type: integer
 *           description: The pet ID associated with this care record.
 *         anyOf:
 *           properties:
 *             bs_id:
 *               type: integer
 *               description: The booked service ID associated with this care record.
 *             br_id:
 *               type: integer
 *               description: The booked room ID associated with this care record.
 *       required:
 *         - date
 *         - staff_id
 *         - pet_id
 *         - anyOf
 *       example:
 *         id: 1
 *         date: "2025-10-20T08:00:00Z"
 *         status: IN_PROCESS
 *         staff_id: 1
 *         pet_id: 2
 *         bs_id: 3
 */