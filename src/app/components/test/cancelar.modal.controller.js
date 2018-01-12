'use strict';
class ProgramaModalController {
  constructor($uibModalInstance, data, $log, $scope, DataService, Message, Util, Loading, Sidenav, Storage, apiUrlPublic, $state) {
    'ngInject';

    this.data = data;
    this.conf = data.conf;
    this.onSave = data.onSave;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.$scope = $scope;
    this.DataService = DataService;
    this.Message = Message;
    this.Util = Util;
    this.Loading = Loading;
    this.Sidenav = Sidenav;
    this.Storage = Storage;
    this.apiUrlPublic = apiUrlPublic;
    this.$state = $state;
  }

  $onInit() {
    this.data = this.data;
    this.$log.log("Data recibido = ", this.data);
  }

  cancel() {
    this.$uibModalInstance.close();
    this.Sidenav.path('solicitudes');
  }

  modificarReserva() {
    this.DataService.put(`${this.apiUrlPublic}reservar/modificar/${this.data.data.id_reserva}?estado=CANCELADO`)
    .then(response => {
      if (response) {
        // this.Sidenav.path('solicitudes');
        this.$state.reload();
      }
    });
    this.$uibModalInstance.close();
  }

  ejecutarDespues() {
    this.$uibModalInstance.close();
    this.Message.success("Se realizó la acción correctamente");
    this.Sidenav.path("solicitudes");
  }

}
export default ProgramaModalController;
