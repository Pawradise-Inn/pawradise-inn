/**
 * Swagger Components Module
 * This module exports reusable components for Swagger API documentation.
 * 
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
 *         - role
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
 *           default: KASIKORN
 *           enum: [KASIKORN, SCB, KRUNGTHAI]
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