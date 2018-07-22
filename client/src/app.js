/**
 * @ngdoc index
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */

import '../node_modules/angular-material/angular-material.css';

import angular from 'angular';
import uiRouter from "@uirouter/angularjs";
import angularJwt from 'angular-jwt';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMessages from 'angular-messages';
import restangular from 'restangular';
import moment from 'moment';
import ngMoment from 'angular-moment';

import { configure, runBlock } from './app.config';
// Global module
import global from './globals';
// Services
import authService from './modules/authService';
// Modules
import dashboard from './modules/dashboard';
import login from './modules/login';
import register from './modules/register';
import transaction from './modules/transaction';

angular.module('BudgetApp', [
	ngAria,
	ngMaterial,
	ngMessages,
	ngAnimate,
  uiRouter,
  angularJwt,
  restangular,
  ngMoment,
  authService,
  global,
  dashboard,
  login,
  register,
  transaction
])
  .config(configure)
  .run(runBlock);
