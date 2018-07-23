export default function routes($stateProvider) {
  $stateProvider
    .state('dashboard.search', {
      url: '/search',
      params: {
        q: null
      },
      component: 'searchResults',
      resolve: {
        transactions: (transactionService, $transition$) => {
          return transactionService.getList({q: $transition$.params().q});
        }
      },
      data: {
        requiresLogin: true
      }
    });
}

routes.$inject = ['$stateProvider'];

