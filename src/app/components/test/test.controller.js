'use strict';
import modalController from './cancelar.modal.controller';
import modalTemplate from './cancelar.modal.html';

class TestController {
  // constructor(DataService, Message, $location, $scope) {
  constructor(NgTableParams, Storage, apiUrl, DataService, Sidenav, Util, Auth, Modal, $location, Message, $log, $scope, apiUrlPublic) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.DataService = DataService;
    this.Storage = Storage;
    this.Modal = Modal;
    this.Sidenav = Sidenav;
    this.$log = $log;
    this.Util = Util;
    this.Message = Message;
    this.apiUrl = apiUrl;
    this.apiUrlPublic = apiUrlPublic;
    this.Auth = Auth;
    this.$scope = $scope;
    this.$location = $location;
  }
  $onInit() {

    this.title = 'Mi titulo inicial';
    this.data = {};
    this.cargarTabla();
  }

  cargarTabla() {
    // this.ongs = [
    //   {nombre: 'Gladys', apellido: 'Bravo', edad: new Date("2015-03-25")},
    //   {nombre: 'Jose', apellido: 'Luna', edad: new Date()},
    // ];
    this.DataService.get(`${this.apiUrlPublic}reservar/listar`)
      .then(response => {
        this.$log.log(" certificadosOng --------------- ", response);
        this.ongs = response.datos.rows;
      });

  }

  irDetalles(item) {
    this.$log.log("Vemos el documento en modo revision----------", item);
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: {esEdicion: true, data: item},
      size: 'lg'
    });
  }

  nuevaReserva() {
    this.Sidenav.path('registro');
  }

}

export default TestController;
