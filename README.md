# Documentación del Proyecto

Este proyecto consiste en una aplicación de servidor Node.js que proporciona una API RESTful para interactuar con una base de datos SQLite. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una tabla de usuarios.

## Estructura de Archivos

El proyecto se compone de los siguientes archivos principales:

1. **index.js**

    Este archivo sirve como punto de entrada de la aplicación. Se encarga de iniciar el servidor HTTP y establecer la escucha en un puerto específico.

2. **server.js**

    Este archivo define las rutas y controladores para la API RESTful. Utiliza Express.js para manejar las solicitudes HTTP y ejecutar consultas SQL en la base de datos SQLite para realizar operaciones CRUD en la tabla de usuarios.

3. **sql.js**

    Este archivo se encarga de la inicialización de la base de datos SQLite. Comprueba si el archivo de la base de datos existe en una ubicación específica y, si no existe, crea la base de datos y una tabla de usuarios, insertando un usuario administrador inicial.

## Dependencias

El proyecto utiliza las siguientes dependencias:

- **express:** Utilizado para crear el servidor web y definir rutas para la API RESTful.
- **sqlite3:** Proporciona una interfaz para trabajar con bases de datos SQLite.
- **fs:** Utilizado para realizar operaciones en el sistema de archivos, como verificar la existencia de archivos.

## Funcionalidades de la API

La API RESTful proporcionada por la aplicación admite las siguientes operaciones:

- **Obtener todos los usuarios:** `GET /api/`
- **Obtener un usuario por su ID:** `GET /api/:id`
- **Crear un nuevo usuario:** `POST /api/`
- **Actualizar un usuario existente:** `PUT /api/:id`
- **Eliminar un usuario:** `DELETE /api/:id`

## Seguridad

Es importante tener en cuenta que el código actual es vulnerable a ataques de inyección SQL debido a la concatenación directa de valores de URL en consultas SQL. Se recomienda utilizar consultas parametrizadas o consultas preparadas para evitar esta vulnerabilidad.

## Ejecución del Proyecto

Para ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio desde GitHub.
2. Instala las dependencias ejecutando `npm install`.
3. Ejecuta la aplicación con `node index.js`.

## Consideraciones Adicionales

- Se recomienda encarecidamente implementar autenticación y autorización para restringir el acceso a las rutas de la API según sea necesario.
- Para un entorno de producción, se debe configurar una base de datos adecuada y realizar pruebas exhaustivas para garantizar la estabilidad y seguridad del sistema.


## Diagrama de Clases

'''mermaid
classDiagram
    class index.js {
        - app: Express
        - HTTP_PORT: number
    }
    class server.js {
        - app: Express
        - db: SQLite
        + getAllUsers()
        + getUserById(id: number)
        + createUser(name: string, type: number)
        + updateUser(id: number, name: string, type: number)
        + deleteUser(id: number)
    }
    class sql.js {
        - db: SQLite
    }
    class Express {
        + listen(port: number, callback: Function)
        + get(route: string, callback: Function)
        + post(route: string, callback: Function)
        + put(route: string, callback: Function)
        + delete(route: string, callback: Function)
    }
    class SQLite {
        + all(sql: string, params: any[], callback: Function)
        + run(sql: string, callback: Function)
        + exec(sql: string, callback: Function)
    }

    index.js --|> server.js
    server.js --|> sql.js
    server.js --> Express
    sql.js --> SQLite
'''

## Diagrama de Flujo 

'''
flowchart TD
    subgraph "Inicio del Programa"
        A(Inicio) --> B{¿Archivo DB existe?}
    end
    B -- Sí --> C(Cargar DB)
    B -- No --> D(Crear DB)
    C --> E{¿Operación de API?}
    D --> E
    E -- Sí --> F{Tipo de Operación}
    E -- No --> G(404 Not Found)
    F -- "GET" --> H{¿Obtener Todos los Usuarios?}
    F -- "GET" --> I{¿Obtener Usuario por ID?}
    F -- "POST" --> J{¿Crear Usuario?}
    F -- "PUT" --> K{¿Actualizar Usuario?}
    F -- "DELETE" --> L{¿Eliminar Usuario?}
    H --> M(Obtener Todos los Usuarios)
    I --> N(Obtener Usuario por ID)
    J --> O(Crear Usuario)
    K --> P(Actualizar Usuario)
    L --> Q(Eliminar Usuario)
    M --> R{¿Éxito?}
    N --> R
    O --> R
    P --> R
    Q --> R
    R -- Sí --> T(Enviar Respuesta)
    R -- No --> U(Enviar Error)
    T --> E
    U --> E
'''

## Diagrama de Sequencia 
'''
sequenceDiagram
    participant Client
    participant index.js
    participant server.js
    participant sql.js
    Client->>index.js: Inicia la aplicación
    index.js->>server.js: Inicia el servidor
    loop Operaciones HTTP
        Client->>server.js: Realiza una solicitud HTTP
        server.js->>sql.js: Accede a la base de datos
        sql.js->>server.js: Retorna los datos de la base de datos
        server.js->>index.js: Retorna la respuesta HTTP
        index.js->>Client: Envía la respuesta al cliente
    end
    Client->>server.js: Realiza una solicitud HTTP
    server.js->>sql.js: Accede a la base de datos
    sql.js->>server.js: Realiza operación de inserción en la base de datos
    server.js->>index.js: Retorna respuesta HTTP
    index.js->>Client: Envía respuesta al cliente
    Client->>server.js: Realiza una solicitud HTTP
    server.js->>sql.js: Accede a la base de datos
    sql.js->>server.js: Retorna los datos de la base de datos
    server.js->>index.js: Retorna respuesta HTTP
    index.js->>Client: Envía respuesta al cliente
'''