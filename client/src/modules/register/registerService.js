export default class RegisterService {
  constructor($http, $window, $q) {
    this.$http = $http;
    this.$window = $window;
    this.$q = $q;
  }

  register(username, password) {
    const deferred = this.$q.defer();

    const REGISTER_URL = process.env.API_URL ? `${process.env.API_URL}/api/register` : 'http://localhost:8080/api/register';

    this.$http.post(REGISTER_URL, {
      username: username,
      password: password
    }, {skipAuthorization: true})
      .then(({ data }) => {
        if (data.code === 200) {
          deferred.resolve({
            success: true,
            message: data.data.username
          });
        } else {
          deferred.reject({
            error: true,
            message: data.data
          });
        }
      });

    return deferred.promise;
  }
}
RegisterService.$inject = ['$http', '$window', '$q'];
