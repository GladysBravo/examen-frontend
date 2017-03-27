Guía de instalación
===================

### Instalando nodejs

Instale Node.js con la version 6.9.x (La versión mínima es 6.9.0 LTS)

#### Ubuntu y Debian
##### Actualizando el sistema operativo(Ubuntu, Debian)
    apt-get update
    
##### Para Ubuntu
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs

##### Para Debian, ejecutar como root
    curl -sL https://deb.nodesource.com/setup_6.x | bash -
    apt-get install -y nodejs

##### **Opcional**: instale 'build tools' 

Para compilar e instalar extensiones nativas desde npm, puede requerir 'build tools', Use `sudo` en Ubuntu o ejecute en Debian como root.
    
    apt-get install -y build-essential

Instalación del proyecto para Desarrollo
===============================

#### Instalando dependencias npm
    npm install

#### Configurar los datos de conexión a los servicios REST del backend

    Cambie <SERVIDOR> por el IP del servidor o el nombre del dominio del backend en el archivo /path-del-proyecto/src/app/app.config.js

    .constant('authUrl', 'http://<SERVIDOR>/login/') // URL para autenticacion para el administrador
    .constant('restUrl', 'http://<SERVIDOR>/') // Rest

#### Iniciar el proyecto en modo desarrollo
    npm start

#### Iniciar servidor de autenticación fake (OPCIONAL)
    npm run server

### Notas.-
- El proyecto ya no require de bower solo de npm para la gestión de dependencias
- Si el **Watch** de webpack no funciona debe ejecutar los siguientes comandos para ampliar el número de watch que permite el sistema operativo en linux:


    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf
    
    sudo sysctl -p

Visitar la web para más información https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers
    

- Si al iniciar con ***npm start*** u otro comando se tiene el puerto ocupado executar el comando para detener el servicio:

    sudo fuser -k [puerto]/tcp
    Ej.- sudo fuser -k 8080/tcp


Instalación del proyecto para Producción
===============================

#### Instalando dependencias npm
    npm install

#### Configurar los datos de conexión a los servicios REST del backend

    Cambie <SERVIDOR> por el IP del servidor o el nombre del dominio del backend en el archivo /path-del-proyecto/src/app/app.config.js

    .constant('authUrl', 'http://<SERVIDOR>/login/') // URL para autenticacion para el administrador
    .constant('restUrl', 'http://<SERVIDOR>/') // Rest

#### Crear los archivos minificados
    npm reun build

#### Iniciar el servidor para los archivos minificados
    npm run server

### ¡Importante!.-
Use siempre la anotación 'ngInject' en los constructores o donde se requiera inyectar una dependencia angular para que el minificado sea exitoso.

Ejemplo:
    // En los constructores que requieran dependencias
    constructor(Dependencia1, Dependencia2, ...) {
        'ngInject';

        ...
    }

    // En los config de angular que requieran dependencias
    angular.config((Dependencia1, Dependencia2, ...) => {
        'ngInject';

        ...
    })
