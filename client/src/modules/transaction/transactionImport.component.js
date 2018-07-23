class TransactionImportController {
  constructor(transactionService, $mdToast, $state) {
    this.transactionService = transactionService;
    this.$mdToast = $mdToast;
    this.$state = $state;
  }

  upload() {
    this.uploading = true;

    const file = document.getElementById('fileUpload').files[0];

    const formData = new FormData();
    formData.append('import', file);

    this.transactionService.withHttpConfig({transformRequest: angular.identity})
      .customPOST(
        formData,
        'import',
        undefined,
        { 'Content-Type': undefined }
      ).then(transactions => {
        const ok = transactions.length > 0 ? true : false;
        const message = ok
              ? 'Transactions import successful!'
              : 'Please provide a valid import file.';

        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent(message)
            .hideDelay(3000)
        );

        this.uploading = false;
        if (ok) {
          this.$state.go('dashboard.transactions', null, {
            reload: true, inherit: false, notify: true
          });
        }
      }, error => {
        this.uploading = false;
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent(`
              Transactions import failed!
              error: ${error.message}
            `)
            .hideDelay(3000)
        );
      });

    this.uploading = false;
  }
};

TransactionImportController.$inject = ['transactionService', '$mdToast', '$state'];

const transactionImport = {
  controller: TransactionImportController,
  controllerAs: 'vm',
  template: require('./transactionImport.html')
};

export default transactionImport;
