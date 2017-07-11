'use strict';

class CInputTagsController {
  constructor(){

  }
  $onInit(){
    this.ngModel = [];
    this.mensajeValidacion = null;
    let tipoValidacion = this.ngValidation;
    switch (tipoValidacion) {
          case 'correo':
            this.validation = "^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+.)+[A-Za-z]{2,}";
            break;
          case 'telefono':
            this.validation = "^([0-9 +()-]{5,15})$";
            break;
          case 'numerico':
            this.validation = "^[0-9]+$";
            break;
          default:
            this.validation = null;
    }
    this.ngRequired = this.ngRequired != 'true' || angular.isUndefined(this.ngRequired) ? false : true;
  }
  tagAdicionado(){

   /* this.mensajeMaximo = null;
    this.mensajeValidacion = null;
    if(angular.isDefined(this.ngModel)){
      if(this.ngModel.length > this.maxTags){
        this.ngModel.splice(this.maxTags,1);
        this.mensajeMaximo = 'Número máximo de elementos: '+this.maxTags;
      }
      else{
        this.mensajeMaximo = null;
      }
    }*/
    this.mensajeValidacion = null;
  }
  invalidTag(tag){
     this.mensajeMaximo = null;
     this.mensajeValidacion = null;
    if(this.ngModel){
      if(this.ngModel.length >= this.maxTags){
        this.mensajeMaximo = 'Número máximo de elementos: '+this.maxTags;
      }
      else{
        if(!this.validacionRepetidos(tag)){
          this.validacionPattern(tag);
        }
      }
    }
    else{
      this.validacionPattern(tag);
    }
}
  validacionPattern(tag){
     let tipoValidacion = this.ngValidation;
        if((tag.name.length < this.minLength) && angular.isDefined(this.minLength)){
          this.mensajeValidacion = 'El contenido es muy corto';
        }
        else{
          if(tag.name.length > this.maxLength && angular.isDefined(this.maxLength)){
            this.mensajeValidacion = 'El contenido es muy largo.';
          }
          else{
            switch (tipoValidacion) {
            case 'correo':
              this.mensajeValidacion = 'Introduzca una direccion de correo válido.';
              break;
            case 'telefono':
              this.mensajeValidacion = 'Introduzca un número de teléfono o celular válido.';
              break;
            case 'numerico':
              this.mensajeValidacion = 'Introduzca un número válido.';
              break;
            default:
              this.mensajeValidacion = '';
        }
        }
      }
  }
  validacionRepetidos(tag){
    for(let i = 0;i<this.ngModel.length;i++){
      if(this.ngModel[i].name == tag.name){
        this.mensajeValidacion = 'El contenido debe ser diferente a alguno de los anteriores.';
        return true;
      }
    }
    return false;
  }
}
export default CInputTagsController;
