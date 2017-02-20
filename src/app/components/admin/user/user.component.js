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
                    <div loading-container="$ctrl.tableParams.settings().$loading">
                        <table ng-table="$ctrl.tableParams" class="table table-condensed table-bordered table-striped">
                            <tr ng-repeat="issue in $data">
                                <td data-title="'#'">
                                    <a target="_blank" ng-href="{{issue.html_url}}">{{issue.number}}</a>
                                </td>
                                <td data-title="'Theme'">{{issue.title}}</td>
                                <td data-title="'Opened by'">
                                    <a target="_blank" ng-href="{{issue.user.url}}">
                                    <nobr><img width="16" height="16" ng-src="{{issue.user.avatar_url}}" /> {{issue.user.login}}
                                    </nobr>
                                    </a>
                                </td>
                                <td data-title="'Updated'">
                                    <nobr>{{issue.updated_at | date:'medium'}}</nobr>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
};

export default UserComponent;