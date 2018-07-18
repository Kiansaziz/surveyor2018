(function(){

    app.controller('capaianController', function($scope, $http, toastr){

      $scope.capaianKornas = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.capaian_kornas = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/capaian.php?type=capaian_kornas").then(onSuccess, onError);
      }
      $scope.capaianKornas();

    });

}());
