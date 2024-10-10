<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Este repositorio contiene:
Una carpeta SRC donde se encuentra el código almacenado tomando en cuenta el patrón vista controlador.
Una carpeta uploads para colocar el archivo .json para importar las actividades en la base de datos
Una carpeta exports donde se van a guardar las actividades de la base de datos en formato .json
Un archivo .env donde tienes que copiar las credenciales para la conexión con la base de datos en la nube de mongoDBAtlas
Otros archivos para el correcto funcionamiento de la API


## Installation
Bash:

$ git clone https://github.com/ctupac999/pruebaHackaton 
(o en su defecto) 
$ git clone https://github.com/ctupac999/pruebaHackaton.git 
$ pnpm install

## Running the app
para utlizar la Api es recomendable utilizar una interfaz para realizar las peticiones como [Postman](https://www.postman.com/)

Bash:

$ pnpm start

## EndPoints

Creación de Actividades:
POST
localhost:3000/appactivitats/activity

Visualización de todas las actividades:
GET
localhost:3000/appactivitats/activity

Visualizacion


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
