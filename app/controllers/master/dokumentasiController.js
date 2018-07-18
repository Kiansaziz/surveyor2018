(function(){

    app.controller('dokumentasiController', function($scope, $rootScope, $http, toastr, $window, $q){

      var dataBackup = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.backups = response.data;
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/backup.php?type=dataBackup")
        .then(onSuccess, onError);
      }
      dataBackup();


      $scope.eksportTable = function(table){
        var deferred = $q.defer();
        var data = {
          table : table
        }
        var onSuccess = function(response){
          deferred.resolve(response.data);
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/backup.php?type=backupTable", data).then(onSuccess, onError);
        return deferred.promise;
      }


      $scope.backUp = function(){
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            dataBackup();
            toastr.success(response.data.keterangan);
            $window.open("../api/backup/"+response.data.file,"_blank");
          }
        }
        var onError = function(reason){
          toastr.warning('Terjadi Kesalahan');
        }
        $http.post("../api/master/backup.php?type=backup")
        .then(onSuccess, onError);
      }

      $scope.downloadBackup = function(detail){
        $window.open("../api/backup/"+detail.file,"_blank");
      }

      $scope.deleteBackup = function(detail){
        tanya=confirm("Apakah anda yakin akan menghapus "+ detail.file +" ?")
        if (tanya !="0")
        {
          var idx = $scope.backups.indexOf(detail);
          var onSuccess = function(response){
            if (data.status == 'success') {
              toastr.success(data.keterangan);
              $scope.backups.splice(idx,1);
            } else if (data.status != 'success') {
              toastr.warning(data.keterangan);
            } else {
              toastr.error('Terjadi Kesalahan');
            }
          }
          var onError = function(reason){
            toastr.warning('Terjadi Kesalahan');
          }
          $http.post('../api/master/backup.php?type=deleteBackup', detail).then(onSuccess, onError);
        }
      }

    });

}());
