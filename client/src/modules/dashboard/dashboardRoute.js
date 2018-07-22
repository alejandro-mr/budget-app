export default function routes($stateProvider) {
  $stateProvider
    .state('dashboard', {
			url: '/dashboard',
      abstract: true,
      component: 'dashboard',
      data: {
        requiresLogin: true
      }
		});
};

routes.$inject = [
  '$stateProvider'
];
