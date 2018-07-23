import angular from 'angular';

import search from './search.component';
import searchResults from './searchResults.component';
import routes from './searchRoute';

export default angular.module('BudgetApp.search', [])
  .config(routes)
  .component('search', search)
  .component('searchResults', searchResults)
  .name;
