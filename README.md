<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

# API de Actividades

## Descripción

Este repositorio es una API desarrollada en NestJS para realizar peticiones a una base de datos (para interactuar entre usuarios y actividades) en formato JSON alojada en un cluster de MongoDB Atlas. Este repositorio contiene:

- **`src`**: Carpeta donde se encuentra el código, siguiendo el patrón vista-controlador.
- **`uploads`**: Carpeta para colocar el archivo JSON para importar las actividades en la base de datos.
- **`exports`**: Carpeta donde se guardan las actividades de la base de datos en formato JSON.
- **`bodyUsers`** y **`bodyActivity`**: Archivos que contienen ejemplos de body en formato JSON para realizar las peticiones correspondientes.
- Otros archivos necesarios para el correcto funcionamiento de la API.

## Instalación

Ejecuta los siguientes comandos en tu terminal:

```bash
$ git clone https://github.com/ctupac999/pruebaHackaton
# o en su defecto
$ git clone https://github.com/ctupac999/pruebaHackaton.git
$ pnpm install
# o en su defecto
$ npm install
# `.env`: Archivo que debes crear en la raiz del repositorio clonado 
#contiene las credenciales para la conexión con la base de datos en la nube de MongoDB Atlas
# estas credenciales se enviaron adjuntas con el repositorio.



## EndPoints Actividades

Creación de Actividades:
POST
localhost:3000/appactivitats/activity
body de ejemplo:
{
  "nameActivity": "string",
  "description": "string",
  "maxCapacity": 0,
  "usersRegistered": [
    {
      "userName": "string",
      "status": "string"
    }
  ]
}

Visualización de todas las actividades:
GET
localhost:3000/appactivitats/activity

Visualizacion de una actividad:
GET(:id)
localhost:3000/appactivitats/activity/id

Eliminación todas las actividades:
DELETE
localhost:3000/appactivitats/activity

Eliminación de una actividad:
DELETE(:id)
localhost:3000/appactivitats/activity/id

Actualización de algun dato de una actividad:
PUT(:id)
localhost:3000/appactivitats/activity/id
body de ejemplo:
{
    "usersRegistered": [
      {
        "userName": "josesito",
        "status": "aceptado"
      }
    ]
  }

Registro de un usuario en una actividad:
PUT(:id)
localhost:3000/appactivitats/activity/id
body de ejemplo:
{
    "usersRegistered": [
      {
        "userName": "josesito",
        "status": "aceptado"
      }
    ]
  }

Importación de actividades en formato .json
@Post('/import/json')
localhost:3000/appactivitats/activity/import/json

Exportación de actividades en formato .json
@Post('/export/json')
localhost:3000/appactivitats/activity/export/json


## EndPoints Usuarios

Creación de usuario:
POST
localhost:3000/appactivitats/users
body de ejemplo:
{
    "name": "string",
    "lastname": "string",
    "email": "string",
    "edad": 0
}

Visualización de todas los usuarios:
GET
localhost:3000/appactivitats/users

Visualizacion de un usuario:
GET(:id)
localhost:3000/appactivitats/users/id

Eliminación de un usuario:
DELETE(:id)
localhost:3000/appactivitats/users/id

Actualización de algun dato de un usuario:
PUT(:id)
localhost:3000/appactivitats/users/id
body de ejemplo:
{
    "name": "string",
    "lastname": "string",
    "email": "string",
    "edad": 0
}


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
