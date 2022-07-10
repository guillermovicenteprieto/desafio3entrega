<!-- ### Proyecto deployado en Heroku:
https://desafio3entregaproyectofinal.herokuapp.com/ -->
### desafio 3 ENTREGA


# Proyecto final - tercera entrega



## Rutas
| Método | Endpoint                | Descripción                                                                                                                                                                                                                 |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| GET    | **/info**                | Muestra información relativa a la app 

| GET    | **/productos-test**      | Devuelve un listado de 7 productos mock generados con **Faker.js** 


| GET    | **/**                    | Dirige a la página de inicio de la aplicación 

| GET    | **/login**               | Página de inicio de sesión 

| POST    | **/login**              | Formulario de login. Ingresa un usuario y contraseña y devuelve una página de ingreso y bienvenida.  

| GET    | **/registro**            | Página de registro 

| POST    | **/registro**           | Formulario de registro. Permite registrarse. Las sesesiones son almacenadas en mongoAtlas  

| GET    | **/logout**             | Se accede tras clicker al boton 'deslogear' y luego de 2 segundos redirige a /login. 

| GET    | **/productos**           | Lista los productos disponibles. Redirecciona luego de realizar el LOGIN.    



| GET    | **/api/productos**       | llstar todos los productos disponibles     

| GET    | **/api/productos/:id**   | Muestra un producto según su id   

| POST   | **/api/productos**       | Permite incorporar un producto a la base de datos       

| PUT    | **/api/productos/:id**       | Actualizar un producto en la base de datos        

| DELETE | **/api/productos/:id** | Para eliminar un producto        


