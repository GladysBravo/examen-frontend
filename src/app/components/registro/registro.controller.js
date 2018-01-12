'use strict';
class RegistroController {
  // constructor(DataService, Message, $location, $scope) {
  constructor(NgTableParams, Storage, apiUrl, DataService, Sidenav, Util, Auth, Modal, $location, Message, $log, $scope, apiUrlPublic, Datetime) {
    'ngInject';
    this.DataService = DataService;
    this.$log = $log;
    this.Message = Message;
    this.apiUrl = apiUrl;
    this.apiUrlPublic = apiUrlPublic;
    this.Datetime = Datetime;
    this.Sidenav = Sidenav;
  }
  $onInit() {
    this.vigencia = this.Datetime.now();
    this.title = 'Mi titulo inicial';
    this.data = {};
    this.inicializarOpciones();

  }
  inicializarOpciones () {
    this.opciones = {};

    this.DataService.get(`${this.apiUrlPublic}sala/listar`)
    .then(response => { this.opciones.tipoSala = response.datos.rows;});

  }
  guardarRegistro() {
    this.data.fid_usuario = 1;
    this.data.fid_sala = this.data.sala.id_sala;
    this.data.hora_inicio = `${this.data.hora_inicio}:00`
    this.data.hora_fin = `${this.data.hora_fin}:00`
    this.$log.log('-------------- daos', this.data)
    this.DataService.post(`${this.apiUrlPublic}reservar/crear`, this.data)
    .then((response) => {
      this.$log.log('-------------- daos', response)
      this.Sidenav.path("solicitudes");
    });
  }

}

export default RegistroController;
