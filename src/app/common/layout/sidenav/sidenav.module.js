'use strict';

import SidenavComponent from './sidenav.component';
import SidenavFactory from './sidenav.factory';
import ToggleMenu from './toggle-menu.directive';

const Sidenav = angular
    .module('app.sidenav', [])
    .component('appSidenav', SidenavComponent) 
    .directive('toggleMenu', () => new ToggleMenu())
    .factory('SidenavFactory', SidenavFactory)
    .name;

export default Sidenav;