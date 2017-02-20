'use strict';

import Dashboard from './dashboard/dashboard.module';
import Login from './login/login.module';
import User from './user/user.module';

const Admin = angular
    .module('app.admin', [
        Dashboard,
        Login,
        User
    ])
    .name;

export default Admin;