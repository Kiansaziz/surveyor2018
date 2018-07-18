(function(){

    app.controller('userController', function($scope, AuthService, $http, toastr){


      var users = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.users = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/user.php?type=dataUser")
        .then(onSuccess, onError);
      }
      users();


      $scope.hapusSelection = function(){
        $scope.selectionKornas = [];
        $scope.selectionKorwil = [];
      }
      $scope.selectionKornas = [];
      $scope.toggleSelectionKornas = function toggleSelectionKornas(isi) {
         var idx = $scope.selectionKornas.indexOf(isi);
         if (idx > -1) {
           $scope.selectionKornas.splice(idx, 1);
         } else {
           $scope.selectionKornas.push(isi);
         }
      };
      $scope.selectionKorwil = [];
      $scope.toggleSelectionKorwil = function toggleSelectionKorwil(isi) {
         var idx = $scope.selectionKorwil.indexOf(isi);
         if (idx > -1) {
           $scope.selectionKorwil.splice(idx, 1);
         } else {
           $scope.selectionKorwil.push(isi);
         }
      };

      // Klik submit form simpan
      $scope.addUser = function(detail){
        detail.kornas = $scope.selectionKornas;
        detail.korwil = $scope.selectionKorwil;
        $http.post('../api/master/user.php?type=insert', detail).success(function(response){
          if (response.status == 'success') {
            users();
            toastr.success(response.keterangan);
          } else if (response.status != 'success') {
            toastr.warning(response.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }


      $scope.deleteUser = function(detail){
        tanya=confirm("Apakah anda yakin akan menghapus "+ detail.nama +" ?")
        if (tanya !="0")
        {
          var idx = $scope.users.indexOf(detail);
          $http.post('../api/master/user.php?type=delete', detail).success(function(data){
            if (data.status == 'success') {
              toastr.success(data.keterangan);
              $scope.users.splice(idx,1);
            } else if (data.status != 'success') {
              toastr.warning(data.keterangan);
            } else {
              toastr.danger('Terjadi Kesalahan');
            }
          });
        }
      }

    });

}());
