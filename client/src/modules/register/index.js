import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngMessages from 'angular-messages';

import authService from '../authService';

import register from './register.component';
import service from './registerService';
import routes from './registerRoute';

export default angular.module('BudgetApp.register', [uiRouter, authService, ngMessages])
  .config(routes)
  .component('register', register)
  .service('registerService', service)
  .name;
