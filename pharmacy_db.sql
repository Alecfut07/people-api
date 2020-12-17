DROP DATABASE IF EXISTS `pharmacy_db`;
CREATE DATABASE  IF NOT EXISTS `pharmacy_db`;
USE `pharmacy_db`;

CREATE TABLE `districts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(11) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
INSERT INTO districts (`name`, phone_number, address, email) VALUES
('Farmacia la mejor', '6649998888', 'Av San pedro 111', 'farmacialamejor@gmail.com'),
('Farmacias del Ahorro', '6648797513', 'Gobernador Lugo 9702', 'ahorro@gmail.com');

SET @district_id_a := (SELECT id FROM districts WHERE `name` = 'Farmacia la mejor');
SET @district_id_b := (SELECT id FROM districts WHERE `name` = 'Farmacias del Ahorro');

CREATE TABLE `clients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `district_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `age` INT NULL,
  `cellphone` VARCHAR(11) NOT NULL,
  `birthdate` DATE NULL,
  `email` VARCHAR(45) NOT NULL,
  `rfc` VARCHAR(13) NULL,
  `social` VARCHAR(45) NULL,
  `fact_address` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (district_id) REFERENCES districts(id));
INSERT INTO clients (district_id, `name`, last_name, age, cellphone, birthdate, email, rfc, social, fact_address) VALUES 
(@district_id_a, 'Alexander', 'Casares Padron', 21, '6643512645', '1999-02-14', 'alexander@gmail.com', 'CPMC9902141H0', 'Cesa S.C de LV', 'Av Matamoros 1551'),
(@district_id_b, 'Armando', 'Ortega Partida', 20, '6645512475', '2000-10-11', 'armando003@gmail.com', 'AOPA0010111H0', 'Tienda S.C de RV', 'Av Las Brisas 705'),
(@district_id_a, 'Arturo', 'Gallegos Maqueda', 19, '6645572145', '1998-08-13', 'arturo@gmail.com', 'AGMA9808131H0', 'Gallegos S.C de LV', 'Calle de atrás 123'),
(@district_id_a, 'Daniela', 'Moure Mayol', 22, '6648854475', '1997-06-17', 'daniela@gmail.com', 'DMMD9706171M0', 'La tienda S.C de R.B.', 'Boulevard 123 colimas'),
(@district_id_b, 'Fernando', 'Abarca Toledano', 21, '6645114745', '1998-07-15', 'fernando@gmail.com', 'FATF9807151H0', 'Las tiendas S.C de LV', 'Av Ramona, 009'),
(@district_id_a, 'Roberto', 'Meza Poza', 20, '6642278989', '2000-03-17', 'roberto@gmail.com', 'RMPR0003171H0', 'La farmacia S.C', 'Calle sexta avenida'),
(@district_id_b,'Francisco', 'Menacho Lafuente', 23, '6641555787', '1996-02-20', 'francisco@gmail.com', 'FMLF9602201M0', 'Magic store S.C', 'La calle de enfrente 100'),
(@district_id_a,'David', 'Adell Salvador', 22, '6647755858', '1998-10-25', 'david@gmail.com', 'DASD9810251H0', 'La empresa S.C de LV', 'La calle numero 123'),
(@district_id_b,'Hugo', 'Sainz Florido', 24, '6643325855', '1996-11-26', 'hugo@gmail.com', 'HSFH9611261M0', 'Tienda S.C', 'Av la mega calle'),
(@district_id_a, 'Ramon', 'Hernandez Canals', 25, '6644122545', '1995-12-24', 'ramon@gmail.com', 'RHCR9512241H0', 'Fabrica S.C de LV', 'Av la mega calle'),
(@district_id_b, 'Frida', 'Lobo Fuentes', 22, '6642212235', '1998-04-23', 'frida@gmail.com', 'FLFF9804231H0', 'Fruteria S.C', 'Av Las olas 1100'),
(@district_id_a, 'Daniel', 'Castillejo Pradas', 23, '6647745854', '1997-02-12', 'daniel@gmail.com', 'DCPD9702121H0', 'Nieveria S.C de LV', 'Ramona la calle 100'),
(@district_id_b, 'Patricio', 'Molinero Peral', 22, '6642321252', '1998-06-27', 'patricio@gmail.com', 'PMPP99061271M', 'Mi tienda S.C', 'Av la chap 134'),
(@district_id_a, 'Alfredo', 'Pinto Ezquerra', 24, '6641223211', '1996-07-17', 'alfredo@gmail.com', 'APEA9607171H0', 'Tiendita S.C de LV', 'Chapultepec la Lomita’s 123'),
(@district_id_b, 'Guillermo', 'Osorio Mestre', 23, '6641234567', '1997-06-16', 'guillermo@gmail.com', 'GOMG9706161M0', 'Oxxo S.C', 'Av la revolucion 200');

CREATE TABLE `employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `district_id` INT NOT NULL,
  `type` VARCHAR(30) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `cellphone` VARCHAR(11) NOT NULL,
  `birthdate` DATE NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `salary` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (district_id) REFERENCES districts(id));
INSERT INTO employees (district_id, `type`, `name`, age, cellphone, birthdate, email, salary) VALUES
(@district_id_b, 'Mostrador', 'Clark', 21, '6647879794', '1999-02-14', 'clark@gmail.com', 5465.00),
(@district_id_a, 'Mostrador', 'Dixon', 22, '6640231359', '2000-10-11', 'dixon@gmail.com', 5465.00),
(@district_id_a, 'Mostrador', 'Tobias', 22, '6640254684', '1998-08-13', 'tobias@gmail.com', 5465.00),
(@district_id_a, 'Administrativa', 'Idalia', 22, '6640794631', '1997-06-17', 'idalia@gmail.com', 7800.00),
(@district_id_b, 'Limpieza', 'Carlos', 23, '6640421348', '1998-07-15', 'carlos@gmail.com', 4712.00),
(@district_id_a, 'Jefe Administrativo', 'Andres', 27, '6640571312', '2000-03-17', 'andres@gmail.com', 8500.00),
(@district_id_b, 'Auxiliar de Farmacia', 'Sosa', 25, '6648212005', '1996-02-20', 'sosa@gmail.com', 5191.00),
(@district_id_a, 'Tecnico de farmacia', 'Adrian', 19, '6640521468', '1998-10-25', 'adrian@gmail.com', 5895.00),
(@district_id_b, 'Farmaceutica', 'Aracely', 20, '6644545138', '1996-11-26', 'aracely@gmail.com', 5200.00),
(@district_id_b, 'Farmaceutica auxiliar', 'Mayra', 21, '6640978830', '1995-12-24', 'mayra@gmail.com', 4832.00),
(@district_id_a, 'Farmaceutica auxiliar', 'Gema', 20, '6640546318', '1998-04-23', 'gema@gmail.com', 4832.00),
(@district_id_a, 'Farmaceutico', 'Alexis', 19, '6647451002', '1997-02-12', 'alexis@gmail.com', 5200.00),
(@district_id_b,'Administrativo', 'Eduardo', 18, '6645410046', '1998-06-27', 'eduardo@gmail.com', 7800.00),
(@district_id_a, 'Contabilidad', 'Ivan', 22, '6640302184', '1996-07-17', 'ivan@gmail.com', 7200.00),
(@district_id_a,'Limpieza', 'Sofia', 21, '6648787810', '1997-06-16', 'sofia@gmail.com', 4712.00);

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` INT NOT NULL,
  `district_id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (district_id) REFERENCES districts(id));
INSERT INTO users (employee_id, district_id, username, `password`) VALUES 
(1, @district_id_a, 'Clark01', 'e5TNoZrrPqTjZU00'),
(2, @district_id_b, 'Dixon02', '1lmPyNFYcbjveJJi'),
(3, @district_id_a, 'Tobias03', 'qLHECGWIFgc5fno5'),
(4, @district_id_b, 'Idalia04', 'TsA1yqnMBSFmKQ7F'),
(5, @district_id_a, 'Carlos05', 'jll4BuvsIunVC8zT'),
(6, @district_id_b, 'Andres06', 'PeaMtyPe9Es3DY4e'),
(7, @district_id_a, 'Sosa07', 'g6gtxYSl0KRl8o1P'),
(8, @district_id_b, 'Adrian08', 'JvBIeC2MEIinsPcj'),
(9, @district_id_a, 'Aracely09', 'Bt9F6VHkhodCMnAY'),
(10, @district_id_b, 'Mayra10', 'T3T0WZ1hRIKptusf'),
(11, @district_id_a, 'Gema11', 'dnBh8vbItP7I2TXr'),
(12, @district_id_b, 'Alexis12', 'j7eUQ64hHm8KAKYq'),
(13, @district_id_a, 'Eduardo13', '6b5nL5KXfb1thzYh'),
(14, @district_id_b, 'Ivan14', '8bBADvhA0tK6ehnY'),
(15, @district_id_a, 'Sofia15', 'GfUkXSN9pHMzAr5k');


CREATE TABLE `bills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `district_id` INT NOT NULL,
  `credit_card_type` VARCHAR(100) NOT NULL,
  `order_date` DATE NOT NULL,
  `subtotal` FLOAT NOT NULL,
  `tax` FLOAT NOT NULL,
  `total` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (district_id) REFERENCES districts(id));
INSERT INTO bills (client_id, district_id, credit_card_type, order_date, subtotal, tax, total) VALUES
(1, @district_id_a, 'Visa', '2020-06-22', 58.00, 0.16, 67.28),
(2, @district_id_b, 'Visa', '2020-08-15', 5992.00, 0.16, 6950.72),
(3, @district_id_a, 'Visa', '2020-03-18', 277.00, 0.16, 321.32),
(4, @district_id_b, 'Visa', '2019-12-15', 1038.00, 0.16, 1204.08),
(5, @district_id_a, 'Visa', '2020-05-13', 58.00, 0.16, 67.28),
(6, @district_id_b, 'Master Card', '2020-05-05', 1150.38, 0.16, 1334.44),
(7, @district_id_a, 'Master Card', '2020-03-18', 450.00, 0.16, 522.00),
(8, @district_id_b, 'Master Card', '2020-02-08', 171.00, 0.16, 198.36),
(9, @district_id_a, 'Master Card', '2020-03-04', 1498.00, 0.16, 1737.68),
(10, @district_id_b, 'MasterCard', '2020-01-05', 192.00, 0.16, 222.72),
(11, @district_id_a, 'Visa', '2020-07-25', 87.00, 0.16, 100.92),
(12, @district_id_b, 'Visa', '2020-01-28', 277.00, 0.16, 321.32),
(13, @district_id_a, 'Visa', '2020-04-10', 42.00, 0.16, 48.72),
(14, @district_id_b, 'Visa', '2020-02-16', 114.00, 0.16, 132.24),
(15, @district_id_a, 'Visa', '2019-10-21', 384.00, 0.16, 445.44);

CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`));
INSERT INTO categories (`name`) VALUES 
('Antibioticos'),
('Medicamentos para el asma'),
('Presion arterial'),
('Diabetes'),
('Alivio del dolor'),
('Tratamiento contra el acne'),
('Antidepresivos'),
('Dermatologica'),
('Gastrointestinal'),
('Inmunosupresores'),
('Migrañas'),
('Deja de fumar'),
('Medicamentos para la tiroides'),
('Perdida de peso'),
('Antimicoticos');


CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `details` VARCHAR(200) NOT NULL,
  `stock` INT NOT NULL,
  `category_id` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `stock_max` FLOAT NOT NULL,
  `stock_min` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (category_id) REFERENCES categories(id));
INSERT INTO products (`name`, details, stock, category_id, price, stock_max, stock_min) VALUES 
('Amoxicilina (500 mg) capsulas - caja con 12 capsulas', 'Para tratar infecciones bacterianas.', 100, 1, 35.00, 100, 20),
('Salbutamol (0.1 mg) frasco - 13.05 g = 200 dosis', 'Es un broncodilatador que actua estimulando los receptores para los pulmones.', 70, 2, 57.00, 300, 30),
('Losartan (50 mg) con 30 tabletas en caja', 'Tratamiento para la presion arterial elevada en los adultos y los niños que tienen por lo menos 6 años de edad.', 85, 3, 277.00, 200, 40),
('Metformina (850 mg) con 30 tabletas en caja', 'Reduce la cantidad de glucosa que produce tu higado.', 50, 4, 70.00, 60, 10),
('Aspirina (500 mg) con 40 tabletas en caja', 'Impide el dolor de cabeza.', 66, 5, 29.00, 150, 30),
('Doxiciclina (100 mg) con 10 capsulas en caja', 'Tratamiento para las infecciones de la piel.', 75, 6, 86.00, 200, 20),
('Cipralex (10 mg) cono 28 tabletas en caja', 'Tratamiento para la depresion.', 84, 7, 1498.00, 300, 50),
('Nistatina (100000 ml) frasco con polvo en caja', 'Tratamiento para la candidiasis de la piel.', 36, 8, 346.00, 100, 10),
('Metoclopramida (10 mg) con 20 tabletas en caja', 'Intramuscular o intravenosa.', 49, 9, 21.00, 300, 20),
('Metotrexato (2.5 mg) con 50 tabletas en caja', 'Tratamiento para las manchas rojas del cuerpo.', 50, 10, 999.00, 200, 50),
('Aimovig (70 mg) con pluma precargada', 'Anticuerpo que sirva para prevenir la migraña.', 33, 11, 200.50, 300, 20),
('Equate Nicotine (21 mg) con 14 parches', 'Tratammiento con parches para dejar de fumar.', 71, 12, 575.19, 500, 100),
('Levotiroxina (100 mcg) con 100 tabletas en caja', ' Medicamento para el tratamiento de la glandula tiroides hipoactiva.', 83, 13, 345.00, 150, 25),
('Logar (60 ml) frasco en caja', 'Contribuye a reducir el peso y la grasa.', 91, 14, 192.00, 200, 50),
('Fluconazol (150 mg) en capsulas', 'Impedir el crecimiento de hongos.', 25, 15, 150.00, 100, 20);


CREATE TABLE `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  `details` VARCHAR(150) NOT NULL,
  `total` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (client_id) REFERENCES clients(id));
INSERT INTO orders (product_id, client_id, details, total) VALUES 
(7, 2, 'Cipralex (10 mg) cono 28 tabletas en caja', 4),
(8, 4, 'Nistatina (100000 ml) frasco con polvo en caja', 3),
(9, 13, 'Metoclopramida (10 mg) con 20 tabletas en caja', 2),
(14, 15, 'Logar (60 ml) frasco en caja', 2),
(14, 10, 'Logar (60 ml) frasco en caja', 1),
(3, 3, 'Losartan (50 mg) con 30 tabletas en caja', 1),
(15, 7, 'Fluconazol (150 mg) en capsulas', 3),
(12, 6, 'Equate Nicotine (21 mg) con 14 parches', 2),
(2, 8, 'Salbutamol (0.1 mg) frasco - 13.05 g = 200 dosis', 3),
(2, 14, 'Salbutamol (0.1 mg) frasco - 13.05 g = 200 dosis', 2),
(7, 9, 'Cipralex (10 mg) cono 28 tabletas en caja', 1),
(5, 5, 'Aspirina (500 mg) con 40 tabletas en caja', 2),
(5, 1, 'Aspirina (500 mg) con 40 tabletas en caja', 2),
(5, 11, 'Aspirina (500 mg) con 40 tabletas en caja', 3),
(3, 12, 'Losartan (50 mg) con 30 tabletas en caja', 1);

CREATE TABLE `suppliers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(11) NOT NULL,
  `product_total` INT NOT NULL,
  `total_sold` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
INSERT INTO suppliers (`name`, phone_number, product_total, total_sold, email) VALUES
('Super Tienda', '6644563812', 15220, 5500, 'supertienda@gmail.com'),
('FarmaStore', '6647511355', 20520, 8653, 'farmastore@gmail.com'),
('La mas barata', '6641231351', 16245, 7654, 'lamasbarata@gmail.com'),
('Oxxo', '6645123461', 13548, 8888, 'oxxo@gmail.com'),
('Farma', '6641815151', 15111, 14321, 'farma@gmail.com'),
('Medicinas2x1', '6644845753', 18456, 9998, 'medicinas21@gmail.com'),
('Contra el virus', '6646542134', 17175, 7889, 'contraelvirus@gmail.com'),
('Medicare', '6640654213', 11235, 9864, 'mediacare@gmail.com'),
('Medicina 123', '6642020154', 25132, 320, 'medicina123@gmail.com'),
('pills123', '6645123428', 10505, 522, 'pills123@gmail.com'),
('Pepto', '6649896455', 19888, 4653, 'pepto@gmail.com'),
('Vicks', '6645554466', 17513, 3588, 'vicks@gmail.com'),
('Vaporub', '6643030305', 16668, 10052, 'vaporub@gmail.com'),
('MedicinaInsta', '6645050464', 14589, 11233, 'medicinainsta@gmail.com'),
('RestockMedi', '6647040151', 20150, 15550, 'restokmedi@gmail.com');

CREATE TABLE `price_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `date_time` DATETIME NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id));
INSERT INTO price_history (product_id, user_id, date_time, price) VALUES
(2, 7, '2020-11-14 22:22:25', 300),
(7, 2, '2020-03-25 19:43:45', 200),
(12, 7, '2020-10-06 17:23:35', 133),
(15, 9, '2020-06-03 11:46:25', 50),
(11, 12, '2020-07-18 02:29:35', 177),
(8, 1, '2020-04-12 04:26:45', 22),
(7, 4, '2020-05-26 19:37:37', 60),
(10, 9, '2020-02-29 18:16:45', 700),
(11, 14, '2020-06-11 21:15:38', 500),
(15, 13, '2020-04-13 16:27:27', 450),
(3, 8, '2020-09-18 22:28:16', 330),
(13, 6, '2020-11-19 18:12:33', 250),
(12, 8, '2020-05-20 16:18:24', 300),
(7, 3, '2020-05-21 20:49:54', 200),
(9, 3, '2020-01-23 22:34:54', 200);

CREATE TABLE `addresses` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `bill_id` INT NOT NULL,
    `client_id` INT NOT NULL,
    `district_id` INT NOT NULL,
    `employee_id` INT NOT NULL,
	`supplier_id` INT NOT NULL,
    `street` VARCHAR(45) NOT NULL,
    `number` INT NOT NULL,
    `postal_code` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (bill_id) REFERENCES bills(id),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id));
INSERT INTO addresses (bill_id, client_id, district_id, employee_id, supplier_id, street, `number`, postal_code) VALUES 
(1, 1, @district_id_a, 1, 1, 'Av Matamoros', 1551, 22211),
(2, 2, @district_id_b, 2, 2, 'Av Las Brisas', 705, 22212),
(3, 3, @district_id_a, 3, 3, 'Calle de atrás', 123, 22213),
(4, 4, @district_id_a, 4, 4, 'Boulevard colimas', 333, 22214),
(5, 5, @district_id_b, 5, 5, 'Av Ramona', 9, 22215),
(6, 6, @district_id_a, 6, 6, 'Calle sexta avenida', 1006, 22216),
(7, 7, @district_id_b, 7, 7, 'La calle de enfrente', 100, 22217),
(8, 8, @district_id_a, 8, 8, 'La calle', 70, 22218),
(9, 9, @district_id_b, 9, 9, 'Av la mega calle', 1343, 22219),
(10, 10, @district_id_a, 10, 10, 'Av la mega calle', 1342, 22220),
(11, 11, @district_id_b, 11, 11, 'Av Las olas', 1100, 22221),
(12, 12, @district_id_a, 12, 12, 'Ramona la calle', 118, 22222),
(13, 13, @district_id_b, 13, 13, 'Av la chap', 134, 22223),
(14, 14, @district_id_a, 14, 14, 'Chapultepec la Lomita’s', 240, 22224),
(15, 15, @district_id_b, 15, 15, 'Av la revolucion', 200, 22225);