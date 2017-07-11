'use strict';

class CTextAreaController{
  constructor(){
     this.mayuscula='mdmayuscula';
  }
  $onInit(){
        this.ngRequired = this.ngRequired != 'true' || angular.isUndefined(this.ngRequired) ? false : true;
      //  this.ngDisabled = this.ngDisabled != 'true' || angular.isUndefined(this.ngDisabled) ? false : true;
  }
}
export default CTextAreaController;
