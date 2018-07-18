(function(){

    app.controller('fileController', function($scope, AuthService, $http, toastr, filterFilter){


      var BA = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.bas      = response.data;
            $scope.basKosong= filterFilter(response.data, {ba : null}).length;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/file.php?type=dataBA&token="+JSON.parse(localStorage['_token']))
        .then(onSuccess, onError);
      }
      BA();

      var Observasi = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.observasis = response.data;
            $scope.observasisKosong= filterFilter(response.data, {observasi : null}).length;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/file.php?type=dataObservasi&token="+JSON.parse(localStorage['_token']))
        .then(onSuccess, onError);
      }
      Observasi();

    });

}());
