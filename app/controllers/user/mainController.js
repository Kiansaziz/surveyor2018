(function(){

    app.controller('mainController', function($scope, $rootScope, AuthService, $http, toastr, $location, $route, filterFilter){

      $scope.$route = $route;
      $scope.now = new Date().toISOString();

      $scope.logout = function(){
        AuthService.out();
      }

      // PEMANGGILAN PRIMARY
      var profile = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $rootScope.profile  = response.data;
            $scope.profile.aksi = {};
            $scope.profile.alert = {};
            BA();
            OBSERVASI();
            flow();
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/user/primaryUser.php?type=profile",{"token":token})
        .then(onSuccess, onError);
      }
      profile();


      var BA = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            BA_C();
            if (response.data != 'null') {
              $scope.profile.ba        = response.data;
              $scope.profile.aksi.ba   = 'update';
              $scope.profile.alert.ba  = true;
            } else {
              $scope.profile.aksi.ba   = 'insert';
              $scope.profile.alert.ba  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/user/primaryUser.php?type=ba",{"token":token})
        .then(onSuccess, onError);
      }

      var OBSERVASI = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.profile.observasi        = response.data;
              $scope.profile.aksi.observasi   = 'update';
              $scope.profile.alert.observasi  = true;
            } else {
              $scope.profile.aksi.observasi   = 'insert';
              $scope.profile.alert.observasi  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/user/primaryUser.php?type=observasi",{"token":token})
        .then(onSuccess, onError);
      }




      var BA_C = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.profile.responden = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/user/primaryUser.php?type=ba_c",{"token":token})
        .then(onSuccess, onError);
      }

      $scope.getNama = function(param, urut){
        var data = filterFilter(param.responden, {nomor_kuesioner: param.id + urut});
        if (data != '') {
          return data[0].p101;
        } else {
          return '';
        }
      }
      $scope.getAlamat = function(param, urut){
        var data = filterFilter(param.responden, {nomor_kuesioner: param.id + urut});
        if (data != '') {
          return data[0].p102;
        } else {
          return '';
        }
      }
      $scope.getProfesi = function(param, urut){
        var data = filterFilter(param.responden, {nomor_kuesioner: param.id + urut});
        if (data != '') {
          return data[0].p201;
        } else {
          return '';
        }
      }

      var flow = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $rootScope.profile.flow        = response.data;
              $rootScope.profile.aksi.flow   = 'update';
              $rootScope.profile.alert.flow  = true;
            } else {
              $rootScope.profile.aksi.flow   = 'update';
              $rootScope.profile.alert.flow  = true;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/user/primaryUser.php?type=flow",{"token":token})
        .then(onSuccess, onError);
      }

      $scope.changeList = function(param, value){
        if (value == '1') { var backValue = '0'; } else { var backValue = '1'; }
        var data = {
          'kolom'   : param,
          'value'   : value,
          'token'   : JSON.parse(localStorage['_token'])
        }
        $http.post('../api/user/allProccess.php?type=change', data).success(function(response){
          if (response.status == 'success') {
            toastr.success(response.keterangan);
          } else if (response.status != 'success') {
            $scope.profile.flow[param] = backValue;
            toastr.error(response.keterangan);
          } else {
            $scope.profile.flow[param] = backValue;
            toastr.error('Terjadi Kesalahan');
          }
        });
      }



      $scope.submit = function(dataSubmit, tableTujuan, aksi, grup){
        if (tableTujuan == 'tbl_user_kelurahan_ba') {
          if (!dataSubmit.telp_1 && !dataSubmit.telp_2 && !dataSubmit.telp_3 && !dataSubmit.telp_4 && !dataSubmit.telp_5 && !dataSubmit.telp_6 && !dataSubmit.telp_7 && !dataSubmit.telp_8 && !dataSubmit.telp_9 && !dataSubmit.telp_10) {
            toastr.error('Isi Minimal 1 Nomor Telpon Responden');
            return false
          }
        }
        var data = {
          'jawaban' : dataSubmit,
          'tabel'   : tableTujuan,
          'aksi'    : aksi,
          'grup'    : grup,
          'token'   : JSON.parse(localStorage['_token'])
        }
        $http.post('../api/user/allProccess.php?type=submit', data).success(function(response){
          if (response.status == 'success') {
            toastr.success(response.keterangan);
            $scope.profile.aksi[grup]   = 'update';
            $scope.profile.alert[grup]  = true;
          } else if (response.status != 'success') {
            toastr.error(response.keterangan);
          } else {
            toastr.error('Terjadi Kesalahan');
          }
        });
      }



    });
}());
