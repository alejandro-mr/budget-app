export default function routes($stateProvider) {
  $stateProvider
    .state('dashboard.transactions', {
      url: '/transactions',
      component: 'transactions',
      data: {
        requiresLogin: true
      },
      resolve: {
        transactions: function(transactionService) {
          return transactionService.getList();
        }
      }
    })
    .state('dashboard.import',  {
      url: '/transactions/import',
      data: {
        requiresLogin: true
      },
      component: 'transactionImport'
    })
    .state('dashboard.create', {
      url: '/transaction/create',
      component: 'transactionCreate',
      data: {
        requiresLogin: true
      }
    });
}

routes.$inject = [
  '$stateProvider',
];
