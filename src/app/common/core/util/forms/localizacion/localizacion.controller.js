'use strict';


import modalController from './localizacion.modal.controller.js';
import modalTemplate from './localizacion.modal.html';

class LocalizacionController {

    constructor($scope, $log, Datetime, Modal) {
        'ngInject';
        this.$scope = $scope;
        this.$log = $log;
        this.Datetime = Datetime;
        this.Modal = Modal;
    }

    $onInit () {
      this.$log.log(this);


    }

    openModal() {
        this.Modal.show({
            template: modalTemplate,
            controller: modalController,
            data: this.items,
            size: 'md'
        });
    }

}


export default LocalizacionController;
