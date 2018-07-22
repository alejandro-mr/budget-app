class TransactionCreateController {
  constructor(transactionService, $state, $timeout) {
    this.transactionService = transactionService;
    this.$state = $state;
    this.$timeout = $timeout;
    this.creating = false;
  }

  submit() {
    this.creating = true;
    this.transactionService.post(this.transaction).then(() => {
      this.successMessage = 'Transaction saved correctly';
      this.creating = false;
      this.$timeout(() => {
        this.$state.go('dashboard.transactions', null, {
          reload: true, inherit: false, notify: true
        });
      }, 3000);
    }, () => {
      this.errorMessage = 'Something went wrong, please try again';
      this.creating = false;
    });
  }
}

TransactionCreateController.$inject = ['transactionService', '$state', '$timeout'];

const transactionCreate = {
  controller: TransactionCreateController,
  controllerAs: 'vm',
  template: require('./transactionForm.html')
}

export default transactionCreate;
