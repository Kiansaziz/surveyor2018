(function(){

    app.controller('kuesionerController', function($scope){

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
