(function(){

    app.controller('groupJController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p1004e === null || item.p1004e.trim().length === 0)
      }

      $scope.post1001    = {
        'p1001' : 'name',
      }
      $scope.post1002    = {
        'p1002' : 'name',
      }
      $scope.post1003    = {
        'p1003a'  : 'name',
        'p1003b1' : 'p1003b1',
        'p1003b2' : 'p1003b2',
        'p1003b3' : 'p1003b3',
        'p1003b4' : 'p1003b4',
        'p1003b5' : 'p1003b5',
        'p1003b6' : 'p1003b6',
        'p1003b7' : 'p1003b7',
        'p1003b8' : 'p1003b8',
        'p1003b9' : 'p1003b9',
        'p1003b10' : 'p1003b10',
        'p1003b11' : 'p1003b11',
        'p1003b12' : 'p1003b12',
        'p1003b13' : 'p1003b13',
      }
      $scope.post1004    = {
        'p1004a' : 'p1004a',
        'p1004b' : 'p1004b',
        'p1004c' : 'p1004c',
        'p1004d' : 'p1004d',
        'p1004e' : 'p1004e',
      }
      $scope.post1005    = {
        'p1005a' : 'p1005a',
        'p1005b' : 'p1005b',
        'p1005c' : 'p1005c',
        'p1005d' : 'p1005d',
        'p1005e' : 'p1005e',
      }
      $scope.post1006    = {
        'p1006a'  : 'name',
        'p1006b1' : 'p1006b1',
        'p1006b2' : 'p1006b2',
        'p1006b3' : 'p1006b3',
        'p1006b4' : 'p1006b4',
        'p1006b5' : 'p1006b5',
        'p1006b6' : 'p1006b6',
        'p1006b7' : 'p1006b7',
        'p1006b8' : 'p1006b8',
        'p1006b9' : 'p1006b9',
        'p1006b10' : 'p1006b10',
        'p1006b11' : 'p1006b11',
        'p1006b12' : 'p1006b12',
      }
      $scope.post1007    = {
        'p1007' : 'name',
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
          if (poin == 'p1001' || 'p1002' || 'p1003' || 'p1006' || 'p1007') {
            setOutput($scope[poin].filtered, poin, type, 'a');
          }
          if (poin == 'p1003') {
            changeOutput1003b($scope[poin].filtered, poin, type, 'b');
          }
          if (poin == 'p1004') {
            changeOutput1004($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1005') {
            changeOutput1005($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1006') {
            changeOutput1006($scope[poin].filtered, poin, type, 'b');
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_j', 'p1001', $scope.filter, 'pie', $scope.post1001);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu_wil: filter.tppu_wil, tppt_wil: filter.tppt_wil, tppu_profesi: filter.tppu_profesi, tppt_profesi: filter.tppt_profesi, usia: filter.usia});
        if (poin == 'p1001' || 'p1002' || 'p1003' || 'p1006' || 'p1007') {
          setOutput($scope[poin].filtered, poin, type, 'a');
        }
        if (poin == 'p1003') {
          changeOutput1003b($scope[poin].filtered, poin, type, 'b');
        }
        if (poin == 'p1004') {
          changeOutput1004($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1005') {
          changeOutput1005($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1006') {
          changeOutput1006($scope[poin].filtered, poin, type, 'b');
        }
      }


      // SINGLE 1001, 1002 dan 1003 ----------------------------------------------------------------------------------------------------------------------------------------
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
                  text: 'Pertanyann Poin ' + poin
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
      // SINGLE 1001, 1002 dan 1003 ----------------------------------------------------------------------------------------------------------------------------------------

      // SINGLE 1003 -------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput1003b = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var temp1003b =[
        {
          name: 'Tidak Pernah',
          data:
          [
            data.filter(function(el) { return el.p1003b1 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b2 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b3 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b4 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b5 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b6 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b7 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b8 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b9 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b10 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b11 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b12 == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1003b13 == 'Tidak Pernah' }).length,
          ]
        },
        {
          name: 'Pernah',
          data:
          [
            data.filter(function(el) { return el.p1003b1 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b2 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b3 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b4 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b5 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b6 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b7 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b8 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b9 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b10 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b11 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b12 == 'Pernah' }).length,
            data.filter(function(el) { return el.p1003b13 == 'Pernah' }).length,
          ]
        }];
        $scope[poin].series = temp1003b;
        $scope[poin].key = ['b1','b2','b3','b4','b5','b6','b7','b8', 'b9', 'b10', 'b11', 'b12'];
        passingChart1003b($scope[poin].key, $scope[poin].series, poin, type, sub)
      }

      var passingChart1003b = function(ObjectKey, data, poin, type, sub){
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
      // SINGLE 1003 -------------------------------------------------------------------------------------------------------------------------------------------------------


      // 1004 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput1004 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput1004(data, i, poin, loop, type)
        }
      }

      var setOutput1004 = function(data, i, poin, loop, type){
        var temp1004 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p1004a == i }).length,
            data.filter(function(el) { return el.p1004b == i }).length,
            data.filter(function(el) { return el.p1004c == i }).length,
            data.filter(function(el) { return el.p1004d == i }).length,
          ]
        };
        $scope[poin].series.push(temp1004);
        $scope[poin].key = ['a','b','c','d'];
        if (!loop) {
          passingChart1004($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart1004 = function(ObjectKey, data, poin, type){
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
      // 1004 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 1005 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput1005 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput1005(data, i, poin, loop, type)
        }
      }

      var setOutput1005 = function(data, i, poin, loop, type){
        var temp1005 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p1005a == i }).length,
            data.filter(function(el) { return el.p1005b == i }).length,
            data.filter(function(el) { return el.p1005c == i }).length,
            data.filter(function(el) { return el.p1005d == i }).length,
            data.filter(function(el) { return el.p1005e == i }).length,
          ]
        };
        $scope[poin].series.push(temp1005);
        $scope[poin].key = ['a','b','c','d','e'];
        if (!loop) {
          passingChart1005($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart1005 = function(ObjectKey, data, poin, type){
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
      // 1005 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 1006 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput1006 = function(data, poin, type, sub){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput1006(data, i, poin, loop, type, sub)
        }
      }

      var setOutput1006 = function(data, i, poin, loop, type, sub){
        $scope[poin][sub] = {};
        var temp1006 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p1006b1 == i }).length,
            data.filter(function(el) { return el.p1006b2 == i }).length,
            data.filter(function(el) { return el.p1006b3 == i }).length,
            data.filter(function(el) { return el.p1006b4 == i }).length,
            data.filter(function(el) { return el.p1006b5 == i }).length,
            data.filter(function(el) { return el.p1006b6 == i }).length,
            data.filter(function(el) { return el.p1006b7 == i }).length,
            data.filter(function(el) { return el.p1006b8 == i }).length,
            data.filter(function(el) { return el.p1006b9 == i }).length,
            data.filter(function(el) { return el.p1006b10 == i }).length,
            data.filter(function(el) { return el.p1006b11 == i }).length,
            data.filter(function(el) { return el.p1006b12 == i }).length,
          ]
        };
        $scope[poin].series.push(temp1006);
        $scope[poin].key = ['b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12'];
        if (!loop) {
          passingChart1006($scope[poin].key, $scope[poin].series, poin, sub)
        }
      }

      var passingChart1006 = function(ObjectKey, data, poin, sub){
        $scope[poin][sub].chart = {
          chart: {
              type: 'column',
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
      // 1006 --------------------------------------------------------------------------------------------------------------------------------------------------------------


    });

}());
