(function(){

    app.controller('errController', function($scope, $http, toastr, filterFilter){

      $scope.dataErrNull = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.errs = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/err.php?type=dataErrNull").then(onSuccess, onError);
      }
      $scope.dataErrNull();

      $scope.duplikat = function(detail, dari, ke){
        var post = {
          nomor : detail.nomor_kuesioner,
          dari : dari,
          ke : ke
        }
        var onSuccess = function(response){
          if (response.data.status == 'success') {
            toastr.success(response.data.keterangan);
          } else if (response.data.status != 'success') {
            toastr.warning(response.data.keterangan);
          } else {
            toastr.error('Terjadi Kesalahan');
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post('../api/master/err.php?type=duplikat', post).then(onSuccess, onError);
      }
    });

}());
