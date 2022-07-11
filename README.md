### Desafio: 3º Entrega Proyecto Final
### Proyecto deployado en Heroku:
https://desafio3entregaproyectofinal.herokuapp.com/

#### working progress:

## Rutas


|   METODO    | **ENDPOINT**           | DESCRIPCION                                                         

|     GET     | **/info**                | Muestra información relativa a la app 

|     GET     |  **/productos-test**      | Página de testeo, devuelve listado de 7 productos mock generados con **Faker.js** 



|     GET     |  **/**                    | Dirige a la página de inicio de la aplicación 

|     GET     |  **/login**               | Página de inicio de la aplicación

|     POST    |  **/login**              | Comprueba datos de usuario y devuelve una página de ingreso y bienvenida.  

|     GET     |  **/registro**            | Formulario de registro de usuario. 

|     POST    |  **/registro**           | Permite registrarse. Las sesesiones son almacenadas en mongoAtlas  

|     GET     |  **/logout**              | Se accede tras clicker al boton 'deslogear' y luego de 2 segundos redirige a /login. 

|     GET     |  **/productos**           | Lista los productos disponibles. Redirecciona luego de realizar el LOGIN. 



|     GET     |  **/api/productos**       | Lista todos los productos disponibles     

|     GET     |  **/api/productos/:id**   | Muestra un producto según su id   

|     POST    |  **/api/productos**       | Permite incorporar un producto a la base de datos       

|     PUT     | **/api/productos/:id**   | Actualizar un producto en la base de datos según su id     

|    DELETE   | **/api/productos/:id**   | Eliminar un producto de la base de datos según su id



|     GET     |  **/api/carritos**        | Lista los carritos disponibles     

|     GET     |  **/api/carritos/:id**    | Muestra un carrito según su id   

|     GET     |  **/api/carritos/:id/productos**   | Muestra los productos de un carrito según su id  

|     POST    |  **/api/carritos**        | Permite incorporar un carrito a la base de datos   

|     POST    |  **/api/carritos/:id/productos/idProducto**        | Permite incorporar producto al carrito según su id   

|    DELETE   | **/api/carritos/:id**   | Elimina un carrito de la base de datos según su id

|    DELETE   | **/api/carritos/:id/productos/idProduto**   | Elimina un producto del carrito según su id