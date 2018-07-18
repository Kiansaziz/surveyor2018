(function(){

    app.controller('groupEController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p502b6 === null || item.p502b6.trim().length === 0)
      }

      $scope.post501    = {
        'p501a'  : 'name',
        'p501b1' : 'p501b1',
        'p501b2' : 'p501b2',
        'p501b3' : 'p501b3',
        'p501b4' : 'p501b4',
        'p501b5' : 'p501b5',
        'p501b6' : 'p501b6',
        'p501b7' : 'p501b7',
        'p501b8' : 'p501b8',
      }
      $scope.post502    = {
        'p502a'  : 'name',
        'p502b1' : 'p502b1',
        'p502b2' : 'p502b2',
        'p502b3' : 'p502b3',
        'p502b4' : 'p502b4',
        'p502b5' : 'p502b5',
        'p502b6' : 'p502b6',
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
          setOutput($scope[poin].filtered, poin, type, 'a');
          if (poin == 'p501') {
            changeOutput501b($scope[poin].filtered, poin, type, 'b');
          }
          if (poin == 'p502') {
            changeOutput502b($scope[poin].filtered, poin, type, 'b');
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_e', 'p501', $scope.filter, 'pie', $scope.post501);

      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        setOutput($scope[poin].filtered, poin, type, 'a');
        if (poin == 'p501') {
          changeOutput501b($scope[poin].filtered, poin, type, 'b');
        }
        if (poin == 'p502') {
          changeOutput502b($scope[poin].filtered, poin, type, 'b');
        }
      }

      // SINGLE 501 A dan 502 A ------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var GroupBy     = _.groupBy(data, 'name');
        var ObjectKey   = Object.keys(GroupBy);                 // untuk xAxis categories
        var CountBy     = _.countBy(data,'name');
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }

      var passingChart = function(ObjectKey, chartData, poin, type, sub){
        // PIE, BAR Dan Column SINGLE
        if (['pie','bar','column'].indexOf(type) > -1) {
          // $scope[poin].axis     = ObjectKey; // untuk bar (GANTI / GAUSAH DULU)
          $scope[poin][sub].chart    = {
              chart: {
                  type: type
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin ' + poin + ' A'
              },
              xAxis: {
                  type: 'category'
              },
              // xAxis: {
              //     categories: $scope[poin].axis // (GANTI / GAUSAH DULU)
              // },
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
                  name:'Jawaban',
                  colorByPoint: true,
                  data: chartData
              }]
          };
        }
      } // passing
      // SINGLE 501 A dan 502 A ------------------------------------------------------------------------------------------------------------------------------------------

      // MULTIPLE 501 B dan 502 B ----------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput501b = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var temp501b =[
        {
          name: 'Tidak Pernah',
          data:
          [
            data.filter(function(el) { return el.p501b1 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p501b2 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p501b3 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p501b4 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p501b5 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p501b6 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p501b7 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p501b8 == 'Tidak Pernah' }).length,
          ]
        },
        {
          name: 'Pernah',
          data:
          [
            data.filter(function(el) { return el.p501b1 == 'Pernah' }).length,
            data.filter(function(el) { return el.p501b2 == 'Pernah' }).length,
            data.filter(function(el) { return el.p501b3 == 'Pernah' }).length,
            data.filter(function(el) { return el.p501b4 == 'Pernah' }).length,
            data.filter(function(el) { return el.p501b5 == 'Pernah' }).length,
            data.filter(function(el) { return el.p501b6 == 'Pernah' }).length,
            data.filter(function(el) { return el.p501b7 == 'Pernah' }).length,
            data.filter(function(el) { return el.p501b8 == 'Pernah' }).length,
          ]
        }];
        $scope[poin].series = temp501b;
        $scope[poin].key = ['b1','b2','b3','b4','b5','b6','b7','b8'];
        passingChartB($scope[poin].key, $scope[poin].series, poin, type, sub)
      }

      var changeOutput502b = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var temp502b =[
        {
          name: 'Ya',
          data:
          [
            data.filter(function(el) { return el.p502b1 == 'Ya' }).length,
            data.filter(function(el) { return el.p502b2 == 'Ya' }).length,
            data.filter(function(el) { return el.p502b3 == 'Ya' }).length,
            data.filter(function(el) { return el.p502b4 == 'Ya' }).length,
            data.filter(function(el) { return el.p502b5 == 'Ya' }).length,
          ]
        },
        {
          name: 'Tidak',
          data:
          [
            data.filter(function(el) { return el.p502b1 == 'Tidak' }).length,
            data.filter(function(el) { return el.p502b2 == 'Tidak' }).length,
            data.filter(function(el) { return el.p502b3 == 'Tidak' }).length,
            data.filter(function(el) { return el.p502b4 == 'Tidak' }).length,
            data.filter(function(el) { return el.p502b5 == 'Tidak' }).length,
          ]
        }];
        $scope[poin].series = temp502b;
        $scope[poin].key = ['b1','b2','b3','b4','b5'];
        passingChartB($scope[poin].key, $scope[poin].series, poin, type, sub)
      }

      var passingChartB = function(ObjectKey, data, poin, type, sub){
        $scope[poin][sub].chart = {
          chart: {
              type: 'column',
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
      // MULTIPLE 501 B dan 502 B ----------------------------------------------------------------------------------------------------------------------------------------

    });

}());
