create database hotel;
use hotel;

select * from user;

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



CREATE TABLE usuario
(
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('client', 'admin') NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
);

select * from usuario;


insert into usuario values(1, 'admin@hotel.com', 'admin123', 'admin');
insert into usuario values(2, 'cliente@hotel.com', 'cliente123', 'client');
insert into usuario values(3, 'empleado@hotel.com', 'empleado123', 'empleado');

ALTER TABLE usuario MODIFY rol ENUM('client', 'admin', 'empleado') NOT NULL;

-- Verificar la estructura actualizada de la tabla
DESC usuario;
select * from usuario;

SELECT * FROM usuario WHERE email = 'admin@hotel.com' AND password = 'admin123';

