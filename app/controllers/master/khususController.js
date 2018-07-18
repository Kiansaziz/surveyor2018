(function(){

    app.controller('khususController', function($scope, AuthService, $http, toastr){

      $scope.tambahkanIdProv = function(){
        $http.post('../api/master/khusus.php?type=tambahkanIdProv').success(function(data){
          console.log(data);
          if (data.status == 'success') {
            toastr.success(data.keterangan);
          } else if (data.status != 'success') {
            toastr.warning(data.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }

      $scope.tambahkanIdKab = function(){
        $http.post('../api/master/khusus.php?type=tambahkanIdKab').success(function(data){
          console.log(data);
          if (data.status == 'success') {
            toastr.success(data.keterangan);
          } else if (data.status != 'success') {
            toastr.warning(data.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }

      $scope.tambahkanIdKec = function(){
        $http.post('../api/master/khusus.php?type=tambahkanIdKec').success(function(data){
          console.log(data);
          if (data.status == 'success') {
            toastr.success(data.keterangan);
          } else if (data.status != 'success') {
            toastr.warning(data.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }


      $scope.tambahkanIdKel = function(){
        $http.post('../api/master/khusus.php?type=tambahkanIdKel').success(function(data){
          console.log(data);
          if (data.status == 'success') {
            toastr.success(data.keterangan);
          } else if (data.status != 'success') {
            toastr.warning(data.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }

      $scope.kosongkan = function(){
        $http.post('../api/master/khusus.php?type=kosongkan').success(function(data){
          console.log(data);
          if (data.status == 'success') {
            toastr.success(data.keterangan);
          } else if (data.status != 'success') {
            toastr.warning(data.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }


      $scope.pindahkan = function(){
        $http.post('../api/master/khusus.php?type=pindahkan').success(function(data){
          console.log(data);
          if (data.status == 'success') {
            toastr.success(data.keterangan);
          } else if (data.status != 'success') {
            toastr.warning(data.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }



    });

}());
