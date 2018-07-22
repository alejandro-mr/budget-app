import angular from 'angular';
import moment from 'moment';
import ngMoment from 'angular-moment';

import Directive from './tableDirective';

export default angular.module('TransactionsTable', [
  ngMoment
])
  .diretive('transactions-table', Directive)
  .name;
