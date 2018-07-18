(function(){

    app.controller('chartController', function($scope, $http, toastr, filterFilter){

      $scope.loadData = false;
      $scope.changeProv = function(filter){
        if (filter.id_prov == '') {
          delete $scope.filter.id_prov;
          delete $scope.filter.id_kab;
          delete $scope.filter.id_kec;
        } else {
          delete $scope.filter.id_kab;
          delete $scope.filter.id_kec;
        }
      }

      $scope.changeKab = function(filter){
        if (filter.id_kab == '') {
          delete $scope.filter.id_kab;
          delete $scope.filter.id_kec;
        } else {
          delete $scope.filter.id_kec;
        }
      }


      $scope.filterChart = function(filter) {
        $scope.loadData = true;
        var onSuccess = function(response){
          $scope.loadData = false;
          if (response.data.status != "success") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.chart = response.data;

            chartCapaian(response.data.wilayah, filter);
            chartCapaianPercent(response.data.wilayah, filter);
            chartJenisKelamin(filter);
            chartProfesi(filter);
            chartProfesiLain(filter);
            chartUsia(filter);
            chartPendidikan(filter);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/chart.php?type=filter",filter).then(onSuccess, onError);
      }



      var chartCapaian = function(wilayah, filter) {
        filter.wilayah = wilayah;
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.chart.capaian = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/chart.php?type=capaian", filter).then(onSuccess, onError);
      }



      var chartCapaianPercent = function(wilayah, filter) {
        filter.wilayah = wilayah;
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.chart.capaian_percent = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/chart.php?type=capaian_percent", filter).then(onSuccess, onError);
      }



      var chartJenisKelamin = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {

            // $scope.chart.jenis_kelamin = response.data;

            $scope.chart.lakilaki   = filterFilter(response.data, {label: 'Laki-laki'});
            $scope.chart.perempuan  = filterFilter(response.data, {label: 'Perempuan'});

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
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/chart.php?type=jenis_kelamin", filter).then(onSuccess, onError);
      }


      // $scope.keyProfesi = [];
      var chartProfesi = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.chart.profesi = response.data;

            // $scope.keyProfesi = response.data.map(function(elem){
            //     return elem.label.toString();
            // }).join(",");

          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/chart.php?type=profesi", filter).then(onSuccess, onError);
      }





      var chartProfesiLain = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.chart.profesi_lain = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/chart.php?type=profesi_lain", filter).then(onSuccess, onError);
      }





      var chartUsia = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.chart.usia = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/chart.php?type=usia", filter).then(onSuccess, onError);
      }



      var chartPendidikan = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.chart.pendidikan = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/chart.php?type=pendidikan", filter).then(onSuccess, onError);
      }


    });

}());
