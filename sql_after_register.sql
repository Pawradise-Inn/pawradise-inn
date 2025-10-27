
-- 1) Customer review ROOM (no reply) - 12 rows
INSERT INTO "ChatLog"
  ("review","reply","rating","review_date","reply_date","show","customerId","staffId","serviceId","roomId")
VALUES
('Nice temperature control and comfy bedding.', NULL, 4, '2025-09-10 11:10:00', NULL, TRUE, 2, NULL, NULL, 2),
('Room a bit small but very tidy.', NULL, 4, '2025-09-10 12:20:00', NULL, TRUE, 3, NULL, NULL, 3),
('Loved the daily photos from the room cam.', NULL, 5, '2025-09-10 13:30:00', NULL, TRUE, 4, NULL, NULL, 1),
('Good ventilation, no pet odor at all.', NULL, 4, '2025-09-10 14:40:00', NULL, TRUE, 5, NULL, NULL, 2),
('Lighting was a bit bright at night.', NULL, 3, '2025-09-10 15:50:00', NULL, TRUE, 6, NULL, NULL, 3),
('Soundproofing worked well, no barking heard.', NULL, 5, '2025-09-10 17:15:00', NULL, TRUE, 8, NULL, NULL, 2),
('Fresh bedding and water always available.', NULL, 4, '2025-09-10 18:25:00', NULL, TRUE, 9, NULL, NULL, 3),
('Aircon took a while to cool.', NULL, 3, '2025-09-10 19:35:00', NULL, TRUE, 10, NULL, NULL, 1),
('CCTV access was super helpful.', NULL, 4, '2025-09-10 20:45:00', NULL, TRUE, 1, NULL, NULL, 2),
('Room looked exactly like the photos.', NULL, 4, '2025-09-10 21:55:00', NULL, TRUE, 2, NULL, NULL, 3);

-- 2) Customer review SERVICE (no reply) - 12 rows
INSERT INTO "ChatLog"
  ("review","reply","rating","review_date","reply_date","show","customerId","staffId","serviceId","roomId")
VALUES
('Grooming was perfect—coat looks shiny.', NULL, 5, '2025-09-11 10:05:00', NULL, TRUE, 11, NULL, 1, NULL),
('Vaccination was quick and gentle.', NULL, 4, '2025-09-11 11:10:00', NULL, TRUE, 4, NULL, 2, NULL),
('Training improved leash manners a lot.', NULL, 4, '2025-09-11 12:20:00', NULL, TRUE, 5, NULL, 3, NULL),
('Checkup was thorough and informative.', NULL, 4, '2025-09-11 13:30:00', NULL, TRUE, 6, NULL, 4, NULL),
('Grooming trim was slightly shorter than asked.', NULL, 3, '2025-09-11 14:40:00', NULL, TRUE, 7, NULL, 1, NULL),
('Vaccination reminder system is great.', NULL, 4, '2025-09-11 15:50:00', NULL, TRUE, 8, NULL, 2, NULL),
('Training staff were friendly and patient.', NULL, 5, '2025-09-11 16:05:00', NULL, TRUE, 9, NULL, 3, NULL),
('Checkup report was clear with next steps.', NULL, 4, '2025-09-11 17:15:00', NULL, TRUE, 10, NULL, 4, NULL),
('Grooming bow was a cute touch!', NULL, 4, '2025-09-11 18:25:00', NULL, TRUE, 1, NULL, 1, NULL),
('Training homework tips were useful.', NULL, 4, '2025-09-11 20:45:00', NULL, TRUE, 3, NULL, 3, NULL),
('Checkup caught an early skin issue—thanks!', NULL, 5, '2025-09-11 21:55:00', NULL, TRUE, 4, NULL, 4, NULL);

-- 3) Staff reply to customer review ROOM - 12 rows (review + reply)
INSERT INTO "ChatLog"
  ("review","reply","rating","review_date","reply_date","show","customerId","staffId","serviceId","roomId")
VALUES
('Room was spotless and smelled fresh.', 'Thank you! We''ll keep the deep-clean schedule consistent.', 4, '2025-09-12 09:10:00', '2025-09-12 10:00:00', TRUE, 11, 1, NULL, 1),
('Noise from hallway at feeding time.', 'Sorry about that—we''ve adjusted feeding slots to reduce noise.', 4, '2025-09-12 10:20:00', '2025-09-12 11:00:00', TRUE, 6, 2, NULL, 2),
('Camera angle could be wider.', 'We''ve repositioned the camera for a wider view. Thanks!', 4, '2025-09-12 11:30:00', '2025-09-12 12:05:00', TRUE, 7, 3, NULL, 3),
('My cat loved the perch!', 'Aww, happy to hear that. We''ll add a second perch next visit.', 4, '2025-09-12 12:40:00', '2025-09-12 13:10:00', TRUE, 8, 4, NULL, 2),
('Water bowl was full all times.', 'Thanks for noticing—hydration checks are hourly.', 4, '2025-09-12 13:50:00', '2025-09-12 14:20:00', TRUE, 9, 5, NULL, 1),
('AC a bit chilly at night.', 'We''ve updated the night temp profile. Sorry for the chill!', 3, '2025-09-12 15:00:00', '2025-09-12 15:35:00', TRUE, 10, 1, NULL, 3),
('Room toys were clean and safe.', 'Glad you liked them—we sanitize toys daily.', 4, '2025-09-12 16:10:00', '2025-09-12 16:40:00', TRUE, 1, 2, NULL, 1),
('Loved the calming music playlist.', 'We''ll share the playlist link with you—thanks!', 5, '2025-09-12 17:20:00', '2025-09-12 17:55:00', TRUE, 11, 3, NULL, 2),
('Door latch was a little stiff.', 'Maintenance has lubricated and tested the latch.', 4, '2025-09-12 18:30:00', '2025-09-12 19:00:00', TRUE, 3, 4, NULL, 3),
('Daily update notes were sweet.', 'We appreciate it—our team loves writing them.', 4, '2025-09-12 19:40:00', '2025-09-12 20:10:00', TRUE, 4, 5, NULL, 1),
('Requested extra blanket—provided fast.', 'Anytime! Comfort is our priority.', 4, '2025-09-12 20:50:00', '2025-09-12 21:15:00', TRUE, 5, 1, NULL, 2),
('Scent diffuser was a bit strong.', 'We''ve lowered the diffuser setting for future stays.', 3, '2025-09-12 22:00:00', '2025-09-12 22:25:00', TRUE, 6, 2, NULL, 3);

-- 4) Staff reply to customer review SERVICE - 12 rows (review + reply)
INSERT INTO "ChatLog"
  ("review","reply","rating","review_date","reply_date","show","customerId","staffId","serviceId","roomId")
VALUES
('Vaccine visit was smooth but parking tight.', 'Thank you—next time we''ll reserve a slot for you.', 4, '2025-09-13 10:15:00', '2025-09-13 10:50:00', TRUE, 8, 4, 2, NULL),
('Training recall command improved a lot.', 'Fantastic progress—keep up the short daily sessions!', 4, '2025-09-13 11:25:00', '2025-09-13 12:00:00', TRUE, 9, 5, 3, NULL),
('Checkup lab results came fast.', 'We''ve streamlined our lab courier—happy it helped.', 4, '2025-09-13 12:35:00', '2025-09-13 13:05:00', TRUE, 10, 1, 4, NULL),
('Grooming nails a bit sharp at edges.', 'We''ve rounded them again—thanks for telling us.', 3, '2025-09-13 13:45:00', '2025-09-13 14:20:00', TRUE, 1, 2, 1, NULL),
('Vaccine consultation answered all questions.', 'Anytime—feel free to message us before the booster.', 4, '2025-09-13 14:55:00', '2025-09-13 15:25:00', TRUE, 2, 3, 2, NULL),
('Training class a bit crowded.', 'We''ve capped class size to 5 pairs—thanks for the feedback.', 3, '2025-09-13 16:05:00', '2025-09-13 16:40:00', TRUE, 3, 4, 3, NULL),
('Checkup dentist tip was useful.', 'Great to hear—dental chews sample ready next visit.', 4, '2025-09-13 17:15:00', '2025-09-13 17:50:00', TRUE, 4, 5, 4, NULL),
('Grooming bow fell off quickly.', 'We''ll secure it better with a softer tie next time.', 4, '2025-09-13 18:25:00', '2025-09-13 18:55:00', TRUE, 5, 1, 1, NULL),
('Vaccine sticker was cute!', 'Hehe, we''ll add a certificate for the fridge too!', 4, '2025-09-13 19:35:00', '2025-09-13 20:05:00', TRUE, 11, 3, 2, NULL),
('Training homework was a bit unclear.', 'We''ve emailed a step-by-step guide video.', 3, '2025-09-13 20:45:00', '2025-09-13 21:20:00', TRUE, 7, 3, 3, NULL),
('Checkup follow-up call appreciated.', 'We care—reach out anytime if signs change.', 5, '2025-09-13 21:55:00', '2025-09-13 22:25:00', TRUE, 8, 4, 4, NULL);

-- Hidden examples for testing "show" flag
INSERT INTO "ChatLog"
  ("review","reply","rating","review_date","reply_date","show","customerId","staffId","serviceId","roomId")
VALUES
('Internal test: hide this room review.', NULL, 4, '2025-09-14 09:00:00', NULL, FALSE, 9, NULL, NULL, 1),
('Internal test: hide this service review.', 'Hidden reply as well.', 3, '2025-09-14 10:00:00', '2025-09-14 10:30:00', FALSE, 10, 5, 2, NULL);

-- Pets for new customer
INSERT INTO "Pet" ("name","sex","age","type","status","breed","disease","allergic","picture","customerId") VALUES
('Buddy','MALE',3,'DOG','IDLE','Beagle','{"Arthritis"}','{"Pollen"}',NULL,11),
('Mittens','FEMALE',2,'CAT','IDLE','Siamese','{"Feline Flu"}','{"Dust"}',NULL,11),
('Charlie','MALE',4,'DOG','IDLE','Labrador','{}','{"Peanuts"}',NULL,11),
('Lola','FEMALE',1,'RABBIT','IDLE','Netherland Dwarf','{"Digestive"}','{}',NULL,11),
('Max','MALE',5,'DOG','IDLE','Golden Retriever','{"Skin Infection"}','{"Wheat"}',NULL,11)