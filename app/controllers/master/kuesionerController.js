(function(){

    app.controller('kuesionerController', function($scope, AuthService, $http, toastr){

      $scope.changeProv = function(cari){
        if (cari.id_prov == '') {
          delete $scope.search.id_prov;
          delete $scope.search.id_kab;
          delete $scope.search.id_kec;
          delete $scope.search.id_kel;
        } else {
          delete $scope.search.id_kab;
          delete $scope.search.id_kec;
          delete $scope.search.id_kel;
        }
      }

      $scope.changeKab = function(cari){
        if (cari.id_kab == '') {
          delete $scope.search.id_kab;
          delete $scope.search.id_kec;
          delete $scope.search.id_kel;
        } else {
          delete $scope.search.id_kec;
          delete $scope.search.id_kel;
        }
      }

      $scope.changeKec = function(cari){
        if (cari.id_kec == '') {
          delete $scope.search.id_kec;
          delete $scope.search.id_kel;
        } else {
          delete $scope.search.id_kel;
        }
      }

    });

}());
