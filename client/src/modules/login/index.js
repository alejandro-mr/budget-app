import angular from 'angular';
import ngMessages from 'angular-messages';

import authService from '../authService';

import login from './login.component';
import routes from './loginRoute';

export default angular.module('BudgetApp.login', [authService, ngMessages])
  .config(routes)
  .component('login', login)
  .name;
