create database hotel;
use hotel;

select * from user;
select * from habitaciones;
select * from reservas;

CREATE TABLE user
(
	id INT NOT NULL auto_increment,
    nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
    email VARCHAR(225) NOT NULL,
    password VARCHAR(225) NOT NULL,
    rol ENUM('client', 'emps', 'admin') NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);

insert into user values(1, 'leonardo', 'rodriguez', 'administrador@hotel.com', 'admin123', 'admin');


CREATE TABLE habitaciones
 (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(100) DEFAULT NULL,
  descripcion text DEFAULT NULL,
  precio decimal(10,2) DEFAULT NULL,
  disponibilidad int(11) DEFAULT NULL,
  imagen varchar(255),
  PRIMARY KEY (id)
);
INSERT INTO habitaciones (id, nombre, descripcion, precio, disponibilidad) VALUES
	(1, 'Habitación Estandar', 'Amplia habitación ideal para familias', 89990.00, 10),
	(2, 'Habitación Twin', 'Amplia habitación con dos camas individuales, ideal para compartir', 119990.00, 8),
	(3, 'Habitación Superior', 'Espaciosa habitación con excelentes comodidades para un descanso perfecto', 159990.00, 0),
	(4, 'Habitación Ejecutiva', 'Habitación con vista panorámica y baño privado', 129990.00, 9),
	(5, 'Habitación Familiar', 'Habitación amplia diseñada para familias, con suficiente espacio para todos', 129990.00, 10),
	(6, 'Habitación Suite Deluxe', 'Suite de lujo con comodidades modernas y diseño exclusivo', 189990.00, 10),
	(7, 'Habitación Junior Suite', 'Cómoda habitación con diseño moderno', 179990.00, 10),
	(8, 'Habitación Premium', 'Habitación premium con diseño elegante y acabados de alta calidad', 199990.00, 10),
	(9, 'Habitación Doble Confort', 'Habitación doble con todas las comodidades necesarias para un descanso agradable', 159990.00, 10),
	(10, 'Habitación Individual Económica', 'Habitación individual económica pero con las comodidades necesarias', 69990.00, 10);

CREATE TABLE reservas
 (
  id int(11) NOT NULL AUTO_INCREMENT,
  usuario_id int(11) NOT NULL,
  habitacion_id int(11) NOT NULL,
  tarjeta_ultimos4 varchar(4) DEFAULT NULL,
  tarjeta_nombre varchar(50) DEFAULT NULL,
  tarjeta_expiracion varchar(7) DEFAULT NULL,
  monto decimal(15,0) DEFAULT NULL,
  fecha timestamp NULL DEFAULT current_timestamp(),
  servicios_adicionales longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(servicios_adicionales)),
  PRIMARY KEY (id),
  KEY usuario_id (usuario_id),
  KEY habitacion_id (habitacion_id),
  CONSTRAINT reservas_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE,
  CONSTRAINT reservas_ibfk_2 FOREIGN KEY (habitacion_id) REFERENCES habitaciones (id) ON DELETE CASCADE
);


