(function(){

    app.controller('groupFController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p603b3 === null || item.p603b3.trim().length === 0)
      }

      $scope.post601    = {
        'p601a' : 'p601a',
        'p601b' : 'p601b',
        'p601c' : 'p601c',
        'p601d' : 'p601d',
        'p601e' : 'p601e',
        'p601f' : 'p601f',
        'p601g' : 'p601g',
        'p601h' : 'p601h',
      }
      $scope.post602    = {
        'p602a' : 'p602a',
        'p602b' : 'p602b',
        'p602c' : 'p602c',
        'p602d' : 'p602d',
      }
      $scope.post603    = {
        'p603a'  : 'p603a',
        'p603b1' : 'p603b1',
        'p603b2' : 'p603b2',
        'p603b3' : 'p603b3',
        'p603c'  : 'p603c',
      }

      $scope.getData = function(table, poin, filter, type, x) {
        $scope.checkPoint   = poin;
        var post = {
          'table'   : table,
          'poin'    : poin,
          'x'       : x
        }
        var onSuccess           = function(response){
          $scope[poin]          = response.data.hasil;// dapatkan hasil pemanggilan
          $scope[poin].type     = type;               // menentukan type chart
          $scope[poin].series   = [];
          $scope[poin].key      = [];
          $scope[poin].filtered = filterFilter(response.data.hasil, {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
          if (poin == 'p601') {
            changeOutput601($scope[poin].filtered, poin, type);
          }
          if (poin == 'p602') {
            setOutput602($scope[poin].filtered, poin, type);
          }
          if (poin == 'p603') {
            setOutput603a($scope[poin].filtered, poin, type, 'a');
            setOutput603b1($scope[poin].filtered, poin, type, 'b1');
            setOutput603b2($scope[poin].filtered, poin, type, 'b2');
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_f', 'p601', $scope.filter, 'column', $scope.post601);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                   //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        if (poin == 'p601') {
          var loop            = true;
          for (i = 1; i <= 10; i++) {
            if (i==10) { loop = false; }
            setOutput601($scope[poin].filtered, i, poin, loop, type)
          }
        }
        if (poin == 'p602') {
          setOutput602($scope[poin].filtered, poin, type);
        }
        if (poin == 'p603') {
          setOutput603a($scope[poin].filtered, poin, type, 'a');
          setOutput603b1($scope[poin].filtered, poin, type, 'b1');
          setOutput603b2($scope[poin].filtered, poin, type, 'b2');
        }
      }

      // 601 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput601 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput601(data, i, poin, loop, type)
        }
      }

      var setOutput601 = function(data, i, poin, loop, type){
        var temp601 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p601a == i }).length,
            data.filter(function(el) { return el.p601b == i }).length,
            data.filter(function(el) { return el.p601c == i }).length,
            data.filter(function(el) { return el.p601d == i }).length,
            data.filter(function(el) { return el.p601e == i }).length,
            data.filter(function(el) { return el.p601f == i }).length,
            data.filter(function(el) { return el.p601g == i }).length,
            data.filter(function(el) { return el.p601h == i }).length,
          ]
        };
        $scope[poin].series.push(temp601);
        $scope[poin].key = ['a','b','c','d','e','f','g','h'];
        if (!loop) {
          passingChart601($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart601 = function(ObjectKey, data, poin, type){
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
      // 601 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 602 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput602 = function(data, poin, type){
        var temp602 =[
        {
          name: 'Ya',
          data:
          [
            data.filter(function(el) { return el.p602a == 'Ya' }).length,
            data.filter(function(el) { return el.p602b == 'Ya' }).length,
            data.filter(function(el) { return el.p602c == 'Ya' }).length,
            data.filter(function(el) { return el.p602d == 'Ya' }).length,
          ]
        },
        {
          name: 'Tidak',
          data:
          [
            data.filter(function(el) { return el.p602a == 'Tidak' }).length,
            data.filter(function(el) { return el.p602b == 'Tidak' }).length,
            data.filter(function(el) { return el.p602c == 'Tidak' }).length,
            data.filter(function(el) { return el.p602d == 'Tidak' }).length,
          ]
        }];
        $scope[poin].series = temp602;
        $scope[poin].key = ['a','b','c','d'];
        passingChart602($scope[poin].key, $scope[poin].series, poin, type)
      }

      var passingChart602 = function(ObjectKey, data, poin, type){
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
      // 602 --------------------------------------------------------------------------------------------------------------------------------------------------------------



      // 603 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput603a = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var CountBy     = _.countBy(data,'p603a');
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value
            };
        });
        passingChart603(chartData, poin, type, sub);
      }
      var setOutput603b1 = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var filteredArray = _.filter(data,function(obj) {
             return obj.p603b1;
        });
        var CountBy     = _.countBy(filteredArray,'p603b1');
        var chartData   = _.map(CountBy, function(value, key){
            if (key == '') { return false }
            return {
                name: key,
                y: value
            };
        });
        passingChart603(chartData, poin, type, sub);
      }
      var setOutput603b2 = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var filteredArray = _.filter(data,function(obj) {
             return obj.p603b2;
        });
        var CountBy     = _.countBy(filteredArray,'p603b2');
        var chartData   = _.map(CountBy, function(value, key){
            if (key == '') { return false }
            return {
                name: key,
                y: value
            };
        });
        passingChart603(chartData, poin, type, sub);
      }


      var passingChart603 = function(chartData, poin, type, sub){
        if (['pie','bar','column'].indexOf(type) > -1) {
          $scope[poin][sub].chart    = {
              chart: {
                  type: type
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin '+ poin + ' ' + sub
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
      // 603 --------------------------------------------------------------------------------------------------------------------------------------------------------------


    });

}());
