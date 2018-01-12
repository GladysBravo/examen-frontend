'use strict';

import Admin from './admin/admin.module';
// import Documentos from './documentos/solicitudes.module';
import Test from './test/test.module';
import Registro from './registro/registro.module';
import Cancelar from './cancelar/cancelar.module';

const Components = angular
    .module('app.components', [
        Admin,
        Test,
        Registro,
        Cancelar
    ])
    .name;

export default Components;
