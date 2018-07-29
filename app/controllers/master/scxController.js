(function(){

    app.controller('scxController', function($scope, AuthService, $http, toastr){


      var sc = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.scs = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/scx.php?type=datasc")
        .then(onSuccess, onError);
      }
      sc();

      var sx = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.sxs = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/scx.php?type=datasx")
        .then(onSuccess, onError);
      }
      sx();


      $scope.scit = function(detail){
        var idx = $scope.scs.indexOf(detail);
        $http.post('../api/master/scx.php?type=scit', detail).success(function(response){
          if (response.status == 'success') {
            toastr.success(response.keterangan);
            $scope.scs.splice(idx,1);
          } else if (response.status != 'success') {
            toastr.warning(response.keterangan);
          } else {
            toastr.error('Terjadi Kesalahan');
          }
        });
      }

      $scope.sxit = function(detail){
        var idx = $scope.sxs.indexOf(detail);
        $http.post('../api/master/scx.php?type=sxit', detail).success(function(response){
          if (response.status == 'success') {
            toastr.success(response.keterangan);
            $scope.sxs.splice(idx,1);
          } else if (response.status != 'success') {
            toastr.warning(response.keterangan);
          } else {
            toastr.error('Terjadi Kesalahan');
          }
        });
      }

    });

}());
