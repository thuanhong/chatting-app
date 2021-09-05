CREATE TABLE `users` (
  `id` varchar(255) PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `is_online` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `message` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `sender_id` varchar(255) NOT NULL,
  `group_id` varchar(255) NOT NULL,
  `is_event` boolean,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `groupChat` (
  `id` varchar(255) PRIMARY KEY,
  `group_name` varchar(255) NOT NULL,
  `last_message` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `userGroup` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `group_id` varchar(255) NOT NULL,
  `is_active` boolean NOT NULL,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `frienship` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `frienship` varchar(255) NOT NULL,
  `type` varchar(255),
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `notification` (
  `id_notify` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `notify_type` varchar(255) NOT NULL,
  `notify_desc` varchar(255) NOT NULL,
  `status` boolean,
  `created_at` timestamp DEFAULT now(),
  `modified_at` timestamp DEFAULT now() ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `notification` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `userGroup` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `userGroup` ADD FOREIGN KEY (`group_id`) REFERENCES `groupChat` (`id`);

ALTER TABLE `message` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

ALTER TABLE `message` ADD FOREIGN KEY (`group_id`) REFERENCES `groupChat` (`id`);

ALTER TABLE `frienship` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);


insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800000a', 'Kayle', 'Lawrey', 'Dilaudid HP', false, 'klawrey0@smh.com.au');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800000b', 'Orrin', 'Ironmonger', 'buprenorphine hydrochloride', true, 'oironmonger1@hibu.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800000c', 'Barbie', 'Benezet', 'wet n wild', true, 'bbenezet2@paginegialle.it');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800000d', 'Goran', 'Dilliston', 'Wheat Bunt', false, 'gdilliston3@bing.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800000e', 'Frazer', 'Penny', 'SAFEWAY', false, 'fpenny4@techcrunch.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800000f', 'Annaliese', 'Farquar', 'ANTIBACTERIAL FOAMING', false, 'afarquar5@fc2.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000010', 'Mendy', 'Brislen', 'SYAGRUS ROMANZOFFIANA POLLEN', false, 'mbrislen6@symantec.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000011', 'Ethelbert', 'Sam', 'Sandy Beige Always color stay-on Makeup Broad Spectrum SPF 15', true, 'esam7@nytimes.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000012', 'Nestor', 'Rookeby', 'Gabapentin', false, 'nrookeby8@abc.net.au');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000013', 'Gran', 'Toe', 'Americaine', false, 'gtoe9@scribd.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000014', 'Halette', 'Upcraft', 'Lachesis Mutus', false, 'hupcrafta@theatlantic.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000015', 'Jephthah', 'Piburn', 'Podofilox', false, 'jpiburnb@ihg.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000016', 'Fred', 'Martinez', 'CUT CLEANER', true, 'fmartinezc@ebay.co.uk');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000017', 'Odella', 'Browell', 'CVTOX', true, 'obrowelld@alibaba.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000018', 'Isaac', 'Stapels', 'Cyanocobalamin', true, 'istapelse@sun.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000019', 'Jerrold', 'Dummett', 'equaline ibuprofen', false, 'jdummettf@tuttocitta.it');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800001a', 'Arny', 'Crate', 'shing-Releev', true, 'acrateg@nih.gov');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800001b', 'Bunny', 'Heading', 'Healthy Accents Pain Relief', true, 'bheadingh@apache.org');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800001c', 'Gerald', 'Jennrich', 'KLEENEX E2 Foam Skin Cleanser', false, 'gjennrichi@pagesperso-orange.fr');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800001d', 'Hank', 'Matyushonok', 'benzonatate', false, 'hmatyushonokj@nature.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800001e', 'Dani', 'Morch', 'IMIPRAMINE PAMOATE', true, 'dmorchk@yahoo.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800001f', 'Berthe', 'Bohea', 'TUMS', true, 'bboheal@virginia.edu');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000020', 'Dasya', 'Veryard', 'Asthma', false, 'dveryardm@geocities.jp');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000021', 'Taddeo', 'Lindenstrauss', 'Ramipril', true, 'tlindenstraussn@google.it');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000022', 'Agnes', 'Linder', 'Octreotide Acetate', false, 'alindero@hhs.gov');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000023', 'Larina', 'Arnecke', 'sunmark antacid', true, 'larneckep@usda.gov');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000024', 'Ilse', 'Uttridge', 'Phenyl Isothiocyanate', false, 'iuttridgeq@ihg.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000025', 'Udale', 'McLelland', 'Lucky', false, 'umclellandr@joomla.org');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000026', 'Ladonna', 'Forder', 'DR. IASO', true, 'lforders@howstuffworks.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000027', 'Freemon', 'Assaf', 'Hydrocodone Bitartrate and Acetaminophen Tablets', false, 'fassaft@virginia.edu');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000028', 'Bartholemy', 'Chapple', 'Quelicin', true, 'bchappleu@ebay.co.uk');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000029', 'Iorgos', 'Castle', 'Methocarbamol', true, 'icastlev@yellowbook.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800002a', 'Honey', 'Pavlishchev', 'Ondansetron Hydrochloride', false, 'hpavlishchevw@time.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800002b', 'Mabel', 'Learmont', 'Alprazolam', false, 'mlearmontx@ca.gov');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800002c', 'Bartholomeo', 'Jeste', 'MEGACE', true, 'bjestey@ucla.edu');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800002d', 'Pia', 'Rieger', 'Antimicrobial Wipes Citrus Scented', true, 'priegerz@a8.net');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800002e', 'Tabatha', 'Bockmaster', 'Quetiapine Fumarate', true, 'tbockmaster10@wikispaces.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800002f', 'Abeu', 'Eymor', 'Treatment Set TS333519', false, 'aeymor11@java.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000030', 'Zebedee', 'MacIntyre', 'M WOMANS EROS BODY GLIDE', true, 'zmacintyre12@squarespace.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000031', 'Pernell', 'Heisler', 'Maximum Strength Menstrual Relief', true, 'pheisler13@hugedomains.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000032', 'Ashil', 'Burtt', 'VAGI-CURE (MAXIMUM STRENGTH)', true, 'aburtt14@engadget.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000033', 'Edlin', 'Aulds', 'Cepacol', false, 'eaulds15@washingtonpost.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000034', 'Thibaut', 'Garret', 'Hansan Spray', true, 'tgarret16@clickbank.net');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000035', 'Vanni', 'Guihen', 'Paroxetine Hydrochloride', false, 'vguihen17@youtu.be');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000036', 'Rena', 'Saywood', 'Birch', true, 'rsaywood18@marriott.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000037', 'Augustin', 'Enstone', 'JANUVIA', true, 'aenstone19@mtv.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000038', 'Candis', 'Rickhuss', 'Methimazole', true, 'crickhuss1a@zdnet.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c8000039', 'Matthias', 'Henstridge', 'K-EFFERVESCENT', true, 'mhenstridge1b@icq.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800003a', 'Meghan', 'Huggett', 'Synthroid', true, 'mhuggett1c@howstuffworks.com');
insert into users (id, first_name, last_name, middle_name, is_online, email) values ('61346cfafc13ae32c800003b', 'Ashlen', 'O''Teague', 'Vitamin E Moisture', false, 'aoteague1d@tinyurl.com');

insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300046', 'Yamia', 'Suspendisse potenti Nullam porttitor lacus at turpis');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300047', 'Voonte', 'Vivamus tortor Duis mattis egestas metus');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300048', 'Kimia', 'Proin risus');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300049', 'Twiyo', 'Sed vel enim sit amet nunc viverra dapibus');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430004a', 'Buzzster', 'Quisque ut erat Curabitur gravida nisi at nibh');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430004b', 'Kwinu', 'Proin at turpis a pede posuere nonummy Integer non velit');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430004c', 'Voonyx', 'Proin eu mi');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430004d', 'Edgeify', 'Integer ac leo');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430004e', 'Ntag', 'Ut tellus');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430004f', 'Rhynyx', 'Suspendisse potenti');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300050', 'Innojam', 'Pellentesque ultrices mattis odio');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300051', 'Twimbo', 'Pellentesque at nulla');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300052', 'Skynoodle', 'Phasellus sit amet erat');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300053', 'Topiclounge', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300054', 'Zoombeat', 'Suspendisse accumsan tortor quis turpis Sed ante');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300055', 'Quatz', 'In hac habitasse platea dictumst');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300056', 'Wikizz', 'Nulla suscipit ligula in lacus Curabitur at ipsum ac tellus semper interdum');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300057', 'Voonyx', 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem Duis aliquam convallis nunc');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300058', 'Jabbercube', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa Donec dapibus');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300059', 'Kayveo', 'In est risus, auctor sed, tristique in, tempus sit amet, sem Fusce consequat');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430005a', 'Divape', 'Proin interdum mauris non ligula pellentesque ultrices');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430005b', 'Roombo', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo Maecenas pulvinar lobortis est');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430005c', 'Dabjam', 'Integer a nibh');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430005d', 'Youtags', 'Praesent blandit Nam nulla');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430005e', 'Fanoodle', 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430005f', 'Chatterpoint', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300060', 'Thoughtworks', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo Maecenas pulvinar lobortis est');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300061', 'Riffpath', 'Suspendisse ornare consequat lectus In est risus, auctor sed, tristique in, tempus sit amet, sem');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300062', 'Skinix', 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede Morbi porttitor lorem id ligula');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300063', 'Meezzy', 'Morbi non quam nec dui luctus rutrum');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300064', 'Babblestorm', 'In hac habitasse platea dictumst');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300065', 'Eadel', 'Ut at dolor quis odio consequat varius');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300066', 'Quatz', 'Integer ac leo Pellentesque ultrices mattis odio');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300067', 'Aimbu', 'Donec vitae nisi Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300068', 'Youspan', 'Morbi non lectus');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300069', 'LiveZ', 'Praesent blandit lacinia erat');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430006a', 'Flashdog', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430006b', 'Mybuzz', 'Cras pellentesque volutpat dui');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430006c', 'Rhyloo', 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue Aliquam erat volutpat');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430006d', 'Mydo', 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl Nunc rhoncus dui vel sem');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430006e', 'Feedbug', 'Vestibulum rutrum rutrum neque');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat430006f', 'Kanoodle', 'Cras pellentesque volutpat dui');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300070', 'Wikido', 'Etiam faucibus cursus urna');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300071', 'Minyx', 'Nulla nisl');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300072', 'Twinte', 'Praesent lectus');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300073', 'Muxo', 'Curabitur in libero ut massa volutpat convallis Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300074', 'Zoomcast', 'Mauris lacinia sapien quis libero Nullam sit amet turpis elementum ligula vehicula consequat');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300075', 'Plambee', 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam Nam tristique tortor eu pede');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300076', 'Oba', 'Curabitur at ipsum ac tellus semper interdum');
insert into groupChat (id, group_name, last_message) values ('34359983ty54stat4300077', 'Zoomzone', 'Nunc nisl');
