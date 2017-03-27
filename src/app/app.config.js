'use strict';

const Config = angular
    .module('app.config', [])
    .constant('appName', 'base') // prefijo del sistema para el Storage y Sessiones
    .constant('systemName', 'Proyecto Base')
    .constant('timeSessionExpired', 30) //Tiempo en minutos para que la sesión se cierre automáticamente si existe inactividad
    .constant('PageNoLogin', ['login']) // Rutas que no requieren autenticación
    .constant('authUrl', 'http://localhost:3100/auth/') // URL para autenticacion
    .constant('restUrl', 'http://localhost:8888/api/v1/') // Rest principal del sistema
    .name;

export default Config;