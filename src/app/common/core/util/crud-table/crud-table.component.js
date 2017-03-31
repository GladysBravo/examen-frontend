'use strict';

import controller from './crud-table.controller';

const CrudTableComponent = {
    bindings: {
        url: '<',
        title: '<',
        fields: '<',
        fieldsCreate: '<',
        fieldsUpdate: '<',
        fieldsSave: '<',
    },
    controller,
    template: `
        <div class="crud-table">
            <div class="d-flex justify-content-between">
                <div class="btn-container p-2">
                    <button class="btn btn-primary" md-effect ng-click="$ctrl.add()" type="button" uib-tooltip="Agregar nuevo registro"><i class="fa fa-plus"></i> Agregar</button>
                    <button class="btn btn-default" md-effect type="button" ng-click="$ctrl.refresh()" uib-tooltip="Actualizar tabla"><i class="fa fa-refresh"></i></button>
                </div>
                <form name="$ctrl.searchForm" class="form-search p-2" novalidate ng-submit="$ctrl.search()">
                    <div class="input-group">
                        <span class="input-group-btn" ng-if="$ctrl.searchTerm.length">
                            <button class="btn btn-default" type="button" ng-click="$ctrl.cleanSearch()" uib-tooltip="Limpiar búsqueda">
                                <i class="fa fa-trash"></i>
                            </button>
                        </span>
                        <input type="text" class="form-control" placeholder="Escriba su búsqueda aquí" name="searchTerm" ng-model="$ctrl.searchTerm" required />
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit" ng-disabled="$ctrl.searchForm.$invalid" uib-tooltip="Buscar en la tabla">
                                <i class="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
            <table ng-table-dynamic="$ctrl.tableParams with $ctrl.headers" 
                   class="table table-striped table-condensed table-responsive" 
                   show-filter="$ctrl.showFilter">
                <tr ng-repeat="row in $data">
                    <td ng-repeat="col in $columns">{{ row[col.field] | datetime: 'convert' }}</td>
                    <td data-title="'Acciones'" ng-if="true" class="btn-actions">
                        <button md-effect class="btn btn-default btn-sm" type="button" ng-click="$ctrl.edit(row)"><i class="fa fa-edit"></i></button>
                        <button md-effect class="btn btn-danger btn-sm" type="button" ng-click="$ctrl.delete(row)"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>
            </table>
        </div>
    `
};

export default CrudTableComponent;