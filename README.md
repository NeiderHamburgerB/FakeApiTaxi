<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Base de datos

POSGRESQL desplegado en aws - disponible por 5 dias

## Instalación normal

1. Ubicate en la raiz de tu proyecto, agrega el archivo .env 
2. Corre npm install, luego npm run start:dev para iniciar el proyecto
3. Con esto ya tendras el proyecto corriendo en tu local

## Instalación con docker

1. Ubicate en la raiz de tu proyecto, agrega el archivo .env y construye la imagen de docker con = docker build -t digitaxi .
2. Corre la imagen con = docker run -p 3000:3000 -d digitaxi
3. Con esto ya tendra el proyecto corriendo en tu local

## Documentación Swagger

Una vez tenga el proyecto corriendo estara disponible en http://localhost:3000/api/docs

usuario : admin
contraseña : se encuentra en el .env

## Documentación Postman collection

Disponible en https://documenter.getpostman.com/view/26511391/2s93RMWbAV

## License

Nest is [MIT licensed](LICENSE).
