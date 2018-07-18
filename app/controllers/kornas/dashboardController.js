(function(){

    app.controller('dashboardController', function($scope, $http, toastr, filterFilter){

      $scope.dashboardKuesioner = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.dashboard.kuesioner = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/dashboard.php?type=kuesioner&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dashboardKuesioner();



      $scope.dashboardCapaian = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.dashboard.capaian = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/dashboard.php?type=capaian&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dashboardCapaian();

      $scope.dashboardCapaianPercent = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.dashboard.capaian_percent = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/dashboard.php?type=capaian_percent&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dashboardCapaianPercent();



      $scope.dashboardJenisKelamin = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {

            // $scope.dashboard.jenis_kelamin = response.data;

            $scope.dashboard.lakilaki   = filterFilter(response.data, {label: 'Laki-laki'});
            $scope.dashboard.perempuan  = filterFilter(response.data, {label: 'Perempuan'});

            $scope.totalJenisKelamin = function(){
                if (response.data == '') {
                  return 0;
                } else {
                  var total = 0;
                  for(var i = 0; i < response.data.length; i++){
                      var jumlah = parseInt(response.data[i].value);
                      total += jumlah;
                  }
                  return total;
                }
            }

            $scope.jumlahJenisKelamin = function(kelamin){
              if (response.data == '') {
                return 0;
              } else {
                for (var i = 0; i < response.data.length; i++) {
                  if (response.data[i].label == kelamin) { return response.data[i].value; break; }
                }
              }
            }

          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/dashboard.php?type=jenis_kelamin&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dashboardJenisKelamin();

      $scope.dashboardProfesi = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.dashboard.profesi = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/dashboard.php?type=profesi&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dashboardProfesi();

      $scope.dashboardProfesiLain = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.dashboard.profesi_lain = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/dashboard.php?type=profesi_lain&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dashboardProfesiLain();

      $scope.dashboardUsia = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.dashboard.usia = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/dashboard.php?type=usia&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dashboardUsia();

      $scope.dashboardPendidikan = function() {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.dashboard.pendidikan = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/dashboard.php?type=pendidikan&token=" + JSON.parse(localStorage['_token'])).then(onSuccess, onError);
      }
      $scope.dashboardPendidikan();


    });

}());
