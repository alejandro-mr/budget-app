export default class RegisterService {
  constructor($http, $window, $q) {
    this.$http = $http;
    this.$window = $window;
    this.$q = $q;
  }

  register(username, password) {
    const deferred = this.$q.defer();

    this.$http.post('http://localhost:8080/api/register', {
      username: username,
      password: password
    }, {skipAuthorization: true})
      .then(({ data }) => {
        console.log(data);
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
