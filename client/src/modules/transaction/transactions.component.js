class TransactionsController {
  constructor($mdDialog, $state, transactionService) {
    this.$mdDialog = $mdDialog;
    this.$state = $state;
    this.transactionService = transactionService;
  }

  showDetails({id, concept, amount, transaction_date}, event) {
    this.$mdDialog.show({
      clickOutsideToClose: true,
      template: require('./transactionDialog.html'),
      targetEvent: event,
      locals: {
        concept: concept,
        amount: amount,
        date: transaction_date
      },
      controller: DialogController
    });

    function DialogController($scope, $mdDialog, concept, amount, date) {
      $scope.concept = concept;
      $scope.amount = amount;
      $scope.date = date;
      $scope.close = function() {
        $mdDialog.hide();
      };
    };
  }

  delete(id, event) {
    const confirm = this.$mdDialog.confirm()
          .title('Delete transaction')
          .textContent('Are you sure you want to delete this transaction?')
          .ariaLabel('Delete transaction')
          .targetEvent(event)
          .ok('Proceed')
          .cancel('Cancel');

    this.$mdDialog.show(confirm).then(() => {
      const transaction = this.transactionService.get(id).then(transaction => {
        transaction.remove().then(transaction => {
          this.$state.go('dashboard.transactions', null, {
            reload: true, inherit: false, notify: true
          });
        });
      });
    }, () => {
    });
  }
}

TransactionsController.$inject = ['$mdDialog', '$state', 'transactionService'];

const transactions = {
  bindings: { transactions: '<' },
  controller: TransactionsController,
  controllerAs: 'vm',
  template : require('./transactions.html')
};

export default transactions;
