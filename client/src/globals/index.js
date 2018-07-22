import angular from 'angular';
import {authHookRunBlock} from "./requiresAuth.hook";

export default angular.module('BudgetApp.global', [])
  .run(authHookRunBlock)
  .name;
