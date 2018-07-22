export default function routes($stateProvider) {
  $stateProvider
    .state('register', {
      url: '/register',
      component: 'register'
    });
};

routes.$inject = ['$stateProvider'];
