class SearchController {
  constructor($state) {
    this.searchTerm = '';
    this.$state = $state;
  }

  search() {
    this.$state.go('dashboard.search', {q: this.searchTerm});
  }
}

SearchController.$inject = ['$state'];

const search = {
  controller: SearchController,
  controllerAs: 'vm',
  template: require('./searchForm.html')
};

export default search;
