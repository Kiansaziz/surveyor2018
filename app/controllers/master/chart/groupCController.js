(function(){

    app.controller('groupCController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p303b3 === null || item.p303b3.trim().length === 0)
      }

      $scope.post301    = {
        'p301a' : 'p301a',
        'p301b' : 'p301b',
        'p301c' : 'p301c',
        'p301d' : 'p301d',
        'p301e' : 'p301e',
        'p301f' : 'p301f',
        'p301g' : 'p301g',
        'p301h' : 'p301h',
        'p301i' : 'p301i',
        'p301j' : 'p301j',
        'p301k' : 'p301k',
        'p301l' : 'p301l',
        'p301m' : 'p301m',
        'p301n' : 'p301n',
        'p301o' : 'p301o',
      }
      $scope.post302    = {
        'p302a' : 'p302a',
        'p302b' : 'p302b',
        'p302c' : 'p302c',
      }
      $scope.post303    = {
        'p303a'  : 'p303a',
        'p303b1' : 'p303b1',
        'p303b2' : 'p303b2',
        'p303b3' : 'p303b3',
        'p303c'  : 'p303c',
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
          if (poin == 'p301') {
            changeOutput301($scope[poin].filtered, poin, type);
          }
          if (poin == 'p302') {
            setOutput302($scope[poin].filtered, poin, type);
          }
          if (poin == 'p303') {
            setOutput303a($scope[poin].filtered, poin, type, 'a');
            setOutput303b1($scope[poin].filtered, poin, type, 'b1');
            setOutput303b2($scope[poin].filtered, poin, type, 'b2');
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_c', 'p301', $scope.filter, 'column', $scope.post301);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        if (poin == 'p301') {
          var loop            = true;
          for (i = 1; i <= 10; i++) {
            if (i==10) { loop = false; }
            setOutput301($scope[poin].filtered, i, poin, loop, type)
          }
        }
        if (poin == 'p302') {
          setOutput302($scope[poin].filtered, poin, type);
        }
        if (poin == 'p303') {
          setOutput303a($scope[poin].filtered, poin, type, 'a');
          setOutput303b1($scope[poin].filtered, poin, type, 'b1');
          setOutput303b2($scope[poin].filtered, poin, type, 'b2');
        }
      }



      // 301 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput301 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput301(data, i, poin, loop, type)
        }
      }

      var setOutput301 = function(data, i, poin, loop, type){
        var temp301 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p301a == i }).length,
            data.filter(function(el) { return el.p301b == i }).length,
            data.filter(function(el) { return el.p301c == i }).length,
            data.filter(function(el) { return el.p301d == i }).length,
            data.filter(function(el) { return el.p301e == i }).length,
            data.filter(function(el) { return el.p301f == i }).length,
            data.filter(function(el) { return el.p301g == i }).length,
            data.filter(function(el) { return el.p301h == i }).length,
            data.filter(function(el) { return el.p301i == i }).length,
            data.filter(function(el) { return el.p301j == i }).length,
            data.filter(function(el) { return el.p301k == i }).length,
            data.filter(function(el) { return el.p301l == i }).length,
            data.filter(function(el) { return el.p301m == i }).length,
            data.filter(function(el) { return el.p301n == i }).length,
            data.filter(function(el) { return el.p301o == i }).length,
          ]
        };
        $scope[poin].series.push(temp301);
        $scope[poin].key = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o'];
        if (!loop) {
          passingChart301($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart301 = function(ObjectKey, data, poin, type){
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
      // 301 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 302 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput302 = function(data, poin, type){
        var temp302 =[
        {
          name: 'Ya',
          data:
          [
            data.filter(function(el) { return el.p302a == 'Ya' }).length,
            data.filter(function(el) { return el.p302b == 'Ya' }).length,
            data.filter(function(el) { return el.p302c == 'Ya' }).length,
          ]
        },
        {
          name: 'Tidak',
          data:
          [
            data.filter(function(el) { return el.p302a == 'Tidak' }).length,
            data.filter(function(el) { return el.p302b == 'Tidak' }).length,
            data.filter(function(el) { return el.p302c == 'Tidak' }).length,
          ]
        }];
        $scope[poin].series = temp302;
        $scope[poin].key = ['a','b','c'];
        passingChart302($scope[poin].key, $scope[poin].series, poin, type)
      }

      var passingChart302 = function(ObjectKey, data, poin, type){
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
      // 302 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 303 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput303a = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var CountBy     = _.countBy(data,'p303a');
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value
            };
        });
        passingChart303(chartData, poin, type, sub);
      }
      var setOutput303b1 = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var filteredArray = _.filter(data,function(obj) { // menyaring data yang isinya kosong
             return obj.p303b1;
        });
        var CountBy     = _.countBy(filteredArray,'p303b1');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart303(chartData, poin, type, sub);
      }
      var setOutput303b2 = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var filteredArray = _.filter(data,function(obj) {
             return obj.p303b2;
        });
        var CountBy     = _.countBy(filteredArray,'p303b2');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart303(chartData, poin, type, sub);
      }

      var passingChart303 = function(chartData, poin, type, sub){
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
      // 303 --------------------------------------------------------------------------------------------------------------------------------------------------------------


    });

}());
