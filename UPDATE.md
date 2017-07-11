# Actualización de la Aplicación (FRONTEND)


## Actualización del proyecto para Desarrollo

### Actualización de código fuente

Para actualizar el código fuente del repositorio ejecutar el siguiente comando:

```sh
$ git pull origin master
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


## Instalación del proyecto para Producción

#### Instalando dependencias npm
```sh
$ npm install
```

#### Crear los archivos minificados
```sh
$ npm run build
```

## Reiniciar "supervisor"

Reiniciar el servicio "supervisor" para que se actualice la aplicación:
```sh
$ sudo /etc/init.d/supervisor restart
```

O reiniciar sólo el proceso correspondiente con:

```sh
$ sudo supervisorctl
> restart nombreDelProcesoFrontend
```


Para verificar que la aplicación este efectivamente corriendo, se puede ejecutar el siguiente comando, y verificar que la aplicación este corriendo en el puerto configurado:
```sh
$ netstat -ltpn

Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      -               
tcp6       0      0 :::4000                 :::*                    LISTEN      32274/nodejs
tcp6       0      0 :::3000                 :::*                    LISTEN      4381/gulp
```

Ó se puede revisar las tareas del `supervisor`, buscar el nombre de la tarea y su respectivo estado:
```sh
$ sudo supervisorctl

proyectoFrontendDEV                  RUNNING    pid 4380, uptime 3 days, 21:41:36
```
