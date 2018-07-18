var begin = angular.module('begin', ['toastr']);
begin.controller('loginController',function($scope, $http, $location, toastr){
  $scope.loginSubmit = function(login){
    $scope.loadLineLog = true;
    var data = {
      username: login.username,
      password: login.password
    }
    var onSuccess = function(response){
      console.log(response);
      $scope.loadLineLog = false;
      if (response.data.status == "error") {
        toastr.warning(response.data.keterangan);
      } else {
        localStorage.setItem("_token", JSON.stringify(response.data.token));
        localStorage.setItem("_modal", true);
        toastr.success(response.data.keterangan);
        if (response.data.level == 1) {
          window.location.href = 'wp-master';
        } else if (response.data.level == 2) {
          window.location.href = 'wp-admin';
        } else if (response.data.level == 3) {
          window.location.href = 'wp-tappatk';
        } else if (response.data.level == 4) {
          window.location.href = 'wp-taptsi';
        } else if (response.data.level == 5) {
          window.location.href = 'wp-kornas';
        } else if (response.data.level == 6) {
          window.location.href = 'wp-korwil';
        } else if (response.data.level == 7) {
          window.location.href = 'kuesioner';
        } else if (response.data.level == 8) {
          window.location.href = 'kuesioner';
        } else if (response.data.level == 9) {
          window.location.href = 'wp-user';
        }
      }
    }
    var onError = function(reason){
      toastr.info('Terjadi Kesalahan');
    }
    $http.post("api/auth.php?type=signin", data)
      .then(onSuccess, onError);
  }
});
