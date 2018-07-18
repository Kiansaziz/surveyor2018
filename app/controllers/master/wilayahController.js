(function(){

    app.controller('wilayahController', function($scope, $rootScope, AuthService, $http, toastr){

      $scope.submit = function(dataSubmit, tableTujuan){
        var data = {
          'isi'     : dataSubmit,
          'tabel'   : tableTujuan,
          'token'   : JSON.parse(localStorage['_token'])
        }
        $http.post('../api/master/wilayah.php?type=submit', data).success(function(response){
          console.log(response);
          if (response.status == 'success') {
            toastr.success(response.keterangan);
            if (tableTujuan == 'tbl_prov') { $rootScope.$emit("ParentMainProvinsi", {}); }
            if (tableTujuan == 'tbl_kab')  { $rootScope.$emit("ParentMainKabupaten", {}); }
            if (tableTujuan == 'tbl_kec')  { $rootScope.$emit("ParentMainKecamatan", {}); }
            if (tableTujuan == 'tbl_kel')  { $rootScope.$emit("ParentMainKelurahan", {}); }
          } else if (response.status != 'success') {
            toastr.error(response.keterangan);
          } else {
            toastr.error('Terjadi Kesalahan');
          }
        });
      }


      $scope.deleteWilayah = function(detail, bagian, tabel){
        var idx = $scope.main[bagian].indexOf(detail);
        tanya=confirm("Apakah anda yakin akan menghapus wilayah ini?")
        if (tanya !="0")
        {
          var data = {
            id : detail.id,
            tabel : tabel
          }
          $http.post('../api/master/wilayah.php?type=delete', data).success(function(data){
            if (data.status == 'success') {
              toastr.success(data.keterangan);
              $scope.main[bagian].splice(idx,1);
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
