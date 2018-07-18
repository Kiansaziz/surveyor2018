(function(){

    app.controller('groupNController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};

      $scope.postPencegahan     = {
        'pencegahan' : 'name',
      }
      $scope.postPemberantasan = {
        'pemberantasan' : 'name',
      }
      $scope.postTgl = {
        'tgl_wawancara' : 'name',
      }

      $scope.getData = function(table, poin, filter, type, x) {
        $scope.checkPoint   = poin;
        var post = {
          'table'   : table,
          'poin'    : poin,
          'x'       : x
        }
        var onSuccess       = function(response){
          $scope[poin]      = response.data.hasil;
          $scope[poin].filtered = filterFilter(response.data.hasil, {tppu_wil: filter.tppu_wil, tppt_wil: filter.tppt_wil, tppu_profesi: filter.tppu_profesi, tppt_profesi: filter.tppt_profesi, usia: filter.usia});
          if (poin == 'ptanggal') {
            setOutput($scope[poin].filtered, poin);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_n', 'ppencegahan', $scope.filter, 'column', $scope.postPencegahan);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].filtered = filterFilter($scope[poin], {tppu_wil: filter.tppu_wil, tppt_wil: filter.tppt_wil, tppu_profesi: filter.tppu_profesi, tppt_profesi: filter.tppt_profesi, usia: filter.usia});
        if (poin == 'ptanggal') {
          setOutput($scope[poin].filtered, poin);
        }
      }


      var setOutput = function(data, poin){
        var ObjectKey   = [];
        var ObjectKeyTmp= Object.keys(_.groupBy(_.sortBy(data, 'name'), 'name'));
        var chartData   = Object.values(_.countBy(_.sortBy(data, 'name'), 'name'));
        for (var i = 0; i < ObjectKeyTmp.length; i++) {
          ObjectKey.push(ObjectKeyTmp[i].slice(8));
        }
        passingChart(ObjectKey, chartData , poin)
      }

      var passingChart = function(ObjectKey, chartData, poin){
          $scope[poin].chart    = {
            chart: {
                width: 1200
            },
            title: {
                text: 'Survey Persepsi Publik'
            },
            subtitle: {
                text: 'Pertanyann Poin '+poin
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Jumlah Responden Per Tanggal'
                }
            },
            xAxis: {
                categories: ObjectKey
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'Responden',
                data: chartData
            }]
          };
      }

    });

}());
