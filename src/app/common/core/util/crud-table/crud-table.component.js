'use strict';

import controller from './crud-table.controller';

const CrudTableComponent = {
    bindings: {
        url: '<',
        title: '<',
        fields: '<'
    },
    controller,
    template: `
        <div class="crud-table">
            <div class="btn-container">
                <button class="btn btn-primary" ng-click="$ctrl.add()" type="button"><i class="fa fa-add"></i> Agregar</button>
                <button class="btn btn-default" type="button" ng-click="$ctrl.refresh()"><i class="fa fa-refresh"></i></button>
            </div>
            <table ng-table-dynamic="$ctrl.tableParams with $ctrl.headers" class="table table-striped table-condensed ng-table-responsive">
                <tr ng-repeat="row in $data">
                    <td ng-repeat="col in $columns">{{ row[col.field] | datetime:'convert' }}</td>
                    <td data-title="'Editar'"><button md-effect class="btn btn-default btn-xs" type="button" ng-click="$ctrl.edit(row)"><i class="fa fa-edit"></i></button></td>
                    <td data-title="'Eliminar'"><button md-effect class="btn btn-danger btn-xs" type="button" ng-click="$ctrl.delete(row)"><i class="fa fa-trash"></i></button></td>
                </tr>
            </table>
        </div>
    `
};

export default CrudTableComponent;