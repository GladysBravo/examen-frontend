'use strict';

import controller from './user.controller';

const UserComponent = {
    bindings: {},
    controller,
    template: `
        <div class="container">
            <h2 class="page-title"><i class="fa fa-user"></i> Usuarios <strong>del sistema</strong></h2>
            <div class="card">
                <div class="card-block">
                    <table ng-table="$ctrl.tableParams" class="table table-bordered table-striped table-condensed">
                        <tr ng-repeat="row in $data track by row.id">
                            <td data-title="'Installation At'" filter="{installationAt: 'text'}" sortable="'installationAt'">{{row.installationAt}}</td>
                            <td data-title="'Admin Email'" filter="{adminEmail: 'text'}" sortable="'adminEmail'">{{row.adminEmail}}</td>
                            <td data-title="'Powered By'" filter="{poweredBy: 'text'}" sortable="'poweredBy'">{{row.poweredBy}}</td>
                            <td data-title="'Powered By Icon'" filter="{poweredByIcon: 'text'}" sortable="'poweredByIcon'">{{row.poweredByIcon}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `
};

export default UserComponent;