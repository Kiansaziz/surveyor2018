(function(){

    app.controller('fileDetailController', function($scope, AuthService, $http, toastr, $routeParams, $location, filterFilter){

      var dataBADetail = function(){
        var onSuccess = function(response){
          if (response.data == 'null') {
            $location.path('/file');
          } else if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            BA_C();
            $scope.ba = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/file.php?type=dataBaDetail",{"id":$routeParams.idBa})
        .then(onSuccess, onError);
      }

      var BA_C = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.ba.responden = response.data;

            $scope.getAlamat = function(param, urut){
              var data = filterFilter(param.responden, {nomor_kuesioner: param.id + urut});
              if (data != '') {
                return data[0].p102;
              } else {
                return '';
              }
            }
            $scope.getProfesi = function(param, urut){
              var data = filterFilter(param.responden, {nomor_kuesioner: param.id + urut});
              if (data != '') {
                return data[0].p201;
              } else {
                return '';
              }
            }

          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/file.php?type=ba_c",{"id":$routeParams.idBa})
        .then(onSuccess, onError);
      }









      var dataObservasiDetail = function(){
        var onSuccess = function(response){
          if (response.data == 'null') {
            $location.path('/file');
          } else if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.observasi = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/file.php?type=dataObservasiDetail",{"id":$routeParams.idObservasi})
        .then(onSuccess, onError);
      }

      if ($location.path() == '/file/ba/'+$routeParams.idBa) {
        dataBADetail();
      }
      if ($location.path() == '/file/observasi/'+$routeParams.idObservasi) {
        dataObservasiDetail();
      }

    });

}());
