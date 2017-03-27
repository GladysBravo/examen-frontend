'use strict';

import controller from './crud-table.controller';

const CrudTableComponent = {
    bindings: {
        url: '<',
        title: '<'
    },
    controller,
    template: `
        <div class="crud-table">
            <div class="btn-container">
                <button class="btn btn-primary" ng-click="$ctrl.add()" type="button"><i class="fa fa-add"></i> Agregar</button>
            </div>
            <table ng-table-dynamic="$ctrl.tableParams with $ctrl.headers" class="table table-striped table-condensed ng-table-responsive">
                <tr ng-repeat="row in $data">
                    <td ng-repeat="col in $columns">{{ row[col.field] | datetime:'convert' }}</td>
                </tr>
            </table>
        </div>
    `
};

export default CrudTableComponent;