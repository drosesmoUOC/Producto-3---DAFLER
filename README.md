# Proyecto 3 - FP.450 Desarrollo FullStack
## Grupo Dafler - Aula 1

Backend de la plataforma de tándem lingüístico: un servicio web con Express, GraphQL y persistencia en MongoDB. 

### Normativas básicas del producto
* Las variables y los nombres de archivo se escriben en inglés y en camelCase.
* Los textos para el usuario están en castellano.
* Cada archivo JS documenta con JSDoc sus funciones.

### Tareas a realizar:
1.	Desarrollamos una serie de controladores para verificar el funcionamiento de ExpressJS. No necesitamos vistas .
2.	Almacenamos los datos en estructuras de memoria (Array, Map o Set)
3.	Utilizaremos los mismos objetos que hemos creado en el producto 2, solo que en este caso los ejecutamos en el backend.
4.	Instalamos GraphQL, mediante un modulo de ExpressJS.
5.	Crearemos los Type, Query y Mutation necesarios para implementar todas las funciones de almacenaje.js del producto 2 en nuestro servicio web.
	En este punto los datos estan en memòria.
7.	Cambiamos todas las estructuras de memoria del punto anterior, para que la persistencia sea en nuestra base de datos NoSQL. En este producto no vamos a utilizar Mongoose.

8.  Mapa Conceptual realizado a MANO
9.  Subir a codesandbox 
10. Video explicativo

### División de las tareas:
Florian: 1-3
Daniel: 7
Erik: 4-6

## Uso de IA

### Configuración de Express

1. Herramienta utilizada: **ChatGPT** (OpenAI).
"Dame un ejemplo de configuración básica de un servidor Express en JavaScript con ES modules que funcione solo como API, sin vistas, y que tenga una ruta /api/health para comprobar que está levantado."

### Rutas, controladores y validaciones

2. Herramienta utilizada: **ChatGPT** (OpenAI).
"Dame un ejemplo de cómo organizar rutas, controladores y validaciones en Express con JavaScript, cada uno en su carpeta, para un CRUD de usuarios guardados en memoria con un Map."

### GraphQL

3. "Dame un ejemplo de esquema GraphQL en JavaScript con type, Query y Mutation para usuarios e intercambios, montado en Express con graphql-http."