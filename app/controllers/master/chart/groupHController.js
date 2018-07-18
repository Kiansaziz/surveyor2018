(function(){

    app.controller('groupHController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p802f === null || item.p802f.trim().length === 0)
      }

      $scope.post801    = {
        'p801a' : 'p801a',
        'p801b' : 'p801b',
        'p801c' : 'p801c',
        'p801d' : 'p801d',
      }
      $scope.post802    = {
        'p802a' : 'p802a',
        'p802b' : 'p802b',
        'p802c' : 'p802c',
        'p802d' : 'p802d',
        'p802e' : 'p802e',
        'p802f' : 'p802f',
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
          $scope[poin].type = type;
          $scope[poin].series   = [];
          $scope[poin].key      = [];
          $scope[poin].filtered = filterFilter(response.data.hasil, {tppu_wil: filter.tppu_wil, tppt_wil: filter.tppt_wil, tppu_profesi: filter.tppu_profesi, tppt_profesi: filter.tppt_profesi, usia: filter.usia});
          if (poin == 'p801') {
            changeOutput801($scope[poin].filtered, poin, type);
          }
          if (poin == 'p802') {
            changeOutput802($scope[poin].filtered, poin, type);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_h', 'p801', $scope.filter, 'column', $scope.post801);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu_wil: filter.tppu_wil, tppt_wil: filter.tppt_wil, tppu_profesi: filter.tppu_profesi, tppt_profesi: filter.tppt_profesi, usia: filter.usia});
        if (poin == 'p801') {
          changeOutput801($scope[poin].filtered, poin, type);
        }
        if (poin == 'p802') {
          changeOutput802($scope[poin].filtered, poin, type);
        }
      }

      var changeOutput801 = function(data, poin, type){
        var temp801 =[
        {
          name: 'Tidak Pernah',
          data:
          [
            data.filter(function(el) { return el.p801a == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p801b == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p801c == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p801d == 'Tidak Pernah' }).length,
          ]
        },
        {
          name: 'Pernah',
          data:
          [
            data.filter(function(el) { return el.p801a == 'Pernah' }).length,
            data.filter(function(el) { return el.p801b == 'Pernah' }).length,
            data.filter(function(el) { return el.p801c == 'Pernah' }).length,
            data.filter(function(el) { return el.p801d == 'Pernah' }).length,
          ]
        }];
        $scope[poin].series = temp801;
        $scope[poin].key = ['a','b','c','d'];
        passingChart($scope[poin].key, $scope[poin].series, poin, type)
      }

      var changeOutput802 = function(data, poin, type){
        var temp802 =[
        {
          name: 'Ya',
          data:
          [
            data.filter(function(el) { return el.p802a == 'Ya' }).length,
            data.filter(function(el) { return el.p802b == 'Ya' }).length,
            data.filter(function(el) { return el.p802c == 'Ya' }).length,
            data.filter(function(el) { return el.p802d == 'Ya' }).length,
            data.filter(function(el) { return el.p802e == 'Ya' }).length,
          ]
        },
        {
          name: 'Tidak',
          data:
          [
            data.filter(function(el) { return el.p802a == 'Tidak' }).length,
            data.filter(function(el) { return el.p802b == 'Tidak' }).length,
            data.filter(function(el) { return el.p802c == 'Tidak' }).length,
            data.filter(function(el) { return el.p802d == 'Tidak' }).length,
            data.filter(function(el) { return el.p802e == 'Tidak' }).length,
          ]
        }];
        $scope[poin].series = temp802;
        $scope[poin].key = ['a','b','c','d'];
        passingChart($scope[poin].key, $scope[poin].series, poin, type)
      }

      var passingChart = function(ObjectKey, data, poin, type){
        $scope[poin].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          subtitle: {
              text: 'Pertanyann Poin '+poin
          },
          xAxis: {
              categories: ObjectKey,
              title: {
                  text: null
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Jumlah Jawaban Responden'
              }
          },
          tooltip: {
              valueSuffix: ' Responden'
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -40,
              y: 80,
              floating: true,
              borderWidth: 1,
              backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
              shadow: true
          },
          credits: {
              enabled: false
          },
          series: data
        }
      }

    });

}());
