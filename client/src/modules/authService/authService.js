export default class AuthService {
  constructor($http, $window, $q, jwtHelper) {
    this.$window = $window;
    this.$http = $http;
    this.$q = $q;
    this.jwtHelper = jwtHelper;
  }

  logout() {
    this.$window.sessionStorage.removeItem('budgetApp:token');
    this.$window.sessionStorage.removeItem('budgetApp:refreshToken');
  }

  authenticate(user, password) {
    var deferred = this.$q.defer();
    this.$http.post('http://localhost:8080/api/login_check', {
      username: user,
      password: password
    }, {skipAuthorization: true}).then(({ data: { token, refresh_token }}) => {
      this.$window.sessionStorage.setItem('budgetApp:token', token);
      this.$window.sessionStorage.setItem('budgetApp:refreshToken', refresh_token);

      deferred.resolve({success: true});
    }, ({ data: {code, message }}) => {
      deferred.reject({error: true, message, code});
    });
    return deferred.promise;
  }

  isAuthenticated() {
    const token = this.$window.sessionStorage.getItem('budgetApp:token');
    const refreshToken = this.$window.sessionStorage.getItem('budgetApp:refreshToken');
    if (token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);

      if (!isExpired) {
        return true;
      } else {
        if (refreshToken) {
        }
      }
    }
    return false;
  }
}

AuthService.$inject = ['$http', '$window', '$q', 'jwtHelper'];