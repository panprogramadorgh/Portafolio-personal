# Portafolio

## Descripcion del proyecto

Este proyecto consiste en un portafolio de contacto, incluye una funcionalidad de contacto con registro en base de datos. El portafolio es totalmente actualizable ya que carga los datos desde una base de datos facilmente actualizable.

### Como iniciar el proyecto en modo desarrollo

El proyecto consta de dos partes, el cliente y el servidor, asique se tendra que iniciar cada una de las partes indelendientemente para poder iniciar completamente la aplicacion. Aunque antes de iniciar cada parte del proyecto hay que instalar las dependencias asique situate en la carpeta raiz del proyecto y ejecuta el siguiente comando: `cd ./server/;npm i;cd ../client/;npm i;cd ../`. Para iniciar los proyectos lo mas rapido posible, ejecuta los siguientes comandos consecutivamente en terminnales distintas en la carpeta raiz:

1. `cd ./server/;npm run dev`
2. `cd ./client/;npm run dev`

- Es posible que experimentes multiples errores si no has agregado los requeridos archivos de variables de entorno.

### Variables de entorno del proyecto.

#### Servidor

El servidor utiliza en algunas partes del codigo variables de entorno. En especifico son siete: `PORT, URI, CLIENT_DOMAIN, SERVER_DOMAIN, NODEMAILER_USER, NODEMAILER_PASS y ENCRYPTION_KEY`. Eso quiere decir que si vas a iniciar la aplicacion tendras que crear un archivo `.env` en `./server/` y configurarlo con las variables mencionadas anteriormente para que el servidor sepa en todo momento como debe actuar.

#### Cliente

Desde las ultimas versiones del proyecto, el cliente tiene tambien un sistema de variables de entorno, aunque esta vez no implementa el paquete `dotenv`, sino un simple archivo de TypeScript, que exporta por defecto un objeto con las siguientes propiedades a modo de variables de entorno: `SERVER_DOMAIN y ENCRYPTION_KEY` (El valor de cada variable de entorno del cliente debe ser igual respectivamente a los valores de las variables de entorno del servidor. Eso quiere decir que, por ejemplo, si la calve de encryptacion en el servidor representada por la variable ENCRYPTION_KEY es `abc123`, la misma variable de entorno del cliente por lo tanto sera `abc123`)
