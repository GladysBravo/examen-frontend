'use strict';

import config from '../../config.json';

const server = config.server;

const Config = angular
  .module('app.config', [])
  .constant('appName', 'app') // prefijo del sistema para el Storage y Sessiones
  .constant('systemName', 'Proyecto base')
  .constant('timeSessionExpired', config.timeSessionExpired) //Tiempo en minutos para que la sesión se cierre automáticamente si existe i$
  .constant('onbeforeunload', config.onbeforeunload)
  .constant('debug', config.debug)
  .constant('PageNoLogin', ['login']) // Rutas que no requieren autenticación
  .constant('authUrl', `${config.serverAuth}/autenticar/`) // URL para autenticacion
  .constant('apiUrl', `${server}/api/v1/`) // Rest principal del sistema
  .constant('baseUrl', `${server}/`) // Ruta base
  .name;

export default Config;
