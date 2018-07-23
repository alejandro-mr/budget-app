import angular from 'angular';
import Restangular from 'restangular';
import uiRouter from '@uirouter/angularjs';

import transactions from './transactions.component.js';
import transactionCreate from './transactionCreate.component';
import transactionImport from './transactionImport.component';
import transactionsList from './transactionsList.component';
import routes from './transactionRoute';

export default angular.module('BudgetApp.transaction', [Restangular, uiRouter])
  .config(routes)
  .component('transactions', transactions)
  .component('transactionCreate', transactionCreate)
  .component('transactionImport', transactionImport)
  .component('transactionsList', transactionsList)
  .factory('transactionService', function(Restangular) {
    return Restangular.all('transaction');
  })
  .name;
