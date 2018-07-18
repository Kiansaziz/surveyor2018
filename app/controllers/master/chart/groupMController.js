(function(){

    app.controller('groupMController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};

      $scope.post1301    = {
        'p1301a' : 'p1301a',
        'p1301b' : 'p1301b',
        'p1301c' : 'p1301c',
        'p1301d' : 'p1301d',
        'p1301e' : 'p1301e',
        'p1301f' : 'p1301f',
        'p1301g' : 'p1301g',
        'p1301h' : 'p1301h',
        'p1301i' : 'p1301i',
      }
      $scope.post1302    = {
        'p1302' : 'name',
      }
      $scope.post1303    = {
        'p1303a' : 'p1303a',
        'p1303b' : 'p1303b',
        'p1303c' : 'p1303c',
        'p1303d' : 'p1303d',
        'p1303e' : 'p1303e',
        'p1303f' : 'p1303f',
        'p1303g' : 'p1303g',
        'p1303h' : 'p1303h',
      }
      $scope.post1304    = {
        'p1304' : 'name',
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
          $scope[poin].filtered = filterFilter(response.data.hasil, {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
          if (poin == 'p1302' || 'p1304') {
            setOutput($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1301') {
            changeOutput1301($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1303') {
            changeOutput1303($scope[poin].filtered, poin, type);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_m', 'p1301', $scope.filter, 'column', $scope.post1301);



      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        if (poin == 'p1302' || 'p1304') {
          setOutput($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1301') {
          changeOutput1301($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1303') {
          changeOutput1303($scope[poin].filtered, poin, type);
        }
      }



      // 1301 1303 ------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput1301 = function(data, poin, type){
        var temp1301 =[
        {
          name: 'Tidak Pernah',
          data:
          [
            data.filter(function(el) { return el.p1301a == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1301b == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1301c == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1301d == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1301e == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1301f == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1301g == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1301h == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1301i == 'Tidak Pernah' }).length,
          ]
        },
        {
          name: 'Pernah',
          data:
          [
            data.filter(function(el) { return el.p1301a == 'Pernah' }).length,
            data.filter(function(el) { return el.p1301b == 'Pernah' }).length,
            data.filter(function(el) { return el.p1301c == 'Pernah' }).length,
            data.filter(function(el) { return el.p1301d == 'Pernah' }).length,
            data.filter(function(el) { return el.p1301e == 'Pernah' }).length,
            data.filter(function(el) { return el.p1301f == 'Pernah' }).length,
            data.filter(function(el) { return el.p1301g == 'Pernah' }).length,
            data.filter(function(el) { return el.p1301h == 'Pernah' }).length,
            data.filter(function(el) { return el.p1301i == 'Pernah' }).length,
          ]
        }];
        $scope[poin].series = temp1301;
        $scope[poin].key = ['a','b','c','d','e','f','g','h','i'];
        passingChart($scope[poin].key, $scope[poin].series, poin, type);
      }

      var changeOutput1303 = function(data, poin, type){
        var temp1303 =[
        {
          name: 'Sering (>1kali/bulan)',
          data:
          [
            data.filter(function(el) { return el.p1303a == 'Sering (>1kali/bulan)' }).length,
            data.filter(function(el) { return el.p1303b == 'Sering (>1kali/bulan)' }).length,
            data.filter(function(el) { return el.p1303c == 'Sering (>1kali/bulan)' }).length,
            data.filter(function(el) { return el.p1303d == 'Sering (>1kali/bulan)' }).length,
            data.filter(function(el) { return el.p1303e == 'Sering (>1kali/bulan)' }).length,
            data.filter(function(el) { return el.p1303f == 'Sering (>1kali/bulan)' }).length,
            data.filter(function(el) { return el.p1303g == 'Sering (>1kali/bulan)' }).length,
            data.filter(function(el) { return el.p1303h == 'Sering (>1kali/bulan)' }).length,
          ]
        },
        {
          name: 'Jarang',
          data:
          [
            data.filter(function(el) { return el.p1303a == 'Jarang' }).length,
            data.filter(function(el) { return el.p1303b == 'Jarang' }).length,
            data.filter(function(el) { return el.p1303c == 'Jarang' }).length,
            data.filter(function(el) { return el.p1303d == 'Jarang' }).length,
            data.filter(function(el) { return el.p1303e == 'Jarang' }).length,
            data.filter(function(el) { return el.p1303f == 'Jarang' }).length,
            data.filter(function(el) { return el.p1303g == 'Jarang' }).length,
            data.filter(function(el) { return el.p1303h == 'Jarang' }).length,
          ]
        }];
        $scope[poin].series = temp1303;
        $scope[poin].key = ['a','b','c','d','e','f','g','h'];
        passingChart($scope[poin].key, $scope[poin].series, poin, type);
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
      // 1301 1303 ------------------------------------------------------------------------------------------------------------------------------------------------------


      // 1302 1304 ------------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput = function(data, poin, type){
        var GroupBy     = _.groupBy(data, 'name');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(data,'name');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChartS(ObjectKey, chartData, poin, type)
      }

      var passingChartS = function(ObjectKey, chartData, poin, type){
        // PIE, BAR Dan Column SINGLE
        if (['pie','bar','column'].indexOf(type) > -1) {
          // $scope[poin].axis     = ObjectKey; // untuk bar (GANTI / GAUSAH DULU)
          $scope[poin].chart    = {
              chart: {
                  type: type
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin '+poin
              },
              xAxis: {
                  type: 'category'
              },
              yAxis: {
                  title: {
                      text: 'Jawaban Responden'
                  }
              },
              credits: {
                  enabled: false
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                          style: {
                              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                          }
                      }
                  }
              },
              series: [{
                  name:'Jumlah',
                  colorByPoint: true,
                  data: chartData
              }]
          };
        }
      }
      // 1302 1304 ------------------------------------------------------------------------------------------------------------------------------------------------------

    });

}());
