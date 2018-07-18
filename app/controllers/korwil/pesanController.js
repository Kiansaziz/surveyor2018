(function(){

    app.controller('pesanController', function($scope, AuthService, $http, toastr){

      $scope.pesan = [];


      var khusus = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.pesan.khususs = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/korwil/pesan.php?type=dataPesanKhusus&token=" + JSON.parse(localStorage['_token']))
        .then(onSuccess, onError);
      }
      khusus();

      var broadcast = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.pesan.broadcasts = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/korwil/pesan.php?type=dataPesanBroadcast&token=" + JSON.parse(localStorage['_token']))
        .then(onSuccess, onError);
      }
      broadcast();

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
        $http.post("../api/korwil/user.php?type=dataUser")
        .then(onSuccess, onError);
      }
      users();





      // Klik submit form simpan
      $scope.addPesanKhusus = function(detail){
        detail.token  = JSON.parse(localStorage['_token']);
        $http.post('../api/korwil/pesan.php?type=insertPesanKhusus', detail).success(function(response){
          if (response.status == 'success') {
            toastr.success(response.keterangan);
            khusus();
          } else if (response.status != 'success') {
            toastr.warning(response.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }


      $scope.deletePesan = function(detail, bagian, tabel){
        var idx = $scope.pesan[bagian].indexOf(detail);
        tanya=confirm("Apakah anda yakin akan menghapus Pesan ?")
        if (tanya !="0")
        {
          var data = {
            id : detail.id,
            tabel : tabel
          }
          $http.post('../api/korwil/pesan.php?type=delete', data).success(function(data){
            if (data.status == 'success') {
              toastr.success(data.keterangan);
              $scope.pesan[bagian].splice(idx,1);
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
