export default function routes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    });
}

routes.$inject = ['$stateProvider'];
