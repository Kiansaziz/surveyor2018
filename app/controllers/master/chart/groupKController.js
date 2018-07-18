(function(){

    app.controller('groupKController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p1101c === null || item.p1101c.trim().length === 0)
      }

      $scope.post1101    = {
        'p1101a' : 'p1101a',
        'p1101b' : 'p1101b',
        'p1101c' : 'p1101c',
      }
      $scope.post1102    = {
        'p1102a'  : 'p1102a',
        'p1102b'  : 'p1102b',
        'p1102c'  : 'p1102c',
        'p1102d'  : 'p1102d',
        'p1102e'  : 'p1102e',
        'p1102f'  : 'p1102f',
      }
      $scope.post1103    = {
        'p1103' : 'name',
      }
      $scope.post1104    = {
        'p1104' : 'name',
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
          if (poin == 'p1101') {
            setOutput1101($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1102') {
            changeOutput1102($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1104') {
            setOutput($scope[poin].filtered, poin, type);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_k', 'p1101', $scope.filter, 'bar', $scope.post1101);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        if (poin == 'p1101') {
          setOutput1101($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1102') {
          changeOutput1102($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1104') {
          setOutput($scope[poin].filtered, poin, type);
        }
      }


      // 1101 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput1101 = function(data, poin, type){
        var temp1101 =[
        {
          name: 'Ya',
          data:
          [
            data.filter(function(el) { return el.p1101a == 'Ya' }).length,
            data.filter(function(el) { return el.p1101b == 'Ya' }).length,
          ]
        },
        {
          name: 'Tidak',
          data:
          [
            data.filter(function(el) { return el.p1101a == 'Tidak' }).length,
            data.filter(function(el) { return el.p1101b == 'Tidak' }).length,
          ]
        }];
        $scope[poin].series = temp1101;
        $scope[poin].key = ['a','b',];
        passingChart1101($scope[poin].key, $scope[poin].series, poin, type)
      }

      var passingChart1101 = function(ObjectKey, data, poin, type){
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
      // 1101 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 1102 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput1102 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput1102(data, i, poin, loop, type)
        }
      }

      var setOutput1102 = function(data, i, poin, loop, type){
        var temp1102 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p1102a == i }).length,
            data.filter(function(el) { return el.p1102b == i }).length,
            data.filter(function(el) { return el.p1102c == i }).length,
            data.filter(function(el) { return el.p1102d == i }).length,
            data.filter(function(el) { return el.p1102e == i }).length,
            data.filter(function(el) { return el.p1102f == i }).length,
          ]
        };
        $scope[poin].series.push(temp1102);
        $scope[poin].key = ['a','b','c','d','e','f'];
        if (!loop) {
          passingChart1102($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart1102 = function(ObjectKey, data, poin, type){
        $scope[poin].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          xAxis: {
              categories: ObjectKey
          },
          subtitle: {
              text: 'Pertanyann Poin '+poin
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Jumlah Jawaban Responden'
              }
          },
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
              shared: true
          },
          plotOptions: {
              column: {
                  stacking: 'percent'
              }
          },
          series: data
        }
      }
      // 1103 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



      // 1104 ------------------------------------------------------------------------------------------------------------------------------------------------------
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
        passingChart(ObjectKey, chartData, poin, type)
      }

      var passingChart = function(ObjectKey, chartData, poin, type){
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
      // 1104 ------------------------------------------------------------------------------------------------------------------------------------------------------



    });

}());
