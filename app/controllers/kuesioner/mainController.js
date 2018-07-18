(function(){

    app.controller('mainController', function($scope, $rootScope, AuthService, $http, toastr, $location, $route){

      if (localStorage['_modal'] == 'true') {
        $('#myModalWelcome').modal('show');
      }
      $scope.stopModal = function(){
        localStorage.setItem("_modal", false);
      }

      $scope.$route = $route;
      $scope.now = new Date().toISOString();

      $scope.logout = function(){
        AuthService.out();
      }



      // PEMANGGILAN PRIMARY
      var kuesioner = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $rootScope.kuesioner  = response.data;
            $scope.kuesioner.aksi = {};
            $scope.kuesioner.alert = {};
            jawabanAB();
            jawabanC();
            jawabanD();
            jawabanE();
            jawabanF();
            jawabanG();
            jawabanH();
            jawabanI();
            jawabanJ();
            jawabanK();
            jawabanL();
            jawabanM();
            jawabanN();
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=kuesioner",{"token":token})
        .then(onSuccess, onError);
      }
      kuesioner();



      // Disable 201
      var jawaban201 = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            $scope.jwb201  = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawaban201",{"token":token})
        .then(onSuccess, onError);
      }
      jawaban201();
      $scope.disabled201 = function(param){
        if ($scope.jwb201 == '') { return false; }
        for (var i = 0; i < $scope.jwb201.length; i++) {
          if ($scope.jwb201[i].p201 == param) {
            return 'true';
            break;
          }
        }
      }





      // PEMANGGILAN DULU SEMUA BERDASARKAN GRUP
      var jawabanAB = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.ab        = response.data;
              $scope.kuesioner.aksi.ab   = 'update';
              $scope.kuesioner.alert.ab  = true;
            } else {
              $scope.kuesioner.aksi.ab   = 'insert';
              $scope.kuesioner.alert.ab  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanAB",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanC = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.c        = response.data;
              $scope.kuesioner.aksi.c   = 'update';
              $scope.kuesioner.alert.c  = true;
            } else {
              $scope.kuesioner.aksi.c   = 'insert';
              $scope.kuesioner.alert.c  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanC",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanD = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.d        = response.data;
              $scope.kuesioner.aksi.d   = 'update';
              $scope.kuesioner.alert.d  = true;
            } else {
              $scope.kuesioner.aksi.d   = 'insert';
              $scope.kuesioner.alert.d  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanD",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanE = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.e        = response.data;
              $scope.kuesioner.aksi.e   = 'update';
              $scope.kuesioner.alert.e  = true;
            } else {
              $scope.kuesioner.aksi.e   = 'insert';
              $scope.kuesioner.alert.e  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanE",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanF = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.f        = response.data;
              $scope.kuesioner.aksi.f   = 'update';
              $scope.kuesioner.alert.f  = true;
            } else {
              $scope.kuesioner.aksi.f   = 'insert';
              $scope.kuesioner.alert.f  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanF",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanG = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.g        = response.data;
              $scope.kuesioner.aksi.g   = 'update';
              $scope.kuesioner.alert.g  = true;
            } else {
              $scope.kuesioner.aksi.g   = 'insert';
              $scope.kuesioner.alert.g  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanG",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanH = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.h        = response.data;
              $scope.kuesioner.aksi.h   = 'update';
              $scope.kuesioner.alert.h  = true;
            } else {
              $scope.kuesioner.aksi.h   = 'insert';
              $scope.kuesioner.alert.h  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanH",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanI = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.i        = response.data;
              $scope.kuesioner.aksi.i   = 'update';
              $scope.kuesioner.alert.i  = true;
            } else {
              $scope.kuesioner.aksi.i   = 'insert';
              $scope.kuesioner.alert.i  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanI",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanJ = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.j        = response.data;
              $scope.kuesioner.aksi.j   = 'update';
              $scope.kuesioner.alert.j  = true;
            } else {
              $scope.kuesioner.aksi.j   = 'insert';
              $scope.kuesioner.alert.j  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanJ",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanK = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.k        = response.data;
              $scope.kuesioner.aksi.k   = 'update';
              $scope.kuesioner.alert.k  = true;
            } else {
              $scope.kuesioner.aksi.k   = 'insert';
              $scope.kuesioner.alert.k  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanK",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanL = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.l        = response.data;
              $scope.kuesioner.aksi.l   = 'update';
              $scope.kuesioner.alert.l  = true;
            } else {
              $scope.kuesioner.aksi.l   = 'insert';
              $scope.kuesioner.alert.l  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanL",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanM = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.m        = response.data;
              $scope.kuesioner.aksi.m   = 'update';
              $scope.kuesioner.alert.m  = true;
            } else {
              $scope.kuesioner.aksi.m   = 'insert';
              $scope.kuesioner.alert.m  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanM",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanN = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.n        = response.data;
              $scope.kuesioner.aksi.n   = 'update';
              $scope.kuesioner.alert.n  = true;
            } else {
              $scope.kuesioner.aksi.n   = 'insert';
              $scope.kuesioner.alert.n  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanN",{"token":token})
        .then(onSuccess, onError);
      }





      $scope.submit = function(dataSubmit, tableTujuan, aksi, grup){
        if (localStorage.getItem("_token") === null) {
          toastr.error('Terjadi Kesalahan, Harap Login Kembali');
          return false;
        }
        // PENGATURAN GRUP B
        if (grup == 'ab') {
          if(dataSubmit.p201     != 'Profesi Lainnya'){ dataSubmit.p201x = ''; }
          if(dataSubmit.p202a1   != 'Ya'){ dataSubmit.p202a2 = '';  }
          if(dataSubmit.p202b11  != 'Ya'){ dataSubmit.p202b12 = ''; }
          if(dataSubmit.p202b21  != 'Ya'){ dataSubmit.p202b22 = ''; }
          if(dataSubmit.p202b31  != 'Ya'){ dataSubmit.p202b32 = ''; }
          if(dataSubmit.p202b41  != 'Ya'){ dataSubmit.p202b42 = ''; }
          if(dataSubmit.p202b51  != 'Ya'){ dataSubmit.p202b52 = ''; }
          if(dataSubmit.p202b61  != 'Ya'){ dataSubmit.p202b62 = ''; }
          if(dataSubmit.p202b71  != 'Ya'){ dataSubmit.p202b72 = ''; }
          if(dataSubmit.p202b81  != 'Ya'){ dataSubmit.p202b82 = ''; }
        }
        // PENGATURAN GRUP C
        if (grup == 'c') {
          if(dataSubmit.p303a == 'Ya'){ dataSubmit.p303b1 = ''; dataSubmit.p303b2 = ''; dataSubmit.p303b3 = ''; dataSubmit.p303c  = ''; }
        }
        // PENGATURAN GRUP E
        if (grup == 'e') {
          if(dataSubmit.p501a == 'Tidak'){ dataSubmit.p501b1 = ''; dataSubmit.p501b2 = ''; dataSubmit.p501b3 = ''; dataSubmit.p501b4 = ''; dataSubmit.p501b5 = ''; dataSubmit.p501b6 = ''; dataSubmit.p501b7 = ''; dataSubmit.p501b8 = ''; }
          if(dataSubmit.p502a == 'Tidak'){ dataSubmit.p502b1 = ''; dataSubmit.p502b2 = ''; dataSubmit.p502b3 = ''; dataSubmit.p502b4 = ''; dataSubmit.p502b5 = ''; dataSubmit.p502b6 = ''; }
        }
        // PENGATURAN GRUP F
        if (grup == 'f') {
          if(dataSubmit.p603a == 'Ya'){ dataSubmit.p603b1 = ''; dataSubmit.p603b2 = ''; dataSubmit.p603b3 = ''; dataSubmit.p603c = ''; }
        }
        // PENGATURAN GRUP H
        if (grup == 'h') {
          if(dataSubmit.p801a == 'Tidak Pernah' && dataSubmit.p801b == 'Tidak Pernah' && dataSubmit.p801c == 'Tidak Pernah' && dataSubmit.p801d == 'Tidak Pernah'){
            dataSubmit.p802a = '';
            dataSubmit.p802b = '';
            dataSubmit.p802c = '';
            dataSubmit.p802d = '';
            dataSubmit.p802e = '';
            dataSubmit.p802f = '';
          }
        }
        // PENGATURAN GRUP I
        if (grup == 'i') {
          if(dataSubmit.p9013 <= 5){ dataSubmit.p9014 = ''; }
          if(dataSubmit.p9023 <= 5){ dataSubmit.p9024 = ''; }
          if(dataSubmit.p9033 <= 5){ dataSubmit.p9034 = ''; }
          if(dataSubmit.p9043 <= 5){ dataSubmit.p9044 = ''; }
          if(dataSubmit.p9053 <= 5){ dataSubmit.p9054 = ''; }
          if(dataSubmit.p9063 <= 5){ dataSubmit.p9064 = ''; }
          if(dataSubmit.p9073 <= 5){ dataSubmit.p9074 = ''; }
          if(dataSubmit.p9083 <= 5){ dataSubmit.p9084 = ''; }
          if(dataSubmit.p9093 <= 5){ dataSubmit.p9094 = ''; }
          if(dataSubmit.p9095 <= 5){ dataSubmit.p9096 = ''; }
          if(dataSubmit.p9103 <= 5){ dataSubmit.p9104 = ''; }
          if(dataSubmit.p9105 <= 5){ dataSubmit.p9106 = ''; }
          if(dataSubmit.p9113 <= 5){ dataSubmit.p9114 = ''; }
          if(dataSubmit.p9115 <= 5){ dataSubmit.p9116 = ''; }
          if(dataSubmit.p9123 <= 5){ dataSubmit.p9124 = ''; }
          if(dataSubmit.p9125 <= 5){ dataSubmit.p9126 = ''; }
          if(dataSubmit.p9135 <= 5){ dataSubmit.p9136 = ''; }
          if(dataSubmit.p9145 <= 5){ dataSubmit.p9146 = ''; }
          if(dataSubmit.p9155 <= 5){ dataSubmit.p9156 = ''; }
          if(dataSubmit.p9165 <= 5){ dataSubmit.p9166 = ''; }
          if(dataSubmit.p9175 <= 5){ dataSubmit.p9176 = ''; }
          if(dataSubmit.p9185 <= 5){ dataSubmit.p9186 = ''; }
          if(dataSubmit.p9195 <= 5){ dataSubmit.p9196 = ''; }
          if(dataSubmit.p9205 <= 5){ dataSubmit.p9206 = ''; }
          if(dataSubmit.p9215 <= 5){ dataSubmit.p9216 = ''; }
          if(dataSubmit.p9225 <= 5){ dataSubmit.p9226 = ''; }
        }
        // PENGATURAN GRUP J
        if (grup == 'j') {
          if(dataSubmit.p1001 == 'Tidak') {
            dataSubmit.p1002    ='';
            dataSubmit.p1003a   ='';
            dataSubmit.p1003b1  ='';
            dataSubmit.p1003b2  ='';
            dataSubmit.p1003b3  ='';
            dataSubmit.p1003b4  ='';
            dataSubmit.p1003b5  ='';
            dataSubmit.p1003b6  ='';
            dataSubmit.p1003b7  ='';
            dataSubmit.p1003b8  ='';
            dataSubmit.p1003b9  ='';
            dataSubmit.p1003b10 ='';
            dataSubmit.p1003b11 ='';
            dataSubmit.p1003b12 ='';
            dataSubmit.p1003b13 ='';
            dataSubmit.p1004a   ='';
            dataSubmit.p1004b   ='';
            dataSubmit.p1004c   ='';
            dataSubmit.p1004d   ='';
            dataSubmit.p1004e   ='';
            dataSubmit.p1005a   ='';
            dataSubmit.p1005b   ='';
            dataSubmit.p1005c   ='';
            dataSubmit.p1005d   ='';
            dataSubmit.p1005e   ='';
            dataSubmit.p1006a   ='';
            dataSubmit.p1006b1  ='';
            dataSubmit.p1006b2  ='';
            dataSubmit.p1006b3  ='';
            dataSubmit.p1006b4  ='';
            dataSubmit.p1006b5  ='';
            dataSubmit.p1006b6  ='';
            dataSubmit.p1006b7  ='';
            dataSubmit.p1006b8  ='';
            dataSubmit.p1006b9  ='';
            dataSubmit.p1006b10 ='';
            dataSubmit.p1006b11 ='';
            dataSubmit.p1006b12 ='';
            dataSubmit.p1007    ='';
          }
          if (dataSubmit.p1003a == 'Tidak') {
           dataSubmit.p1003b1 ='';
           dataSubmit.p1003b2 ='';
           dataSubmit.p1003b3 ='';
           dataSubmit.p1003b4 ='';
           dataSubmit.p1003b5 ='';
           dataSubmit.p1003b6 ='';
           dataSubmit.p1003b7 ='';
           dataSubmit.p1003b8 ='';
           dataSubmit.p1003b9 ='';
           dataSubmit.p1003b10 ='';
           dataSubmit.p1003b11 ='';
           dataSubmit.p1003b12 ='';
           dataSubmit.p1003b13 ='';
          }
          if (dataSubmit.p1006a == 'Tidak') {
            dataSubmit.p1006b1 ='';
            dataSubmit.p1006b2 ='';
            dataSubmit.p1006b3 ='';
            dataSubmit.p1006b4 ='';
            dataSubmit.p1006b5 ='';
            dataSubmit.p1006b6 ='';
            dataSubmit.p1006b7 ='';
            dataSubmit.p1006b8 ='';
            dataSubmit.p1006b9 ='';
            dataSubmit.p1006b10 ='';
            dataSubmit.p1006b11 ='';
            dataSubmit.p1006b12 ='';
          }
        }
        // PENGATURAN GRUP K
        if (grup == 'k') {
          if (dataSubmit.p1101b == 'Tidak') {dataSubmit.p1101c =''}
        }
        // PENGATURAN GRUP L
        if (grup == 'l') {
          if (dataSubmit.p1202a == 'Tidak') {dataSubmit.p1202b =''}
        }
        // PENGATURAN GRUP M
        if (grup == 'm') {
          if (dataSubmit.p1301a == 'Tidak Pernah'
              && dataSubmit.p1301b == 'Tidak Pernah'
              && dataSubmit.p1301c == 'Tidak Pernah'
              && dataSubmit.p1301d == 'Tidak Pernah'
              && dataSubmit.p1301e == 'Tidak Pernah'
              && dataSubmit.p1301f == 'Tidak Pernah'
              && dataSubmit.p1301g == 'Tidak Pernah'
              && dataSubmit.p1301h == 'Tidak Pernah'
              && dataSubmit.p1301i == 'Tidak Pernah') {
             dataSubmit.p1303a = '' ;
             dataSubmit.p1303b = '' ;
             dataSubmit.p1303c = '' ;
             dataSubmit.p1303d = '' ;
             dataSubmit.p1303e = '' ;
             dataSubmit.p1303f = '' ;
             dataSubmit.p1303g = '' ;
             dataSubmit.p1303h = '' ;
           }
         }
        // MENYIAPKAN DATA UNTUK POST
        var data = {
          'jawaban' : dataSubmit,
          'tabel'   : tableTujuan,
          'aksi'    : aksi,
          'grup'    : grup,
          'token'   : JSON.parse(localStorage['_token'])
        }
        $http.post('../api/kuesioner/allProccess.php?type=submit', data).success(function(response){
          console.log(response);
          if (response.status == 'success') {
            toastr.success(response.keterangan);
            $scope.kuesioner.aksi[grup]   = 'update';
            $scope.kuesioner.alert[grup]  = true;
            if (response.hasil == 'insert') {
              if (grup == 'ab') { $location.path('/c'); }
              if (grup == 'c') { $location.path('/d'); }
              if (grup == 'd') { $location.path('/e'); }
              if (grup == 'e') { $location.path('/f'); }
              if (grup == 'f') { $location.path('/g'); }
              if (grup == 'g') { $location.path('/h'); }
              if (grup == 'h') { $location.path('/i'); }
              if (grup == 'i') { $location.path('/j'); }
              if (grup == 'j') { $location.path('/k'); }
              if (grup == 'k') { $location.path('/l'); }
              if (grup == 'l') { $location.path('/m'); }
              if (grup == 'm') { $location.path('/n'); }
            }
          } else if (response.status != 'success') {
            toastr.error(response.keterangan);
          } else {
            toastr.error('Terjadi Kesalahan');
          }
        });
      }

    });
}());
