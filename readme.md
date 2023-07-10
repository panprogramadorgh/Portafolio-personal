## pasos a seguir para completar sistema de verificacion de email:

- SUPONIENDO que puda ejecutar javaScript dentro del mail

1. Crear colleccion en mongodb `email verifications`

2. Modificar handleButtonClick en contact para que cuando se haga click en el boton, se genere un numero aleatorio y se inserte un documento con los datos del formulario en la colleccion previamente creada.

3. Enviar email (avisando al usuario que verifique su email) con una vista html con el codigo generado anteriormente e \*importante, el correo en un h1 o donde sea para evitar la perdida de informacion y poder posteriormente hacer una request con info en el cuerpo de la solocitud. (Cargar script para que nada mas cargar la vista guarde el email y lo oculte o simplemente lo deje, cualquier cosa (ya vere))

4. Tenindo el mail en una constante, agragar una funcionalidad al boton para que cuando se haga click en el, se haga un fetch a `x` con un cuerpo de solocitid que consista en un objeto con el codigo y el email.

5. Recibir en el endpoint `x` los objetos previamente mencionados y buscar en la coleccion de la base de datos los objetos que cuadren con el mail del objeto (hay que tener en cuenta que cuando cree la coleccion donde se insertaran estos documentos `email verifications` hay que especificar en el modelo de mongoose que las keys email de los documentos deben tener valores unicos entre si mismas para evitar problemas buscando los documentos en el paso actual)

6. Una vez buscado el documento con el email correspondiente verificar si el numero coincide. (si el email no se encuentra, quiere decir que algo salio mal con el truco mierdoso de meter el mail dentro de la vista porque alguien metio un script para romperlo (aunque lo veo dificil, sinceramente no creo que pase ni se pueda)) Si el codigo coincide, entonces meter en otra coleccion la contact request (adaptando todasl as keys, por ejemplo el codigo no existiria) and delete from the collection `email verifications` the object.

- NO se puede utilizar js de ninguna forma en una view de un email, al menos por el servicio de google (no si tenga algo que ver)

1. ...

2. ...

3. Enviar email (avisando al usuario que verifique su email) con una vista html con el codigo generado anteriormente

4. El usuario ingresa el codigo en la aplicacion y se busca en la base de datos el correspondiente usuario, si existe, entonces postear en la base de datos el usuario con los datos del formulario, de lo contrario simplemente decir que el codigo es incorrecto, y en ambos casos cerrar la bentana que solocita el codigo y eliminar en la base de datos el documento encontrado en la coleccion `email verifications`

5. Mostrar al usuario que envio correctamente the contact request drawing an animation by closing the window or what ever I'll see when I'll programming the application.
