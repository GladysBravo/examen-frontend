'use strict';

import controller from './breadcrumb.controller';
import './breadcrumb.css';

const BreadcrumbComponent = {
    template: `
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><i class="fa fa-home"></i> <a href="/">Home</a></li>
            <li class="breadcrumb-item" ng-if="$ctrl.getParent()">{{$ctrl.getParent()}}</li>
            <li class="breadcrumb-item active" ng-if="$ctrl.getCurrent()">{{$ctrl.getCurrent()}}</li>
        </ol>
    `,
    controller
};

export default BreadcrumbComponent;