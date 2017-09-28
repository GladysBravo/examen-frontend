'use strict';

import controller from './user.controller';

const UserComponent = {
    bindings: {},
    controller,
    template: `
        <div class="container">
            <h2 class="page-title"><i class="fa fa-user"></i> Usuarios <small><strong>del sistema</strong></small></h2>
            <div class="card">
                <div class="card-body">
                    <crud-table url="$ctrl.url"
                                ng-title="$ctrl.title"
                                fields="$ctrl.fields"
                                fields-create="$ctrl.fieldsCreate"></crud-table>
                </div>
            </div>
        </div>
    `
};

export default UserComponent;