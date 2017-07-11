'use strict';
import './c-select.scss';
class CSelectController {
    constructor() {

    }

    $onInit() {
        this.ngRequired = this.ngRequired != 'true' || angular.isUndefined(this.ngRequired) ? false : true;
        this.ngDisabled = this.ngDisabled != 'true'? false : true;
        this.field = angular.isUndefined(this.field)? 'nombre' : this.field;
        this.placeholder = angular.isUndefined(this.placeholder)? 'Seleccione ...' : this.placeholder;
    }

}
export default CSelectController;
