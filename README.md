# Bienvenido al coding-interview-backend-level-3

## Descripción
Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`.

La entidad tiene 3 campos: `id`, `name` y `price`.

Tu tarea es completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.

### Que puedes hacer: 
- ✅ Modificar el código fuente y agregar nuevas clases, métodos, campos, etc.
- ✅ Cambiar dependencias, agregar nuevas, etc.
- ✅ Modificar la estructura del proyecto (/src/** es todo tuyo)
- ✅ Elegir una base de datos
- ✅ Elegir un framework web
- ✅ Cambiar la definición del .devContainer


### Que **no** puedes hacer:
- ❌ No puedes modificar el archivo original /e2e/index.test.ts (pero puedes crear otros e2e test si lo deseas)
- ❌ El proyecto debe usar Typescript 
- ❌ Estresarte 🤗


## Pasos para comenzar
1. Haz un fork usando este repositorio como template
2. Clona el repositorio en tu máquina
3. Realiza los cambios necesarios para que los tests pasen
4. Sube tus cambios a tu repositorio
5. Avísanos que has terminado
6. ???
7. PROFIT

### Cualquier duda contactarme a https://www.linkedin.com/in/andreujuan/

## How to
Para poder ejecutar el proyecto se requiere levantar la imagen de postgres en Docker, el ejemplo del string connection se encuentra disponible en el archivo `.env.example`.

NOTA: Antes de poder ejecutar todo, la base de datos debe estar creada.

Para generar el schema de Prisma se deben ejecutar los siguientes comandos:

````
npm run prisma:init
````
NOTA: el comando anterior solamente funciona si el schema de Prisma no está configurado previamente. En este caso en particular, el schema ya está creado, por lo que este comando puede ser ignorado.

Este sirve para crear el schema. Una vez creado el esquema y teniendo ya creada la base de datos, se debe ejecutar el siguiente comando:

````
npm run prisma:migrate
````

Esta creará la tabla con su respectiva estructura y creará la primera migración de esta.
