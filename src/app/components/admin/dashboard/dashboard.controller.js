'use strict';

import modalController from './dashboard.modal.controller.js';
import modalTemplate from './dashboard.modal.html';

class DashboardController {
    constructor(apiUrl, Message, Modal, $log) {
        'ngInject';
        
        this.dt = new Date();
        this.Message = Message;
        this.Modal = Modal;
        this.apiUrl = apiUrl;
        this.$log = $log;
    }

    $onInit() {
        this.items = [
            {value: 1, text: 'Item uno'},
            {value: 2, text: 'Item dos'},
            {value: 3, text: 'Item tres'},
            {value: 4, text: 'Item cuatro'},
            {value: 5, text: 'Item cinco'}
        ];

        this.opened = false;

        this.dateOptions = {
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };

        this.tabs = [
            { title:'Título dinámico 1', content:'Contenido dinámico 1' },
            { title:'Título dinámico 2', content:'Contenido dinámico 2', disabled: true }
        ];

        this.mytime = new Date();
    }

    // Abrir datepicker
    open() {
        this.opened = true;
    }

    openModal(size = '') {
        this.Modal.show({
            template: modalTemplate,
            controller: modalController,
            data: this.items,
            size
        });
    }

    openMessage(type) {
        this.Message[type]();
    }

    openAlert() {
        this.Modal.alert('¡Hola mundo!');
    }

    openConfirm() {
        this.Modal.confirm('¿Está seguro de continuar?', () => {
            this.Modal.alert("Hola!!!");
        });
    }
}

export default DashboardController;