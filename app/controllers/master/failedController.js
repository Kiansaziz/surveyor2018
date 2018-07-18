(function(){

    app.controller('failedController', function($scope, $rootScope, AuthService, $http, toastr){

      var dataFailed = function(){
        $scope.loadData = true;
        var onSuccess = function(response){
          $scope.loadData = false;
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.fails = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/failed.php?type=dataFailed")
        .then(onSuccess, onError);
      }
      dataFailed();

      $scope.delete = function(detail){
      var idx = $scope.fails.indexOf(detail);
        var data = {
          id : detail.id
        }
        $http.post('../api/master/failed.php?type=delete', data).success(function(data){
          if (data.status == 'success') {
            $scope.fails.splice(idx,1);
          } else if (data.status != 'success') {
            toastr.warning(data.keterangan);
          } else {
            toastr.danger('Terjadi Kesalahan');
          }
        });
      }

    });

}());
