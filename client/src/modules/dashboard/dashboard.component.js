class DashboardController {
  constructor($state, authService) {
    this.$state = $state;
    this.authService = authService;
    this.currentNavItem = 'list';

    this.loading = true;
  }

  create() {
    this.$state.go('dashboard.create');
    this.setNavItem('create');
  }

  isCreating() {
    return this.$state.$current.name === 'dashboard.create';
  }

  import() {
    this.$state.go('dashboard.import');
    this.setNavItem('import');
  }

  isImporting() {
    return this.$state.$current.name === 'dashboard.import';
  }

  setNavItem(name) {
    this.currentNavItem = name;
  }

  logout() {
    this.authService.logout().then(() => {
      this.$state.go('login');
    });
  }
}

DashboardController.$inject = ['$state', 'authService'];

const dashboard = {
  controller: DashboardController,
  controllerAs: 'vm',
  template: require('./dashboard.html')
};

export default dashboard;
