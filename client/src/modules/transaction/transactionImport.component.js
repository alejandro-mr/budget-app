class TransactionImportController {
  constructor() {
  }

  upload() {
    console.log('importing file: ', this.importFile);
  }
};

TransactionImportController.$inject = [];

const transactionImport = {
  controller: TransactionImportController,
  controllerAs: 'vm',
  template: require('./transactionImport.html')
};

export default transactionImport;
