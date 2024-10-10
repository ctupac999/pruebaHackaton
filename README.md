<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción

Este repositorio es una API (desarrollada en inglés)  para realizar peticiones de interacción entre usuarios y actividades conectado a una base datos de formato .json, alojada en un cluster de MongoDBAtlas y contiene:
Una carpeta SRC donde se encuentra el código almacenado tomando en cuenta el patrón vista controlador.
Una carpeta uploads para colocar el archivo .json para importar las actividades en la base de datos
Una carpeta exports donde se van a guardar las actividades de la base de datos en formato .json
Un archivo .env donde tienes que copiar las credenciales para la conexión con la base de datos en la nube de mongoDBAtlas
Dos archivos (bodyUsers y bodyActivity) donde encontraras un body en formato .json como ejemplo para realizar las peticiones correspondientes
Otros archivos para el correcto funcionamiento de la API


## Instalación
Bash:

$ git clone https://github.com/ctupac999/pruebaHackaton 
(o en su defecto) 
$ git clone https://github.com/ctupac999/pruebaHackaton.git 
$ pnpm install

## Running the app
Para utlizar la Api es recomendable utilizar una interfaz para realizar las peticiones como [Postman](https://www.postman.com/)
Recuerda que el archivo .env donde tienes que copiar las credenciales para la conexión con la base de datos en la nube de mongoDBAtlas.
Si no encuentras un archivo.env crea uno en la raiz del proyecto y copia las credenciales ajuntadas con este repositorio.

Bash:

$ pnpm start

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
