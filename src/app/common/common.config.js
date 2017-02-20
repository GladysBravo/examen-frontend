'use strict';

const CommonConfig = function ($httpProvider, $logProvider, $authProvider, authUrl, appName/*, DataServiceConfig*/) {
    "ngInject";

    // Habilitar los logs del sistema
    $logProvider.debugEnabled(true);

    // Configurando parametros para autenticación con Satellizer
    // Config url auth
    $authProvider.loginUrl = authUrl;
    // $authProvider.signupUrl = "http://api.com/auth/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = appName;
    // $httpProvider.defaults.headers.get = { 'Access-Control-Allow-Origin': '*' };
    // $authProvider.authToken = 'Bearer';

    // Configurando salida de respuesta del rest backend para el DataService
    // DataServiceConfig.filterResponse = function (response, Message) {
    //     if (response.datos) {
    //         response = response.datos;
    //     } else {
    //         if (!response.finalizado) {
    //             Message.error(response.mensaje);
    //             response = response.datos;
    //         }
    //     }
    //     return response;
    // };

};

export default CommonConfig;