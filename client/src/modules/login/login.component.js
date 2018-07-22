class LoginController {
  constructor($state, authService) {
    this.$state = $state;
    this.authService = authService;

    this.authenticating = false;
    this.credentials = {
      username: '',
      password: ''
    };
  }

  login() {
    if (this.userForm.$pristine) {
      this.loginMessage = "Please provide your user credentials";
      return false;
    }

    this.authenticating = true;

    const returnToOriginalState = () => {
      // here goes the login to retun to the original state, but since we only have dashboard we redirect to it.
      this.$state.go('dashboard.transactions');
    };

    const showError = ({ message }) => {
      this.errorMessage = message;
    };

    this.authService.authenticate(this.credentials.username, this.credentials.password)
      .then(returnToOriginalState)
      .catch(showError)
      .finally(() => this.authenticating = false);

    return true;
  }
}

LoginController.$inject = ['$state', 'authService'];

const login = {
  controller: LoginController,
  controllerAs: 'vm',
  template: require('./login.html'),
};

export default login;
