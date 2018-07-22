import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import Restangular from 'restangular';
import moment from 'moment';
import ngMoment from 'angular-moment';

import authService from '../authService';

import dashboard from './dashboard.component';
import routes from './dashboardRoute';

export default angular.module('BudgetApp.home', [
  uiRouter,
  authService,
  Restangular,
  ngMoment
])
  .config(routes)
  .component('dashboard', dashboard)
  .name;
