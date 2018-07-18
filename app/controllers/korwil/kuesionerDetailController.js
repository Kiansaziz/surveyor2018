(function(){

    app.controller('kuesionerDetailController', function($scope, $routeParams, $http, toastr, filterFilter, $location){

      // pencarian di hidden agar tidak lama load page
      $scope.search = {};



      var dataKuesionerDetail = function() {
        var onSuccess = function(response){
          if (response.data == 'null') {
            $location.path('/kuesioner');
          } else if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.kuesioner      = response.data;
            $scope.kuesioner.enum = {};
            $scope.kuesioner.data = {};
            $scope.kuesioner.final = {};
            beda();
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/kuesioner.php?type=dataKuesionerDetail",{"nomor_kuesioner":$routeParams.nomor_kuesioner}).then(onSuccess, onError);
      }
      dataKuesionerDetail();



      var beda = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.warning('Terjadi Kesalahan');
          } else {
            $scope.kuesioner.beda = response.data;

            $scope.grup = function(all, grup){
              var x = filterFilter( all, {grup:grup}).length;
              if (x != 0) {
                return x;
              }
            }

            jawaban('enum', 'ab');
            jawaban('data', 'ab');
            jawaban('final', 'ab');

            jawaban('enum', 'c');
            jawaban('data', 'c');
            jawaban('final', 'c');

            jawaban('enum', 'd');
            jawaban('data', 'd');
            jawaban('final', 'd');

            jawaban('enum', 'e');
            jawaban('data', 'e');
            jawaban('final', 'e');

            jawaban('enum', 'f');
            jawaban('data', 'f');
            jawaban('final', 'f');

            jawaban('enum', 'g');
            jawaban('data', 'g');
            jawaban('final', 'g');

            jawaban('enum', 'h');
            jawaban('data', 'h');
            jawaban('final', 'h');

            jawaban('enum', 'i');
            jawaban('data', 'i');
            jawaban('final', 'i');

            jawaban('enum', 'j');
            jawaban('data', 'j');
            jawaban('final', 'j');

            jawaban('enum', 'k');
            jawaban('data', 'k');
            jawaban('final', 'k');

// kians
            jawaban('enum', 'l');
            jawaban('data', 'l');
            jawaban('final', 'l');

            jawaban('enum', 'm');
            jawaban('data', 'm');
            jawaban('final', 'm');

            jawaban('enum', 'n');
            jawaban('data', 'n');
            jawaban('final', 'n');

          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/kuesioner.php?type=jawabanBeda",{"nomor_kuesioner":$routeParams.nomor_kuesioner}).then(onSuccess, onError);
      }






      var jawaban = function(bagian, grup){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else if (response.data == "null") {
            $scope.kuesioner[bagian][grup]  = '';
          } else {
            $scope.kuesioner[bagian][grup]  = response.data;

            $scope.pertanyaan = function(isi, pertanyaan){
              if (isi == '') {
                return
              } else {
                for (var i = 0; i < isi.length; i++) {
                  if (isi[i].pertanyaan == pertanyaan) { return true; break; }
                }
              }
            }

          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/kuesioner.php?type=jawaban",{"bagian":bagian, "grup":grup, "nomor_kuesioner":$routeParams.nomor_kuesioner})
        .then(onSuccess, onError);
      }





      $scope.ubahJawaban = function(grup, nomor_kuesioner, pertanyaan, jawaban, index){
        var onSuccess = function(response){
          if (response.data.status == "error") {
            toastr.error(response.data.keterangan);
          } else {

            toastr.success(response.data.keterangan);
            $scope.kuesioner.final[grup][pertanyaan]  = jawaban;

            $scope.kuesioner.beda = $scope.kuesioner.beda.filter(function( index ) {
                return index.pertanyaan !== pertanyaan;
            });

            if (response.data.valid_gb == "valid") {
              $scope.kuesioner.valid_gabungan = 0;
              for (var i = 0; i < $scope.main.kuesioners.length; i++) {
                if ($scope.main.kuesioners[i].nomor_kuesioner == nomor_kuesioner) { $scope.main.kuesioners[i].valid_gabungan = 0; break; }
              }
            } else {
              $scope.kuesioner.valid_gabungan = 1;
            }

          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/kuesioner.php?type=ubahJawaban",{"grup":grup, "nomor_kuesioner":nomor_kuesioner, "pertanyaan":pertanyaan, "jawaban":jawaban})
        .then(onSuccess, onError);
      }



    });

}());
