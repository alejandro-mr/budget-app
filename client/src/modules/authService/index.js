import angular from 'angular';

import authService from './authService';

export default angular.module('BudgetApp.auth', [])
  .service('authService', authService)
  .name;
