# Portafolio

## Descripcion del proyecto

Este proyecto consiste en un portafolio de contacto, incluye una funcionalidad de contacto con registro en base de datos. El portafolio es totalmente actualizable ya que carga los datos desde una base de datos facilmente actualizable.

## Como iniciar el proyecto en modo desarrollo

El proyecto consta de dos partes, el cliente y el servidor, asique se tendra que iniciar cada una de las partes indelendientemente para poder iniciar completamente la aplicacion. Aunque antes de iniciar cada parte del proyecto hay que instalar las dependencias asique situate en la carpeta raiz del proyecto y ejecuta el siguiente comando: `cd ./server/;npm i;cd ../client/;npm i;cd ../`. Para iniciar los proyectos lo mas rapido posible, ejecuta los siguientes comandos consecutivamente en terminnales distintas en la carpeta raiz:

1. `cd ./server/;npm run dev`
2. `cd ./client/;npm run dev`

## Cosas a tener en cuenta

El servidor utiliza en algunas partes del codigo variables de entorno. En especifico son tres: `PORT, URI, CLIENT_DOMAIN`. Eso quiere decir que si vas a iniciar la aplicacion tendras que crear un archivo `.env` en `./server/` y configurarlo con las variables mencionadas anteriormente para que el servidor sepa en todo momento al puerto al que se debe conectar, base de datos y el servidor del cliente.
