-- ========================
-- Reset all tables
-- ========================
TRUNCATE TABLE
  "ChatLog",
  "Payment",
  "BookedService",
  "BookedRoom",
  "Booking",
  "Care",
  "RoomStaff",
  "StaffOnService",
  "Pet",
  "Room",
  "Service",
  "Customer",
  "Staff",
  "User"
RESTART IDENTITY CASCADE;

-- ========================
-- Users (5 staff + 10 customers)
-- ========================
INSERT INTO "User" ("firstname","lastname","email","phone_number","user_name","password","role") VALUES
('Alice','Smith','alice.smith@example.com','0810000001','alice_smith','password123','STAFF'),
('Bob','Johnson','bob.johnson@example.com','0810000002','bob_johnson','password123','STAFF'),
('Carol','Williams','carol.williams@example.com','0810000003','carol_williams','password123','STAFF'),
('David','Brown','david.brown@example.com','0810000004','david_brown','password123','STAFF'),
('Eve','Davis','eve.davis@example.com','0810000005','eve_davis','password123','STAFF'),
('Frank','Miller','frank.miller@example.com','0810000010','frank_miller','password123','CUSTOMER'),
('Grace','Wilson','grace.wilson@example.com','0810000011','grace_wilson','password123','CUSTOMER'),
('Hank','Moore','hank.moore@example.com','0810000012','hank_moore','password123','CUSTOMER'),
('Ivy','Taylor','ivy.taylor@example.com','0810000013','ivy_taylor','password123','CUSTOMER'),
('Jack','Anderson','jack.anderson@example.com','0810000014','jack_anderson','password123','CUSTOMER'),
('Kate','Thomas','kate.thomas@example.com','0810000015','kate_thomas','password123','CUSTOMER'),
('Leo','Jackson','leo.jackson@example.com','0810000016','leo_jackson','password123','CUSTOMER'),
('Mia','White','mia.white@example.com','0810000017','mia_white','password123','CUSTOMER'),
('Nick','Harris','nick.harris@example.com','0810000018','nick_harris','password123','CUSTOMER'),
('Olivia','Martin','olivia.martin@example.com','0810000019','olivia_martin','password123','CUSTOMER');

-- ========================
-- Staff
-- ========================
INSERT INTO "Staff" ("wages","bank_company","bank_account","userId") VALUES
(25000.00,'KASIKORN','1234567890',1),
(27000.00,'SCB','1234567891',2),
(26000.00,'KRUNGTHAI','1234567892',3),
(28000.00,'KASIKORN','1234567893',4),
(29000.00,'SCB','1234567894',5);

-- ========================
-- Customers
-- ========================
INSERT INTO "Customer" ("userId") VALUES
(6),(7),(8),(9),(10),(11),(12),(13),(14),(15);

-- ========================
-- Pets (0–3 each customer)
-- ========================
INSERT INTO "Pet" ("name","sex","age","type","status","breed","disease","allergic","picture","customerId") VALUES
('Coco','FEMALE',3,'CAT','IDLE','Persian','{}','{}','',9),
('Rocky','MALE',2,'DOG','IDLE','Bulldog','{"Hip Dysplasia"}','{"Soy"}','',9),
('Bella','FEMALE',1,'DOG','IDLE','Poodle','{}','{}','',10),
('Oscar','MALE',3,'BIRD','IDLE','Parrot','{}','{"Feathers"}','',1),
('Daisy','FEMALE',2,'CAT','IDLE','Maine Coon','{"Asthma"}','{}','',2);

-- ========================
-- Services
-- ========================
INSERT INTO "Service" ("name","price","petType","picture") VALUES
('Grooming',500.00,'{"DOG","CAT"}',''),
('Vaccination',700.00,'{"DOG","CAT","RABBIT"}',''),
('Training',1000.00,'{"DOG"}',''),
('Checkup',400.00,'{"DOG","CAT"}','');

-- ========================
-- Rooms
-- ========================
INSERT INTO "Room" ("capacity","price","picture","petType","name","number") VALUES
(1,2000.00,'','DOG','Room_1',1),
(2,3000.00,'','CAT','Room_2',2),
(1,2500.00,'','RABBIT','Room_3',3);

-- ========================
-- StaffOnService
-- ========================
INSERT INTO "StaffOnService" ("staffId","serviceId") VALUES
(1,1),(2,2),(3,3),(4,4),(5,1);

-- ========================
-- RoomStaff
-- ========================
INSERT INTO "RoomStaff" ("roomId","staffId") VALUES
(1,1),(2,2),(3,3);

-- ========================
-- Bookings
-- ========================
INSERT INTO "Booking" ("date","status","customerId","customerName","customerEmail","customerNumber") VALUES
('2025-09-15 10:00:00','BOOKED',1,'Frank Miller','frank.miller@example.com','0810000010'),
('2025-09-17 14:00:00','PENDING',1,'Frank Miller','frank.miller@example.com','0810000010'),
('2025-09-16 11:00:00','BOOKED',2,'Grace Wilson','grace.wilson@example.com','0810000011'),
('2025-09-18 09:00:00','PENDING',2,'Grace Wilson','grace.wilson@example.com','0810000011'),
('2025-09-16 12:00:00','COMPLETED',3,'Hank Moore','hank.moore@example.com','0810000012'),
('2025-09-17 15:00:00','BOOKED',4,'Ivy Taylor','ivy.taylor@example.com','0810000013'),
('2025-09-18 10:30:00','BOOKED',4,'Jack Anderson','jack.anderson@example.com','0810000014'),
('2025-09-19 13:00:00','PENDING',6,'Kate Thomas','kate.thomas@example.com','0810000015');

-- ========================
-- BookedRooms
-- ========================
INSERT INTO "BookedRoom" ("roomId","petId","checkIn","checkOut","bookingId") VALUES
(1,1,'2025-09-15 10:00:00','2025-09-16 10:00:00',1),
(2,2,'2025-09-17 14:00:00','2025-09-18 14:00:00',2),
(2,3,'2025-09-16 11:00:00','2025-09-17 11:00:00',3),
(3,4,'2025-09-18 09:00:00','2025-09-19 09:00:00',4),
(1,5,'2025-09-16 12:00:00','2025-09-17 12:00:00',5);

-- ========================
-- BookedServices
-- ========================
INSERT INTO "BookedService" ("serviceId","petId","scheduled","booking_id") VALUES
(1,1,'2025-09-15 11:00:00',1),
(2,1,'2025-09-15 15:00:00',1),
(1,2,'2025-09-17 15:00:00',2),
(3,3,'2025-09-16 12:00:00',3),
(2,4,'2025-09-18 10:00:00',4),
(1,5,'2025-09-16 13:00:00',5);

-- ========================
-- Payments
-- ========================
INSERT INTO "Payment" ("cost","date","status","bookingId","customerId","customerName","customerEmail","customerNumber") VALUES
(1000.00,'2025-09-15 16:00:00','COMPLETED',1,6,'Frank Miller','frank.miller@example.com','0810000010'),
(500.00,'2025-09-17 16:00:00','PENDING',2,6,'Frank Miller','frank.miller@example.com','0810000010'),
(400.00,'2025-09-16 12:30:00','COMPLETED',3,7,'Grace Wilson','grace.wilson@example.com','0810000011'),
(700.00,'2025-09-18 10:30:00','PENDING',4,7,'Grace Wilson','grace.wilson@example.com','0810000011');