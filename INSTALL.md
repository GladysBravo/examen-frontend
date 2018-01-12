# Instalación de la Aplicación (FRONTEND)


## Configuración del Servidor

Para una correcta instalación, el servidor debe tener las siguientes configuraciones obligatoriamente:

> [SERVER.md](SERVER.md)


Después recién llevar a cabo los siguientes pasos, que son necesarios para instalar la aplicación.


## Instalación del proyecto para Desarrollo

### Clonación

Clonarlo:

**Opción 1:** Si se generó llave SSH: (En los pasos del archivo SERVER.md)
```sh
$ git clone git@gitlab.geo.gob.bo:agetic/proyecto-base-frontend-angular.git
```
**Opción 2:** Si se quiere clonar el proyecto por HTTPS:
```sh
$ git clone https://github.com/GladysBravo/examen-frontend.git
```
Es posible que al descargar el proyecto con HTTPs, nos lance el siguiente error:
```sh
Cloning into 'nombre-del-proyecto'...
fatal: unable to access 'https://url-del-proyecto.git/': server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
```
```sh
$ git config --global http.sslverify false
$ git clone https://github.com/GladysBravo/examen-frontend.git
```

**Después de clonar con cualquiera de las opciones anteriores:**

Ingresar a la carpeta:
```sh
$ cd examen-frontend
```
Podemos verificar que estamos en el branch master:
```sh
$ git status
```
Nos devolverá:
```sh
- On branch master
```

`(Opcional)` Si necesitamos trabajar un branch específico (en este ejemplo, el nombre del branch es nombre_del_branch) ejecutamos:
```sh
$ git checkout nombre_del_branch
```

Al volver a verificar con git status:
```sh
$ git status
```
Se obtiene como respuesta que el proyecto se sitúa en el branch elegido:
```sh
- On branch nombre_del_branch
```
Para instalar la aplicación, se tienen las siguientes opciones:

#### Instalando dependencias npm
```sh
$ npm install
```

#### Configurar los datos de conexión a los servicios REST del backend

Toda la configuración para los archivos del frontend se encuentra en el archivo **`config.json.sample`**, su servidor de producción y su servidor de desarrollo con web pack, el mismo se encuentra en la raíz del proyecto.

Copiar dicho archivo y renombrarlo bajo el nombre **`config.json`** en la raiz del proyecto

A continuación se describe la configuración:

`**¡NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO, EL SIGUIENTE CONTENIDO ESTÁ PARA MOTIVOS DE EJEMPLO!**`

```js
{
  "server": "http://localhost:4000",
  "timeSessionExpired": 30,
  "debug": true,
  "onbeforeunload": false,
  "port": 3100,
  "subDomain": "/",
  "portDev": 8080
};
```
- **server**: Servidor del backend donde apunta el frontend
  - Ejemplos
    - "server": "http://localhost:4000"
    - "server": "http://192.168.15.15:4000"
    - "server": "http://test.local.agetic.gob.bo/proyecto-api"
- **timeSessionExpired**: Tiempo en minutos para que la sesión se cierre automáticamente por inactividad
- **debug**: Habilita los console.log (this.$log.log) para su visualización para producción es necesario deshabilitarlo con: false
- **onbeforeunload**: abre un alerta de confirmación cuando se intente cerrar o actualizar la pestaña del navegador
- **port**: Puerto para el servidor de producción
- **portDev**: Puerto para el servidor de desarrollo con webpack
- **subDomain**: Sub dominio donde iniciará el frontend, por defecto inicia en la raíz de la carpeta dist
  - Ejemplos:
    - "subDomain": "/"
    - "subDomain": "/proyecto/"


#### Iniciar el proyecto en modo desarrollo
```sh
$ npm start
```
#### Iniciar servidor de autenticación fake (OPCIONAL)
```sh
$ npm run server
```
### Notas.-
- El proyecto ya no require de bower, sólo de npm para la gestión de dependencias
- Si el **Watch** de webpack no funciona debe ejecutar los siguientes comandos para ampliar el número de watch que permite el sistema operativo en linux:

```sh
$ echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -p
```

Visitar la web para más información `https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers`


- Si al iniciar con ***npm start*** u otro comando se tiene el puerto ocupado executar el comando para detener el servicio:

```sh
$ sudo fuser -k [puerto]/tcp
```
Ejemplo:
```sh
$ sudo fuser -k 8080/tcp
```

#### Instalando dependencias npm
```sh
$ npm install
```

#### Configurar los datos de conexión a los servicios REST del backend

Seguir los pasos de `Configurar los datos de conexión a los servicios REST del backend`.

### Configurar entorno de producción

#### Iniciar el proyecto en modo desarrollo
```sh
$ npm start
```
