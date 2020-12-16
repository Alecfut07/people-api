DROP DATABASE IF EXISTS `ortega_cruz-pharmacy`;
CREATE DATABASE  IF NOT EXISTS `ortega_cruz-pharmacy`;
USE `ortega_cruz-pharmacy`;


CREATE TABLE `cliente` (
  `idCliente` INT NOT NULL,
  `idDistrict` INT NOT NULL,
  `nombreCliente` VARCHAR(45) NOT NULL,
  `apellidosCliente` VARCHAR(50) NOT NULL,
  `edadCliente` INT NULL,
  `numeroCelular` VARCHAR(11) NOT NULL,
  `direccionCliente` VARCHAR(45) NOT NULL,
  `fechaDeNacimiento` DATE NULL,
  `correoCliente` VARCHAR(45) NOT NULL,
  `RFC` VARCHAR(13) NULL,
  `raonSocial` VARCHAR(45) NULL,
  `dirFact` VARCHAR(45) NULL,
  PRIMARY KEY (`idCliente`));
INSERT INTO `cliente` (`idCliente`, `idDistrict`, `nombreCliente`, `apellidosCliente`, `edadCliente`, `numeroCelular`, `direccionCliente`, `fechaDeNacimiento`, `correoCliente`, `RFC`, `raonSocial`, `dirFact`) VALUES 
(1, 1, 'Alexander', 'Casares Padron', 21, '6643512645', 'Av Matamoros 1551', '1999-02-14', 'alexander@gmail.com', 'CPMC9902141H0', 'Cesa S.C de LV', 'Av Matamoros 1551'),
(2, 2, 'Armando', 'Ortega Partida', 20, '6645512475', 'Av Las Brisas 705', '2000-10-11', 'armando003@gmail.com', 'AOPA0010111H0', 'Tienda S.C de RV', 'Av Las Brisas 705'),
(3, 1, 'Arturo', 'Gallegos Maqueda', 19, '6645572145', 'Calle de atrás 123', '1998-08-13', 'arturo@gmail.com', 'AGMA9808131H0', 'Gallegos S.C de LV', 'Calle de atrás 123'),
(4, 1, 'Daniela', 'Moure Mayol', 22, '6648854475', 'Boulevard 123 colimas', '1997-06-17', 'daniela@gmail.com', 'DMMD9706171M0', 'La tienda S.C de R.B.', 'Boulevard 123 colimas'),
(5, 2, 'Fernando', 'Abarca Toledano', 21, '6645114745', 'Av Ramona, 009', '1998-07-15', 'fernando@gmail.com', 'FATF9807151H0', 'Las tiendas S.C de LV', 'Av Ramona, 009'),
(6, 1, 'Roberto', 'Meza Poza', 20, '6642278989', 'Calle sexta avenida', '2000-03-17', 'roberto@gmail.com', 'RMPR0003171H0', 'La farmacia S.C', 'Calle sexta avenida'),
(7, 2,'Francisco', 'Menacho Lafuente', 23, '6641555787', 'La calle de enfrente 100', '1996-02-20', 'francisco@gmail.com', 'FMLF9602201M0', 'Magic store S.C', 'La calle de enfrente 100'),
(8, 1,'David', 'Adell Salvador', 22, '6647755858', 'La calle numero 123', '1998-10-25', 'david@gmail.com', 'DASD9810251H0', 'La empresa S.C de LV', 'La calle numero 123'),
(9, 2,'Hugo', 'Sainz Florido', 24, '6643325855', 'Av la mega calle', '1996-11-26', 'hugo@gmail.com', 'HSFH9611261M0', 'Tienda S.C', 'Av la mega calle'),
(10, 1, 'Ramon', 'Hernandez Canals', 25, '6644122545', 'Av la mega calle', '1995-12-24', 'ramon@gmail.com', 'RHCR9512241H0', 'Fabrica S.C de LV', 'Av la mega calle'),
(11, 2, 'Frida', 'Lobo Fuentes', 22, '6642212235', 'Av Las olas 1100', '1998-04-23', 'frida@gmail.com', 'FLFF9804231H0', 'Fruteria S.C', 'Av Las olas 1100'),
(12, 1, 'Daniel', 'Castillejo Pradas', 23, '6647745854', 'Ramona la calle 100', '1997-02-12', 'daniel@gmail.com', 'DCPD9702121H0', 'Nieveria S.C de LV', 'Ramona la calle 100'),
(13, 2, 'Patricio', 'Molinero Peral', 22, '6642321252', 'Av la chap 134', '1998-06-27', 'patricio@gmail.com', 'PMPP99061271M', 'Mi tienda S.C', 'Av la chap 134'),
(14, 1, 'Alfredo', 'Pinto Ezquerra', 24, '6641223211', 'Chapultepec la Lomita’s 123', '1996-07-17', 'alfredo@gmail.com', 'APEA9607171H0', 'Tiendita S.C de LV', 'Chapultepec la Lomita’s 123'),
(15, 2, 'Guillermo', 'Osorio Mestre', 23, '6641234567', 'Av la revolucion 200', '1997-06-16', 'guillermo@gmail.com', 'GOMG9706161M0', 'Oxxo S.C', 'Av la revolucion 200');


CREATE TABLE `user` (
  `idUser` INT NOT NULL,
  `idEmployee` INT NOT NULL,
  `idDistrict` INT NOT NULL,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `nivelAcceso` INT NOT NULL,
  `tipoRol` VARCHAR(30) NOT NULL,
  `detallesRol` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`idUser`));
INSERT INTO `user` (`idUser`, `idEmployee`, `idDistrict`, `nombreUsuario`, `password`, `nivelAcceso`, `tipoRol`, `detallesRol`) VALUES 
(1, 1, 1, 'Clark01', 'e5TNoZrrPqTjZU00', 1, 'JEFE', 'Aquel usuario que tiene privilegios de administrador.'),
(2, 2, 2, 'Dixon02', '1lmPyNFYcbjveJJi', 2, 'JEFE CONSULTAS', 'Que solo se le permita realizar consultas.'),
(3, 3, 1, 'Tobias03', 'qLHECGWIFgc5fno5', 3, 'JEFE PRIVILEGIOS', 'Que solo pueda aplicar privilegios a los usuarios de base de datos.'),
(4, 4, 2, 'Idalia04', 'TsA1yqnMBSFmKQ7F', 4, 'JEFE INSERCIÓN', 'Usuarios que solo puede gestionar inserción de datos en la base de datos.'),
(5, 5, 1, 'Carlos05', 'jll4BuvsIunVC8zT', 0, '-', '-'),
(6, 6, 2, 'Andres06', 'PeaMtyPe9Es3DY4e', 0, '-', '-'),
(7, 7, 1, 'Sosa07', 'g6gtxYSl0KRl8o1P', 0, '-', '-'),
(8, 8, 2, 'Adrian08', 'JvBIeC2MEIinsPcj', 0, '-', '-'),
(9, 9, 1, 'Aracely09', 'Bt9F6VHkhodCMnAY', 0, '-', '-'),
(10, 10, 2, 'Mayra10', 'T3T0WZ1hRIKptusf', 0, '-', '-'),
(11, 11, 1, 'Gema11', 'dnBh8vbItP7I2TXr', 0, '-', '-'),
(12, 12, 2, 'Alexis12', 'j7eUQ64hHm8KAKYq', 0, '-', '-'),
(13, 13, 1, 'Eduardo13', '6b5nL5KXfb1thzYh', 0, '-', '-'),
(14, 14, 2, 'Ivan14', '8bBADvhA0tK6ehnY', 0, '-', '-'),
(15, 15, 1, 'Sofia15', 'GfUkXSN9pHMzAr5k', 0, '-', '-');


CREATE TABLE `bill` (
  `idBill` INT(11) NOT NULL,
  `idCliente` INT NOT NULL,
  `idDistrict` INT NOT NULL,
  `creditCardType` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(300) NOT NULL,
  `fechaPedido` DATE NOT NULL,
  `subtotal` FLOAT NOT NULL,
  `iva` FLOAT NOT NULL,
  `cantidadTotal` FLOAT NOT NULL,
  PRIMARY KEY (`idBill`));
INSERT INTO `bill` (`idBill`, `idCliente`, `idDistrict`, `creditCardType`, `direccion`, `fechaPedido`, `subtotal`, `iva`, `cantidadTotal`) VALUES
(1, 1, 1, 'Visa', 'Av Matamoros 1551', '2020-06-22', 58.00, 0.16, 67.28),
(2, 2, 2, 'Visa', 'Av Las Brisas 705', '2020-08-15', 5992.00, 0.16, 6950.72),
(3, 3, 1, 'Visa', 'Calle de atrás 123', '2020-03-18', 277.00, 0.16, 321.32),
(4, 4, 2, 'Visa', 'Boulevard 123 colimas', '2019-12-15', 1038.00, 0.16, 1204.08),
(5, 5, 1, 'Visa', 'Av Ramona, 009', '2020-05-13', 58.00, 0.16, 67.28),
(6, 6, 2, 'Master Card', 'Calle sexta avenida', '2020-05-05', 1150.38, 0.16, 1334.44),
(7, 7, 1, 'Master Card', 'La calle de enfrente 100', '2020-03-18', 450.00, 0.16, 522.00),
(8, 8, 2, 'Master Card', 'La calle numero 123', '2020-02-08', 171.00, 0.16, 198.36),
(9, 9, 1, 'Master Card', 'Av la mega calle', '2020-03-04', 1498.00, 0.16, 1737.68),
(10, 10, 2, 'MasterCard', 'Av la mega calle', '2020-01-05', 192.00, 0.16, 222.72),
(11, 11, 1, 'Visa', 'Av Las olas 1100', '2020-07-25', 87.00, 0.16, 100.92),
(12, 12, 2, 'Visa', 'Ramona la calle 100', '2020-01-28', 277.00, 0.16, 321.32),
(13, 13, 1, 'Visa', 'Av la chap 134', '2020-04-10', 42.00, 0.16, 48.72),
(14, 14, 2, 'Visa', 'Chapultepec la Lomita’s 123', '2020-02-16', 114.00, 0.16, 132.24),
(15, 15, 1, 'Visa', 'Av la revolucion 200', '2019-10-21', 384.00, 0.16, 445.44);

CREATE TABLE `category` (
  `idCategoria` INT NOT NULL,
  `nombreCategoria` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idCategoria`));
INSERT INTO `category` (`idCategoria`, `nombreCategoria`) VALUES 
(1, 'Antibioticos'),
(2, 'Medicamentos para el asma'),
(3, 'Presion arterial'),
(4, 'Diabetes'),
(5, 'Alivio del dolor'),
(6, 'Tratamiento contra el acne'),
(7, 'Antidepresivos'),
(8, 'Dermatologica'),
(9, 'Gastrointestinal'),
(10, 'Inmunosupresores'),
(11, 'Migrañas'),
(12, 'Deja de fumar'),
(13, 'Medicamentos para la tiroides'),
(14, 'Perdida de peso'),
(15, 'Antimicoticos');


CREATE TABLE `products` (
  `idProducto` INT NOT NULL,
  `nombreProducto` VARCHAR(100) NOT NULL,
  `detallesProducto` VARCHAR(200) NOT NULL,
  `stock` INT NOT NULL,
  `idCategoria` INT NOT NULL,
  `precio` FLOAT NOT NULL,
  `stockMax` FLOAT NOT NULL,
  `stockMin` FLOAT NOT NULL,
  PRIMARY KEY (`idProducto`));
INSERT INTO `products` (`idProducto`, `nombreProducto`, `detallesProducto`, `stock`, `idCategoria`, `precio`, `stockMax`, `stockMin`) VALUES 
(1, 'Amoxicilina (500 mg) capsulas - caja con 12 capsulas', 'Para tratar infecciones bacterianas.', 100, 1, 35.00, 100, 20),
(2, 'Salbutamol (0.1 mg) frasco - 13.05 g = 200 dosis', 'Es un broncodilatador que actua estimulando los receptores para los pulmones.', 70, 2, 57.00, 300, 30),
(3, 'Losartan (50 mg) con 30 tabletas en caja', 'Tratamiento para la presion arterial elevada en los adultos y los niños que tienen por lo menos 6 años de edad.', 85, 3, 277.00, 200, 40),
(4, 'Metformina (850 mg) con 30 tabletas en caja', 'Reduce la cantidad de glucosa que produce tu higado.', 50, 4, 70.00, 60, 10),
(5, 'Aspirina (500 mg) con 40 tabletas en caja', 'Impide el dolor de cabeza.', 66, 5, 29.00, 150, 30),
(6, 'Doxiciclina (100 mg) con 10 capsulas en caja', 'Tratamiento para las infecciones de la piel.', 75, 6, 86.00, 200, 20),
(7, 'Cipralex (10 mg) cono 28 tabletas en caja', 'Tratamiento para la depresion.', 84, 7, 1498.00, 300, 50),
(8, 'Nistatina (100000 ml) frasco con polvo en caja', 'Tratamiento para la candidiasis de la piel.', 36, 8, 346.00, 100, 10),
(9, 'Metoclopramida (10 mg) con 20 tabletas en caja', 'Intramuscular o intravenosa.', 49, 9, 21.00, 300, 20),
(10, 'Metotrexato (2.5 mg) con 50 tabletas en caja', 'Tratamiento para las manchas rojas del cuerpo.', 50, 10, 999.00, 200, 50),
(11, 'Aimovig (70 mg) con pluma precargada', 'Anticuerpo que sirva para prevenir la migraña.', 33, 11, 200.50, 300, 20),
(12, 'Equate Nicotine (21 mg) con 14 parches', 'Tratammiento con parches para dejar de fumar.', 71, 12, 575.19, 500, 100),
(13, 'Levotiroxina (100 mcg) con 100 tabletas en caja', ' Medicamento para el tratamiento de la glandula tiroides hipoactiva.', 83, 13, 345.00, 150, 25),
(14, 'Logar (60 ml) frasco en caja', 'Contribuye a reducir el peso y la grasa.', 91, 14, 192.00, 200, 50),
(15, 'Fluconazol (150 mg) en capsulas', 'Impedir el crecimiento de hongos.', 25, 15, 150.00, 100, 20);


CREATE TABLE `orders` (
  `idPedido` INT NOT NULL,
  `idProducto` INT NOT NULL,
  `idCliente` INT NOT NULL,
  `detallesPedido` VARCHAR(150) NOT NULL,
  `cantidadPedidoProducto` INT NOT NULL,
  PRIMARY KEY (`idPedido`));
INSERT INTO `orders` (`idPedido`, `idProducto`, `idCliente`, `detallesPedido`, `cantidadPedidoProducto`) VALUES 
(1, 7, 2, 'Cipralex (10 mg) cono 28 tabletas en caja', 4),
(2, 8, 4, 'Nistatina (100000 ml) frasco con polvo en caja', 3),
(3, 9, 13, 'Metoclopramida (10 mg) con 20 tabletas en caja', 2),
(4, 14, 15, 'Logar (60 ml) frasco en caja', 2),
(5, 14, 10, 'Logar (60 ml) frasco en caja', 1),
(6, 3, 3, 'Losartan (50 mg) con 30 tabletas en caja', 1),
(7, 15, 7, 'Fluconazol (150 mg) en capsulas', 3),
(8, 12, 6, 'Equate Nicotine (21 mg) con 14 parches', 2),
(9, 2, 8, 'Salbutamol (0.1 mg) frasco - 13.05 g = 200 dosis', 3),
(10, 2, 14, 'Salbutamol (0.1 mg) frasco - 13.05 g = 200 dosis', 2),
(11, 7, 9, 'Cipralex (10 mg) cono 28 tabletas en caja', 1),
(12, 5, 5, 'Aspirina (500 mg) con 40 tabletas en caja', 2),
(13, 5, 1, 'Aspirina (500 mg) con 40 tabletas en caja', 2),
(14, 5, 11, 'Aspirina (500 mg) con 40 tabletas en caja', 3),
(15, 3, 12, 'Losartan (50 mg) con 30 tabletas en caja', 1);

CREATE TABLE `district` (
  `idDistrict` INT NOT NULL,
  `nombreDistrict` VARCHAR(45) NOT NULL,
  `telDistrict` VARCHAR(11) NOT NULL,
  `direccionDistrict` VARCHAR(45) NOT NULL,
  `correoDistrict` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDistrict`));
INSERT INTO `district` (`idDistrict`, `nombreDistrict`, `telDistrict`, `direccionDistrict`, `correoDistrict`) VALUES
(1, 'Farmacia la mejor', '6649998888', 'Av San pedro 111', 'farmacialamejor@gmail.com'),
(2, 'Farmacias del Ahorro', '6648797513', 'Gobernador Lugo 9702', 'ahorro@gmail.com');

CREATE TABLE `employee` (
  `idEmployee` INT(11) NOT NULL,
  `idDistrict` INT NOT NULL,
  `tipoEmployee` VARCHAR(30) NOT NULL,
  `nombreEmployee` VARCHAR(45) NOT NULL,
  `edadEmployee` INT NOT NULL,
  `numeroCelEmployee` VARCHAR(11) NOT NULL,
  `direccionEmployee` VARCHAR(45) NOT NULL,
  `fechaDeNacEmployee` DATE NOT NULL,
  `correoEmployee` VARCHAR(45) NOT NULL,
  `salario` FLOAT NOT NULL,
  PRIMARY KEY (`idEmployee`));
INSERT INTO `employee` (`idEmployee`, `idDistrict`, `tipoEmployee`, `nombreEmployee`, `edadEmployee`, `numeroCelEmployee`, `direccionEmployee`, `fechaDeNacEmployee`, `correoEmployee`, `salario`) VALUES
(1, 2, 'Mostrador', 'Clark', 21, '6647879794', 'Av Matamoros 1551', '1999-02-14', 'clark@gmail.com', 5465.00),
(2, 1, 'Mostrador', 'Dixon', 22, '6640231359', 'Av Las Brisas 705', '2000-10-11', 'dixon@gmail.com', 5465.00),
(3, 1, 'Mostrador', 'Tobias', 22, '6640254684', 'Calle de atrás 123', '1998-08-13', 'tobias@gmail.com', 5465.00),
(4, 1, 'Administrativa', 'Idalia', 22, '6640794631', 'Boulevard 123 colimas', '1997-06-17', 'idalia@gmail.com', 7800.00),
(5, 2, 'Limpieza', 'Carlos', 23, '6640421348', 'Av Ramona, 009', '1998-07-15', 'carlos@gmail.com', 4712.00),
(6, 1, 'Jefe Administrativo', 'Andres', 27, '6640571312', 'Calle sexta avenida', '2000-03-17', 'andres@gmail.com', 8500.00),
(7, 2, 'Auxiliar de Farmacia', 'Sosa', 25, '6648212005', 'La calle de enfrente 100', '1996-02-20', 'sosa@gmail.com', 5191.00),
(8, 1, 'Tecnico de farmacia', 'Adrian', 19, '6640521468', 'La calle numero 123', '1998-10-25', 'adrian@gmail.com', 5895.00),
(9, 2, 'Farmaceutica', 'Aracely', 20, '6644545138', 'Av la mega calle', '1996-11-26', 'aracely@gmail.com', 5200.00),
(10, 2, 'Farmaceutica auxiliar', 'Mayra', 21, '6640978830', 'Av la mega calle', '1995-12-24', 'mayra@gmail.com', 4832.00),
(11, 1, 'Farmaceutica auxiliar', 'Gema', 20, '6640546318', 'Av Las olas 1100', '1998-04-23', 'gema@gmail.com', 4832.00),
(12, 1, 'Farmaceutico', 'Alexis', 19, '6647451002', 'Ramona la calle 100', '1997-02-12', 'alexis@gmail.com', 5200.00),
(13, 2,'Administrativo', 'Eduardo', 18, '6645410046', 'Av la chap 134', '1998-06-27', 'eduardo@gmail.com', 7800.00),
(14, 1, 'Contabilidad', 'Ivan', 22, '6640302184', 'Chapultepec la Lomita’s 123', '1996-07-17', 'ivan@gmail.com', 7200.00),
(15, 1,'Limpieza', 'Sofia', 21, '6648787810', 'Av la revolucion 200', '1997-06-16', 'sofia@gmail.com', 4712.00);

CREATE TABLE `supplier` (
  `idSupplier` INT(11) NOT NULL,
  `nombreSupplier` VARCHAR(45) NOT NULL,
  `telefonoSupplier` VARCHAR(11) NOT NULL,
  `totalProductos` INT NOT NULL,
  `totalVendido` INT NOT NULL,
  `direccionSupplier` VARCHAR(45) NOT NULL,
  `correoSupplier` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSupplier`));
INSERT INTO `supplier` (`idSupplier`, `nombreSupplier`, `telefonoSupplier`, `totalProductos`, `totalVendido`, `direccionSupplier`, `correoSupplier`) VALUES
(1, 'Super Tienda', '6644563812', 15220, 5500, 'Av Matamoros 1551', 'supertienda@gmail.com'),
(2, 'FarmaStore', '6647511355', 20520, 8653, 'Av Las Brisas 705', 'farmastore@gmail.com'),
(3, 'La mas barata', '6641231351', 16245, 7654, 'Calle de atrás 123', 'lamasbarata@gmail.com'),
(4, 'Oxxo', '6645123461', 13548, 8888, 'Boulevard 123 colimas', 'oxxo@gmail.com'),
(5, 'Farma', '6641815151', 15111, 14321, 'Av Ramona, 009', 'farma@gmail.com'),
(6, 'Medicinas2x1', '6644845753', 18456, 9998, 'Calle sexta avenida', 'medicinas21@gmail.com'),
(7, 'Contra el virus', '6646542134', 17175, 7889, 'La calle de enfrente 100', 'contraelvirus@gmail.com'),
(8, 'Medicare', '6640654213', 11235, 9864, 'La calle numero 123', 'mediacare@gmail.com'),
(9, 'Medicina 123', '6642020154', 25132, 320, 'Av la mega calle', 'medicina123@gmail.com'),
(10, 'pills123', '6645123428', 10505, 522, 'Av la mega calle', 'pills123@gmail.com'),
(11, 'Pepto', '6649896455', 19888, 4653, 'Av Las olas 1100', 'pepto@gmail.com'),
(12, 'Vicks', '6645554466', 17513, 3588, 'Ramona la calle 100', 'vicks@gmail.com'),
(13, 'Vaporub', '6643030305', 16668, 10052, 'Av la chap 134', 'vaporub@gmail.com'),
(14, 'MedicinaInsta', '6645050464', 14589, 11233, 'Chapultepec la Lomita’s 123', 'medicinainsta@gmail.com'),
(15, 'RestockMedi', '6647040151', 20150, 15550, 'Av la revolucion 200', 'restokmedi@gmail.com');

CREATE TABLE `historialDePrecios` (
  `idHistorialPrecio` INT NOT NULL,
  `idProducto` INT NOT NULL,
  `idUser` INT NOT NULL,
  `fecha_hora` DATETIME NOT NULL,
  `precio` INT NOT NULL,
  PRIMARY KEY (`idHistorialPrecio`));
INSERT INTO `historialDePrecios` (`idHistorialPrecio`, `idProducto`, `idUser`, `fecha_hora`, `precio`) VALUES
(1, 2, 7, '2020-11-14 22:22:25', 300),
(2, 7, 2, '2020-03-25 19:43:45', 200),
(3, 12, 7, '2020-10-06 17:23:35', 133),
(4, 15, 9, '2020-06-03 11:46:25', 50),
(5, 11, 12, '2020-07-18 02:29:35', 177),
(6, 8, 1, '2020-04-12 04:26:45', 22),
(7, 7, 4, '2020-05-26 19:37:37', 60),
(8, 10, 9, '2020-02-29 18:16:45', 700),
(9, 11, 14, '2020-06-11 21:15:38', 500),
(10, 15, 13, '2020-04-13 16:27:27', 450),
(11, 3, 8, '2020-09-18 22:28:16', 330),
(12, 13, 6, '2020-11-19 18:12:33', 250),
(13, 12, 8, '2020-05-20 16:18:24', 300),
(14, 7, 3, '2020-05-21 20:49:54', 200),
(15, 9, 3, '2020-01-23 22:34:54', 200);

/*10 CONSULTAS*/
/*1) ¿A cuál de las dos farmacias visitan más?.*/
create view c1 as select distinct district.idDistrict, district.nombreDistrict, count(cliente.idCliente) as CantidadClientes from district inner join cliente on district.idDistrict = cliente.idDistrict group by district.idDistrict;
drop view c1;

/*2) Ver a los empleados con un saldo mayor a 5700*/
create view c2 as select employee.idEmployee, employee.nombreEmployee, employee.salario from employee where (employee.salario < 1000000);
drop view c2;

/*3) Mostrar listado de proveedores con su total de vendido*/
create view c3 as select supplier.nombreSupplier, supplier.totalVendido from supplier group by (supplier.nombreSupplier) order by (max(supplier.totalVendido)) DESC;
drop view c3;

/*4) Mostrar las cantidades totales de cada producto que fueron ordenados*/
create view c4 as select orders.idProducto, orders.detallesPedido, count(orders.cantidadPedidoProducto) as cantidadPedido, products.stock, products.stockMin, products.stockMax  from orders inner join products on orders.idProducto = products.idProducto group by orders.idProducto; 
drop view c4;

/*5) Mostrar la relación de cada producto con su categoria*/
create view c5 as select category.nombreCategoria, products.nombreProducto from category inner join products on category.idCategoria = products.idProducto; 
drop view c5;

/*6) Ventas 2020*/
create view c6 as select * from bill where fechaPedido between '2020-01-22' and '2020-09-15';
drop view c6;

/*7) Para mostrar stock bajo*/
create view c7 as SELECT products.idProducto, products.nombreProducto, products.stock, products.stockMin, products.stockMax FROM products where (products.stock < 50);
drop view c7;

/*8) Clientes que sean menor de 21*/
create view c8 as SELECT cliente.idCliente, cliente.nombreCliente, cliente.apellidosCliente, cliente.numeroCelular, cliente.edadCliente FROM cliente where (cliente.edadCliente < 21);
drop view c8;

/*9) cantidad total de trabajadores por tipo de empleado*/
create view c9 as SELECT employee.tipoEmployee, count(*) as totalCat from employee group by employee.tipoEmployee;
drop view c9;

/*10) la venta mas alta*/
create view c10 as SELECT idBill, idCliente, idDistrict, creditCardType, direccion, fechaPedido, MAX(cantidadTotal) FROM bill;
drop view c10;

/*Modificar uno de los usuarios creados (acceso y privilegios)*/
update `user` set `user`.nivelAcceso = 5, `user`.tipoRol = 'JEFE PERFILES', `user`.detallesRol = 'Usuario administrador que solo puede crear perfiles limitando recursos a los que tienen acceso otros usuarios cuando se conectan a la BD.' where `user`.idUser = 4;

/*5 Procedimientos Almacenados*/
/*PARA VER CLIENTE*/
call verClientes(1);

/*PARA VER DATOS DEL PRODUCTO MANDANDOLE COMO PARAMETRO EL NUMERO ID DEL PRODUCTO*/
call checarProductos(11);

/*PARA INSERTAR UNA NUEVA FARMACIA MANDANDO TODO LOS DATOS QUE CONFORMA EN LA TABLA DISTRICT*/
call insertarNuevaFarmacia(4, 'Roma', '6641042098', 'Rey Baltazar 250', 'roma@gmail.com');

/*MOSTRAR LA CANTIDAD DE CLIENTES QUE VISITARON DICHA FARMACIA, MANDANDO COMO PARAMETRO EL NOMBRE DE LA FARMACIA*/
call farmaciaCantidadGente('Farmacias del Ahorro', @_showNombreDistrict, @_cantidadCliente);
select @_showNombreDistrict, @_cantidadCliente;

/*ACTUALIZAR EL PRECIO Y SU STOCK DEL PRODUCTO YA SEA INDICANDO COMO PARAMETRO EL ID DEL PRODUCTO*/
call actualizar_Precio_Y_Stock_Producto(3, 60, 150);

/*5 triggers*/
/*MANDAR A INSERTAR UN NUEVO USUARIO Y VA A CHECAR SI EXISTE ALGUIEN CON EL MISMO USUARIO Y SI EN CASO DE QUE EXISTA*/
/*LE CONCATENAMOS UN NUMERO EXTRA PARA HACER LA DIFERENCIA DE NOMBRE DE DICHO NUEVO USUARIO QUE SE REGISTRE*/
INSERT INTO `user` (`idUser`, `idEmployee`, `idDistrict`, `nombreUsuario`, `password`, `nivelAcceso`, `tipoRol`, `detallesRol`) VALUES 
(17, 17, 2, 'Ivan14', '8bBADvhA0tK6ehnY', 0, '-', '-');

/*MANDAR A INSERTAR UN NUEVO PRODUCTO Y VA A CHECAR SI EXISTE CON EL MISMO NOMBRE DEL PRODUCTO Y SI EN CASO DE QUE EXISTA*/
/*LE CONCATENAMOS UN NUMERO EXTRA PARA HACER LA DIFERENCIA DE NOMBRE DE DICHO PRODUCTO NUEVO QUE SE REGISTRE*/
INSERT INTO `products` (`idProducto`, `nombreProducto`, `detallesProducto`, `stock`, `idCategoria`, `precio`, `stockMax`, `stockMin`) VALUES 
(15, 'Fluconazol (150 mg) en capsulas', 'Impedir el crecimiento de hongos.', 25, 15, 150.00, 100, 20);

/*MANDAR A INSERTAR UN NUEVO NUMERO DE TELEFONO Y VA A CHECAR SI EXISTE CON EL MISMO NUMERO DE TELEFONO DE LA FARMACIA
 Y SI EN CASO DE QUE EXISTA*/
/*LE CONCATENAMOS UN NUMERO ALEATORIO PARA HACER INDICAR COMO SI FUERA UN NUMERO REAL DE UN TELEFONO DE DICHA FARMACIA
 NUEVA QUE SE REGISTRE*/
INSERT INTO `district` (`idDistrict`, `nombreDistrict`, `telDistrict`, `direccionDistrict`, `correoDistrict`) VALUES
(2, 'Farmacias del Ahorro', '6648797513', 'Gobernador Lugo 9702', 'ahorro@gmail.com');

/*ACTUALIZAR EL PRECIO DEL PRODUCTO.*/
UPDATE products SET products.precio = 40 WHERE products.idProducto = 16;

/*INDICAR SI SE REPITE EL MISMO USUARIO*/
UPDATE `user` SET `user`.nombreUsuario = 'betof01' WHERE `user`.idUser = 11;