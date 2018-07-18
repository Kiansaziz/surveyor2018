(function(){

    app.controller('capaianController', function($scope, $http, toastr){

      $scope.capaian = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.capaian = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/korwil/capaian.php?type=capaian").then(onSuccess, onError);
      }
      $scope.capaian();

    });

}());
