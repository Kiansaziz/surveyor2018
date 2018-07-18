(function(){

    app.controller('mainController', function($scope, $rootScope, AuthService, $http, toastr, $filter, filterFilter, $route, $interval, $location){

      $scope.$route = $route;

      $scope.hari  = $filter('date')(new Date(), '-MM-dd');
      $scope.order = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };
      $scope.searchToggle = function(){
        $scope.mySearchFiled = !$scope.mySearchFiled;
      }
      String.prototype.trunc = String.prototype.trunc ||
      function(n){
          // untuk membatasi string jika terlalu panjang dari n maka akan diganti dengan ...
          return this.length>n ? this.substr(0,n-1)+'...' : this.toString();
      };
      $scope.now = new Date().toISOString();

      $scope.logout = function(){
        AuthService.out();
      }




      var profile = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.profile     = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/primary.php?type=profile",{"token":token})
        .then(onSuccess, onError);
      }
      profile();

      /// Klik submit form update
      $scope.updateProfile = function(detail){
        $http.post('../api/primary.php?type=updateProfile', detail).success(function(response){
          if (response.status == 'success') {
            toastr.success(response.keterangan);
          } else if (response.status != 'success') {
            toastr.warning(response.keterangan);
          } else {
            toastr.warning('Terjadi Kesalahan');
          }
        });
      }





      // SET array dashboard
      $scope.dashboard = [];
      // SET array main
      $scope.main = [];
      $scope.modal = [];
      $scope.main.pesan = [];

      $rootScope.$on("ParentMainPesanKhusus", function(){
         $scope.dataMainPesanKhusus();
      });
      $scope.dataMainPesanKhusus = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.main.pesan.khususs = response.data;
            $scope.pesanKhususNotRead = function(){
              return filterFilter($scope.main.pesan.khususs, {response:'0'}).length;
            }
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.get("../api/korwil/pesan.php?type=dataMainPesanKhusus&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dataMainPesanKhusus();


      $scope.showModalPesanKhusus = function(detail){
        var idx = $scope.main.pesan.khususs.indexOf(detail);
        $scope.modal.KhususPengirim = detail.dari;
        $scope.modal.KhususIsi      = detail.isi;
        $scope.modal.KhususTgl      = detail.date_entry;
        $scope.main.pesan.khususs[idx].response = '1';
        var data = { id : detail.id }
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/korwil/pesan.php?type=responsePesanKhusus", data).then(onSuccess, onError);
      }



      $rootScope.$on("ParentMainPesanBroadcast", function(){
         $scope.dataMainPesanBroadcast();
      });
      $scope.dataMainPesanBroadcast = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.main.pesan.broadcasts = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.get("../api/korwil/pesan.php?type=dataMainPesanBroadcast&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dataMainPesanBroadcast();












      $scope.main.levels =
      [
        { 'id': 6,   'nama_level' : 'KORWIL' }
      ];

      $rootScope.$on("ParentMainProvinsi", function(){
         $scope.dataMainProvinsi();
      });
      $scope.dataMainProvinsi = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.main.provinsi = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.get("../api/korwil/primary.php?type=dataProvinsi&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dataMainProvinsi();


      $rootScope.$on("ParentMainKabupaten", function(){
         $scope.dataMainKabupaten();
      });
      $scope.dataMainKabupaten = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.main.kabupatens = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.get("../api/korwil/primary.php?type=dataKabupaten&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dataMainKabupaten();


      $rootScope.$on("ParentMainKecamatan", function(){
         $scope.dataMainKecamatan();
      });
      $scope.dataMainKecamatan = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.main.kecamatans = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.get("../api/korwil/primary.php?type=dataKecamatan&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dataMainKecamatan();


      $rootScope.$on("ParentMainKelurahan", function(){
         $scope.dataMainKelurahan();
      });
      $scope.dataMainKelurahan = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.main.kelurahans = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.get("../api/korwil/primary.php?type=dataKelurahan&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dataMainKelurahan();

      $interval(function () {
          $scope.dataMainPesanBroadcast();
          $scope.dataMainPesanKhusus();
      }, 15000);








      $rootScope.$on("ParentMainKuesioner", function(){
         $scope.dataMainKuesioner();
      });
      $scope.dataMainKuesioner = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.main.kuesioners = response.data;

            $scope.capaianKab = function(kab){
              return (filterFilter($scope.main.kuesioners, {valid_gabungan:'0',id_kab:kab.id}, true).length / filterFilter($scope.main.kuesioners, {id_kab:kab.id}, true).length) * 100;
            }
            $scope.capaianKec = function(kec){
              return (filterFilter($scope.main.kuesioners, {valid_gabungan:'0',id_kec:kec.id}, true).length / filterFilter($scope.main.kuesioners, {id_kec:kec.id}, true).length) * 100;
            }
            $scope.capaianKel = function(kel){
              return (filterFilter($scope.main.kuesioners, {valid_gabungan:'0',id_kel:kel.id}, true).length / filterFilter($scope.main.kuesioners, {id_kel:kel.id}, true).length) * 100;
            }
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.get("../api/korwil/kuesioner.php?type=dataKuesioner&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dataMainKuesioner();

      $scope.$watch(function(){
          return $location.path();
      }, function(value){
          if (value == '/') {
            $rootScope.loopKuesioner = $interval(function(){ $scope.dataMainKuesioner(); }, 15000);
          } else {
            $interval.cancel($rootScope.loopKuesioner);
          }
      });


    });

}());
