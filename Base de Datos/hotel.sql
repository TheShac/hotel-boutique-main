create database hotel;
use hotel;
CREATE TABLE usuario
(
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('client', 'admin','empleado') NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
);

select * from usuario;

insert into usuario values(1, 'admin@hotel.com', 'admin123', 'admin');
insert into usuario values(2, 'cliente@hotel.com', 'cliente123', 'client');
insert into usuario values(2, 'empleado@hotel.com', 'empleado123', 'empleado');