export const configure = (
  $stateProvider, $urlRouterProvider, $locationProvider,
  $httpProvider, $windowProvider, jwtOptionsProvider,
  RestangularProvider
) => {
  $locationProvider.hashPrefix('');
  //$locationProvider.html5Mode(true);

	// This is required for Browser Sync to work poperly
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	$urlRouterProvider
		.otherwise('/dashboard');

  const BASE_URL = process.env.API_URL ? `${process.env.API_URL}/api` : 'http://localhost:8080/api';

  RestangularProvider.setBaseUrl(BASE_URL);
  RestangularProvider.setResponseExtractor(function(response, operation) {
    if (response && (response.code === 200 || response.code === 201)) {
      return response.data;
    } else {
      return [];
    }
  });

  const $window = $windowProvider.$get();
  jwtOptionsProvider.config({
    unauthenticatedRedirectPath: '/login',
    tokenGetter: function() {
      return $window.sessionStorage.getItem('budgetApp:token');
    },
    whiteListedDomains: ['localhost']
  });

  $httpProvider.interceptors.push('jwtInterceptor');
};

export const runBlock = ($rootScope, $location, authService, authManager) => {
  if (authManager.isAuthenticated()) {
    $location.path('/dashboard/transactions');
  } else {
    $location.path('/login');
  }

  $rootScope.$on('tokenHasExpired', function() {
    alert('Your session has expired!');
  });
};

configure.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  '$windowProvider',
  'jwtOptionsProvider',
  'RestangularProvider',
];

runBlock.$inject = [
  '$rootScope',
  '$location',
  'authService',
  'authManager'
];
