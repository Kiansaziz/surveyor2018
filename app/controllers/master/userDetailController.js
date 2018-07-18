(function(){

    app.controller('userDetailController', function($scope, $rootScope, $routeParams, AuthService, $http, toastr, $location){


      var userDetail = function(){
        var onSuccess = function(response){
          if (response.data == 'null') {
            $location.path('/user');
          } else if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $rootScope.user = response.data;
            runFunctionLain(response.data.level, response.data.kornas, response.data.korwil);
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/user.php?type=dataUserDetail",{"id":$routeParams.idUser})
        .then(onSuccess, onError);
      }
      userDetail();


      runFunctionLain = function(level, kornas, korwil){
        $scope.selectionKornas = kornas.split(',').map(String);
        $scope.selectionKorwil = korwil.split(',').map(String);
        if (level == '5') {
          dataKornas(kornas);
        }
        if (level == '6') {
          dataKorwil(korwil);
        }
      }



      $scope.toggleSelectionKornas = function toggleSelectionKornas(isi) {
         var idx = $scope.selectionKornas.indexOf(isi);
         if (idx > -1) {
           $scope.selectionKornas.splice(idx, 1);
         } else {
           $scope.selectionKornas.push(isi);
         }
      };
      $scope.toggleSelectionKorwil = function toggleSelectionKorwil(isi) {
         var idx = $scope.selectionKorwil.indexOf(isi);
         if (idx > -1) {
           $scope.selectionKorwil.splice(idx, 1);
         } else {
           $scope.selectionKorwil.push(isi);
         }
      };


      $scope.updateUser = function(detail){
        detail.kornasUpdate = $scope.selectionKornas;
        detail.korwilUpdate = $scope.selectionKorwil;
        $http.post('../api/master/user.php?type=update', detail).success(function(response){
          if (response.status == 'success') {
            userDetail();
            toastr.success(response.keterangan);
          } else if (response.status != 'success') {
            toastr.warning(response.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }




      // KEPERLUAN KORNAS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
      function dataKornas(id){
        var onSuccess = function(response){
          if (response.data == 'null') {
            toastr.warning('Tidak ditemukan Provinsi');
          } else if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $rootScope.user.dataKornass = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/user.php?type=dataKornas",{"id_prov" : id})
        .then(onSuccess, onError);
      }
      // KEPERLUAN KORNAS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------->




      // KEPERLUAN KORWIL -------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
      function dataKorwil(id){
        var onSuccess = function(response){
          if (response.data == 'null') {
            toastr.warning('Tidak ditemukan Kabupaten');
          } else if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $rootScope.user.dataKorwils = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/user.php?type=dataKorwil",{"id_kab" : id})
        .then(onSuccess, onError);
      }
      // KEPERLUAN KORWIL -------------------------------------------------------------------------------------------------------------------------------------------------------------------------->




      $scope.deleteUser = function(detail){
        tanya=confirm("Apakah anda yakin akan menghapus "+ detail.nama +" ?")
        if (tanya !="0")
        {
          $http.post('../api/master/user.php?type=delete', detail).success(function(data){
            if (data.status == 'success') {
              toastr.success(data.keterangan);
              $location.path('/user');
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
