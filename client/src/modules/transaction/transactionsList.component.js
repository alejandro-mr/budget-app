class TransactionsListController {
  constructor($mdDialog, $mdToast, $state, transactionService) {
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.$state = $state;
    this.transactionService = transactionService;
    this.orderBy = 'transaction_date';
    this.reverse = true;
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

          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Transaction Removed correctly!')
              .hideDelay(3000)
          );

          this.$state.go('dashboard.transactions', null, {
            reload: true, inherit: false, notify: true
          });
        });
      });
    }, () => {
    });
  }

  setOrderBy(order) {
    this.reverse = (this.orderBy === order) ? !this.reverse : false;
    this.orderBy = order;
  }
}

TransactionsListController.$inject = [
  '$mdDialog',
  '$mdToast',
  '$state',
  'transactionService'
];

const transactionsList = {
  bindings: { transactions: '<' },
  controller: TransactionsListController,
  controllerAs: 'vm',
  template: require('./transactionsList.html')
};

export default transactionsList;
