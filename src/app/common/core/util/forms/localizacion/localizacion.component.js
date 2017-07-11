'use strict';

import controller from './localizacion.controller';
import template from './localizacion.html';
import './localizacion.scss';

const localizacionComponent = {
    bindings: {
        ngLabel: '<',
        latitud: '=',
        longitud: '=',
        ngReguired: '<',
        ngDisabled: '<',
        maxPuntos: '<',
        width: '<',
        height: '<'
    },
    controller,
    template
};

export default localizacionComponent;
