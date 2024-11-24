# El Refugio del Viajero - Hotel Boutique 🏨

El Refugio del Viajero es un hotel boutique exclusivo ubicado en un pintoresco paraje, reconocido por su atención personalizada y enfoque en la experiencia única del huésped. Con solo 20 habitaciones, cada una decorada de manera individual y con detalles únicos, el hotel ofrece un ambiente acogedor y lujoso. Los servicios adicionales, como tratamientos de spa, tours personalizados y cenas privadas, complementan la estancia para crear una experiencia inolvidable.

## Objetivo del Proyecto

Este proyecto busca resolver problemas en la gestión manual de reservas, que han llevado a errores en la disponibilidad de habitaciones y servicios y a una experiencia inconsistente para los huéspedes. El objetivo es desarrollar un sistema web de reservas que permita al hotel automatizar y centralizar la gestión de habitaciones y servicios.

## 📋 Características del Sistema

-Administrador:

Creación y gestión de habitaciones, incluyendo detalles como nombre, descripción única, precio por noche y disponibilidad en tiempo real.<br/>
Gestión de servicios adicionales (spa, tours, cenas privadas) que los huéspedes pueden seleccionar al realizar la reserva.<br/>

-Cliente:

Exploración de habitaciones disponibles, con imágenes y descripciones detalladas.<br/>
Reserva de habitaciones y selección de servicios adicionales para personalizar la estancia.<br/>
Pago seguro y confirmación inmediata de la reserva.<br/>

-Empleado:

Gestión de reservas con acceso limitado, sin permisos completos sobre el sistema administrativo.<br/>

## Tecnologías utilizadas
Frontend: Angular 15

Backend: Node.js, Express.<br/>
Base de datos: MySQL.<br/>
Estilos: Angular Material, CSS personalizado.<br/>

⚙️ Instalación y configuración
Prerrequisitos
Asegúrate de tener instalados los siguientes programas:

¬[Node.js](https://nodejs.org/en), versión 14 o superior.<br/>
¬[Angular CLI](https://github.com/angular/angular-cli), version 15.2.11.<br/>
¬[MySQL](https://www.mysql.com)<br/>

## Clonar el repositorio

```bash
git clone https://github.com/TheShac/hotel-boutique-main.git
```

## Configuración del backend

#### 1. Instalar dependencias:
En tu carpeta backend (`cd .../backend`) ejecutar el comando 
```bash
npm install
```
 o 
```bash
 npm i
```

#### 2. Configurar base de datos:

Crea una base de datos en MySQL, por ejemplo: hotel_boutique.<br/>
Ejecuta el script SQL de creación de tablas.<br/>

```sql
create database hotel; --crear base de datos.
use hotel; --usar la base de datos.
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
); --creación de la tabla usuario.
insert into user values(1, 'nombre', 'apellido', 'administrador@hotel.com', 'admin123', 'admin'); --crear usuario en la base de datos.
select * from user; --probar el funcionamiento de la tabla.
```

#### 3. Configurar variables de entorno:

Crea una carpeta `/config` y un archivo `config.js` en el directorio `backend` con la siguiente configuración:<br/><br/>
```js
import { config } from "dotenv";

config()

export const PORT=process.env.PORT || 3000
export const DB_HOST=process.env.DB_HOST || 'localhost'
export const DB_PORT=process.env.DB_PORT || puerto
export const DB_USER=process.env.DB_USER || 'user'
export const DB_PASSWORD=process.env.DB_PASSWORD || 'password'
export const DB_DATABASE=process.env.DB_DATABASE || 'database_name'
```

#### 4. Iniciar el servidor:

```bash
npm start
```

## Configuración del frontend
#### 1. Instalar dependencias:
En tu carpeta frontend (`cd .../frontend`) ejecutar el comando 
```bash
npm install
```
 o 
 ```bash
 npm i
```

#### 2. Configurar variables de entorno:
En el archivo `src/sercives/auth.service.ts`, dentro de la clase AuthService configura la URL de tu backend:
```ts
private apiUrl = 'http://localhost:3000';
```

#### 4. Iniciar la aplicación de Angular:
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200`.<br/>
## Roles de usuario
<strong>Administrador:</strong><br/>

Gestión completa de habitaciones y servicios adicionales.<br/>
Visualización en tiempo real de la disponibilidad de habitaciones para evitar overbooking.<br/>

<strong>Cliente:</strong><br/>

Búsqueda y reserva de habitaciones y servicios personalizados.<br/>
Pago seguro con confirmación inmediata.<br/>

<strong>Empleado:</strong><br/>

Gestión de reservas, con acceso restringido al sistema administrativo.<br/>
## Características Técnicas Específicas
<strong>Disponibilidad en Tiempo Real:</strong> El sistema actualiza en tiempo real la disponibilidad de habitaciones y servicios para evitar overbooking.<br/>
<strong>Roles de Usuario:</strong> El sistema diferencia entre administrador, cliente y empleado, proporcionando distintos niveles de acceso y funcionalidad.<br/>
<strong>Pago Seguro:</strong> Los clientes pueden realizar el pago de su reserva de manera segura, asegurando la confirmación inmediata.<br/>
