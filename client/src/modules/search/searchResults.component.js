class SearchResultController {
  constructor() {
  }
}

SearchResultController.$inject = [];

const searchResults = {
  bindings: { transactions: '<' },
  controller: SearchResultController,
  controllerAs: 'vm',
  template: require('./searchResults.html')
};

export default searchResults;
