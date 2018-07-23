class TransactionCreateController {
  constructor(transactionService, $state, $timeout, $mdToast) {
    this.transactionService = transactionService;
    this.$state = $state;
    this.$timeout = $timeout;
    this.$mdToast = $mdToast;
    this.creating = false;
  }

  submit() {
    this.creating = true;
    this.transactionService.post(this.transaction).then(() => {
      this.creating = false;
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Transaction saved correctly!')
          .hideDelay(3000)
      );
      this.$timeout(() => {
        this.$state.go('dashboard.transactions', null, {
          reload: true, inherit: false, notify: true
        });
      }, 2000);
    }, () => {
      this.errorMessage = 'Something went wrong, please try again';
      this.creating = false;
    });
  }
}

TransactionCreateController.$inject = ['transactionService', '$state', '$timeout', '$mdToast'];

const transactionCreate = {
  controller: TransactionCreateController,
  controllerAs: 'vm',
  template: require('./transactionForm.html')
}

export default transactionCreate;
