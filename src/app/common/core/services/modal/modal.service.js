'use strict';

import Controller from './modal.controller';
import Template from './modal.html';

class ModalService {
    constructor($uibModal) {
        "ngInject";

        this.$uibModal = $uibModal;
    }

    show(config) {
        let setting = {
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: config.template || Template,
            controller: config.controller || Controller,
            controllerAs: '$ctrl',
            size: config.size,
            keyboard: typeof config.keyboard == 'undefined' ? true : config.keyboard,
            backdrop: 'static',
            resolve: {}
        };

        setData(config, setting, 'data');
        setData(config, setting, 'title');
        setData(config, setting, 'icon');
        setData(config, setting, 'message');
        setData(config, setting, 'labelOk');
        setData(config, setting, 'labelCancel');
        setData(config, setting, 'cancel');
        setData(config, setting, 'eventCancel');
        setData(config, setting, 'eventOk');

        this.$uibModal.open(setting);
    }    

    alert(message, callbackOk, title) {
        this.show({
            title: title || 'Alerta',
            icon: 'bell',
            message,
            size: 'sm',
            cancel: false,
            eventOk: callbackOk,
            keyboard: false
        });
    }

    confirm(message, callbackOk, callbackCancel, title, labelOk, labelCancel) {
        this.show({
            title: title || 'Confirmar',
            icon: 'warning',
            message,
            eventOk: callbackOk,
            eventCancel: callbackCancel,
            labelOk,
            labelCancel
        });
    }
}

function setData(config, setting, data) {
    setting.resolve[data] = () => {
        return typeof config[data] == 'undefined' ? '' : config[data];
    };
}

export default ModalService;