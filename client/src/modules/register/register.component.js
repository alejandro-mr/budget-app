class RegisterController {
  constructor(registerService, $state, $timeout, $mdToast) {
    this.username = '';
    this.password = '';
    this.confirmPass = '';
    this.registering = false;

    this.registerService = registerService;
    this.$state = $state;
    this.$timeout = $timeout;
    this.$mdToast = $mdToast;
  }

  register() {
    if (this.userForm.$pristine) {
      this.errorMessage = 'Please provide your user information.';
      return false;
    }
    if (this.username !== '') {
      if (this.password === this.confirmPass) {
        this.registering = true;
        this.registerService.register(this.username, this.password)
          .then(({ success, message }) => {
            if (success) {
              const successMessage = `Your user ${message} has been correctly registered.`;
              this.$mdToast.show(
                this.$mdToast.simple()
                  .textContent(successMessage)
                  .hideDelay(3000)
              );
              this.$timeout((function() {
                this.$state.go('login');
              }).bind(this), 2000);
            }
          }, ({ error, message }) => {
            if (error) {
              this.errorMessage = message;
            }
          });
        this.registering = false;
      } else {
        this.errorMessage = 'Password & Confirmation must match.';
      }
    } else {
      this.errorMessage = "Username can't be empty.";
    }
    return true;
  }
}

RegisterController.$inject = ['registerService', '$state', '$timeout', '$mdToast'];

const register = {
  controller: RegisterController,
  controllerAs: 'vm',
  template: require('./register.html')
}

export default register;
