<!-- ### Proyecto deployado en Heroku:
https://desafio3entregaproyectofinal.herokuapp.com/ -->
### desafio 3 ENTREGA


# Proyecto final - tercera entrega



## Rutas
| Método | Endpoint                | Descripción                                                                                                                                                                                                                 |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| GET    | **/info**                | Muestra información relativa a la app 

| GET    | **/productos-test**      | Devuelve un listado de 7 productos mock generados con **Faker.js** 
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| GET    | **/**                    | Dirige a la página de inicio de la aplicación 

| POST    | **/login**              | Formulario de login. Las sesesiones son almacenadas en mongoAtlas  

| POST    | **/logout**             | Se accede tras clicker al boton 'deslogear' y luego de 2 segundos redirige a /login. 

| GET    | **/productos**           | Listar todos los productos disponibles luego de realizar el LOGIN.    


| GET    | **/api/productos**       | llstar todos los productos disponibles     

| GET    | **/api/productos/:id**   | Muestra un producto según su id   

| POST   | **/api/productos**       | Permite incorporar un producto a la base de datos       

| PUT    | **/productos/:id**       | Actualizar un producto en la base de datos        

| DELETE | **/productos/:id** | Para eliminar un producto                                                                                                                                                                                                        |
                 |


