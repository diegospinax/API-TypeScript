### **Explicación de cada sección**
 
1. **Primer Proyecto en Node.js con Express**:
   - Primer Proyecto paso a paso para la generación de los archivos e instalación de Framework Express
   
 
2. **Tabla de Contenidos**:
 
   - Facilita la navegación dentro del archivo README.
 
3. **Instalación de dependencias y generación de archivos**:
 
    - npm init -y
    - npm i -g typescript // Esto tiene inferencia global
    - npm install --save-dev typescript // esto tiene inferencia local en el proyecto
    - Verificar quedo instalada tsc -v
    - tsc --init
 
4. **Configuración de Archivo tsconfig**:
 
   - Descomentar rootDir, sourceMap, outDir
   - incorporar:
    "include": ["src/**/*", "src/index.ts"],
    "exclude": ["node_modules", "dist"]
 
5. Instalación de Express
    - npm i express
    - npm i -g --save-dev @types/express
    - npm install -g ts-node
    - para ejecutar los ts por consola y se ejecuta con el comando ts-node index.tsr


### **Explicación de cada sección**
 
- Ahora mejoramos el código colocando las rutas en un archivo, es decir aquí estamos modularizando
 
### **Configuramos Nodemon que nos permite mantener el servidor arriba así hagamos cambios**
- se realiza la instalación de Nodemon como dependencia de desarrollo
- npm i -D nodemon o npm i --save-dev nodemon
- crear en la raíz del proyecto un archivo llamado nodemon.json
{
    "watch": ["src"],
    "ext": "ts json",
    "ignore": ["src/**/*.spec.ts","node_modules"],
    "execMap": {
        "ts":"ts-node"
    },
    "verbose": true,
   "restartable": "rs"
   
}
 
### Configurar el scripts en el pagkage.json
"scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }


### **Explicación de cada sección**
 
1. **Empezar a Orientar a Objetos la App**:
   - Las rutas se orientan a objetos
   - El servicio del servidor también se orienta a objetos
2. **Colocamos una clase ServerBootstrap, aunque el nombre del file puede estar en minúscula**
 
3. Ser orienta a objetos las rutas, es decir el archivo app


### **Explicación de cada sección**
 
1. **Empezamos a usar promesas**:
Como se deben hacer conexión a BD o a Event Broker(Apache Kafka, RabbitMQ, ActiveMQ, Nats, AWS EventBridges, etc) y a la hora de incializar todas estas conexiones ´pueden fallar, debemos saber cuál falló? o cuál se conectó?
Debo asegurarme que:
- Levanto el servidor
- Que hay conexión a la BD
- Conexión con el Event Broker
 
* Vamos a crear promesas sirven para operaciones asíncronas, puede tener estados:
 
   - Pendiente (pending): La operación aún no ha terminado.
   - Resuelta (fulfilled): La operación se completó exitosamente.
   - Rechazada (rejected): Hubo un error en la operación.
 
* Las promesas se utilizan para manejar tareas asíncronas como:
 
   - Lectura y escritura de archivos.
   - Consultas a bases de datos.
   - Peticiones HTTP.
 
2. Async - await
3. Función clásica - flecha - autoinvocada

### **Explicación de cada sección**
 
1. **Archivo de configuración de entorno .env**:
 
- .env
 
2. Instalamos dotenv que es una dependencia de Node.js que nos permite cargar variables de entorno desde un archivo .env a process.env.  Es recomendable usar cuando se trabaja con datos sensibles, como claves, tokens de API, credenciales de BD, puertos etc
 
   - npm install dotenv o npm i dotenv --save
 
3. Joi librería para validar datos o Se usa para definir y validar el esquema de las variables de entorno.
Instalación
 
- npm i joi

### **Explicación de cada sección** 
<!-- Dia 3 -->
 
1. Agregar al .env las nuevas variables de entorno
- DB_HOST=localhost
- DB_PORT=3306
- DB_USER=root
- DB_PASSWORD=
- DB_NAME=patterns_class
2. **Cofigurar mysql***
 - npm install typeorm mysql2
3. vamos a environment-vars.ts y reconfiguramos el archivo con las nuevas variables de entorno
4. Reorganización del proyecto en la arquitectura hexagonal
5. Descomentamos en el tsconfig.ts las siguientes opciones:
 -  "experimentalDecorators": true,
 -  "emitDecoratorMetadata": true,
 
 