# Api de Productos - Examen Técnico

Api Restful para consultar, crear, editar, eliminar productos

## Getting Started

Estas instrucciones son para poder realizar el deploy y testing de la App

### Prerequisites

NodeJS v6 o superior
MongoDB v3.4


### Installing

Clonar el repositorio

```
git clone https://github.com/rspirolazzi/apiproducts.git
```

Una vez clonado realizar el install con npm

```
npm install
```

Completar la configuración del proyecto desde los archivos de configuración ubicados en **config.json**
```
{
  "port":4000,
  "db_connection":"mongodb://localhost/dev"
}
```

Por ultimo

### `npm start`

Ejecuta la aplicacion en modo development.

##CURL Examples

Obtener todos los productos

```
curl -X GET \
  http://localhost:4000/products \
  -H 'cache-control: no-cache'
```

Dar de alta un nuevo producto

```
curl -X POST \
  http://localhost:4000/products \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"name":"Samsung TV 44\"", "price":32000, "brand":"Samsung"}'
```

Editar un producto existente. Reemplazar **[ID]** por un id valido de mongodb

```
curl -X PUT \
  http://localhost:4000/products/[ID] \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"price":1234}'
```

Consultar un producto existente. Reemplazar **[ID]** por un id valido de mongodb

```
curl -X GET \
  http://localhost:4000/products/[ID] \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json'
```

Eliminar un producto existente. Reemplazar **[ID]** por un id valido de mongodb

```
curl -X DELETE \
  http://localhost:4000/products/[ID] \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json'

```

## Running the tests

Se puede realizar la configuración separa para los test.
Para ello es necesario generar un archivo de configuracion nuevo **config.test.json**

```
{
  "port":3099,
  "db_connection":"mongodb://localhost/test"
}
```

Ejecución de los test

### `npm test`

### Testing App

Resultado de los ultimos test ejecutados

```
Obtener todos los productos realizando un GET a /products
√ No debería devolver ningun producto (90ms)
Dar de alta un producto realizando un POST /product
√ Se testea insertar un producto (58ms)
√ Se testea insertar un producto sin nombre
Se testea realizar un POST, GET, PUT y DELETE de un producto dado de alta y luego eliminado
√ Se agrega un nuevo producto
√ Se realiza una consulta a todos los productos
√ Se actualiza el precio del producto
√ Se realiza una consultar del producto
√ Se elimina el producto
√ Se realiza una consultar del producto pero este no existe
√ Se intenta actualizar un producto que no existe
√ Se intenta actualizar un producto con un id incorrecto
√ Se intenta recuperar un producto con un ID incorrecto
```

### Project structure

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── config.json
├── index.js
├── app
│   └── models
│       └── product.js
│   └── routes
│       └── index.js
│       └── products.js
└── init
    └── database.js
└── test
    └── product.js

```

### app - models

Modelo ORM de productos.
Se utilizo [Mongoose](http://mongoosejs.com)

### app - routes

**index.js** Es el encargado cargar todos los routes que existan en el directorio
**products.js** Tiene los verbos para acceder a los productos, dar de alta, editarlos o eliminarlos

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Mongoose](http://mongoosejs.com)
* [Restify](https://restify.com/)
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Authors

* **Rodrigo Spirolazzi** - [Github](https://github.com/rspirolazzi/)
