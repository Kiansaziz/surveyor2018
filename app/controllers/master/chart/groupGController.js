(function(){

    app.controller('groupGController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p704e === null || item.p704e.trim().length === 0)
      }

      $scope.post701    = {
        'p701' : 'name',
      }
      $scope.post702    = {
        'p702' : 'name',
      }
      $scope.post703    = {
        'p703a1' : 'p703a1',
        'p703a2' : 'p703a2',
        'p703a3' : 'p703a3',
        'p703b' : 'p703b',
        'p703c' : 'p703c',
        'p703d' : 'p703d',
        'p703e' : 'p703e',
        'p703f' : 'p703f',
        'p703g' : 'p703g',
        'p703h' : 'p703h',
        'p703i' : 'p703i',
        'p703j' : 'p703j',
        'p703k' : 'p703k',
        'p703l' : 'p703l',
        'p703m' : 'p703m',
      }
      $scope.post704    = {
        'p704a' : 'p704a',
        'p704b' : 'p704b',
        'p704c' : 'p704c',
        'p704d' : 'p704d',
        'p704e' : 'p704e',
      }
      $scope.post705    = {
        'p705a' : 'p705a',
        'p705b' : 'p705b',
        'p705c' : 'p705c',
        'p705d' : 'p705d',
        'p705e' : 'p705e',
      }
      $scope.post706    = {
        'p706a' : 'p706a',
        'p706b' : 'p706b',
        'p706c' : 'p706c',
        'p706d' : 'p706d',
        'p706e' : 'p706e',
        'p706f' : 'p706f',
        'p706g' : 'p706g',
        'p706h' : 'p706h',
        'p706i' : 'p706i',
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
          if (poin == 'p701' || 'p702') {
            setOutput($scope[poin].filtered, poin, type);
          }
          if (poin == 'p703') {
            changeOutput703($scope[poin].filtered, poin, type);
          }
          if (poin == 'p704') {
            changeOutput704($scope[poin].filtered, poin, type);
          }
          if (poin == 'p705') {
            changeOutput705($scope[poin].filtered, poin, type);
          }
          if (poin == 'p706') {
            changeOutput706($scope[poin].filtered, poin, type);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_g', 'p701', $scope.filter, 'column', $scope.post701);



      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu_wil: filter.tppu_wil, tppt_wil: filter.tppt_wil, tppu_profesi: filter.tppu_profesi, tppt_profesi: filter.tppt_profesi, usia: filter.usia});
        if (poin == 'p701' || 'p702') {
          setOutput($scope[poin].filtered, poin, type);
        }
        if (poin == 'p703') {
          changeOutput703($scope[poin].filtered, poin, type);
        }
        if (poin == 'p704') {
          changeOutput704($scope[poin].filtered, poin, type);
        }
        if (poin == 'p705') {
          changeOutput705($scope[poin].filtered, poin, type);
        }
        if (poin == 'p706') {
          changeOutput706($scope[poin].filtered, poin, type);
        }
      }


      // 701 702 ------------------------------------------------------------------------------------------------------------------------------------------------------
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
      // 701 702 ------------------------------------------------------------------------------------------------------------------------------------------------------


      // 703 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput703 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput703(data, i, poin, loop, type)
        }
      }

      var setOutput703 = function(data, i, poin, loop, type){
        var temp703 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p703a1 == i }).length,
            data.filter(function(el) { return el.p703a2 == i }).length,
            data.filter(function(el) { return el.p703a3 == i }).length,
            data.filter(function(el) { return el.p703b == i }).length,
            data.filter(function(el) { return el.p703c == i }).length,
            data.filter(function(el) { return el.p703d == i }).length,
            data.filter(function(el) { return el.p703e == i }).length,
            data.filter(function(el) { return el.p703f == i }).length,
            data.filter(function(el) { return el.p703g == i }).length,
            data.filter(function(el) { return el.p703h == i }).length,
            data.filter(function(el) { return el.p703i == i }).length,
            data.filter(function(el) { return el.p703j == i }).length,
            data.filter(function(el) { return el.p703k == i }).length,
            data.filter(function(el) { return el.p703l == i }).length,
            data.filter(function(el) { return el.p703m == i }).length,
          ]
        };
        $scope[poin].series.push(temp703);
        $scope[poin].key = ['a1','a2','a3','b','c','d','e','f','g','h','i','j','k','l','m'];
        if (!loop) {
          passingChart703($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart703 = function(ObjectKey, data, poin, type){
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
      // 703 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 704 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput704 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput704(data, i, poin, loop, type)
        }
      }

      var setOutput704 = function(data, i, poin, loop, type){
        var temp704 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p704a == i }).length,
            data.filter(function(el) { return el.p704b == i }).length,
            data.filter(function(el) { return el.p704c == i }).length,
            data.filter(function(el) { return el.p704d == i }).length,
          ]
        };
        $scope[poin].series.push(temp704);
        $scope[poin].key = ['a','b','c','d'];
        if (!loop) {
          passingChart704($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart704 = function(ObjectKey, data, poin, type){
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
      // 704 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 705 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput705 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput705(data, i, poin, loop, type)
        }
      }

      var setOutput705 = function(data, i, poin, loop, type){
        var temp705 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p705a == i }).length,
            data.filter(function(el) { return el.p705b == i }).length,
            data.filter(function(el) { return el.p705c == i }).length,
            data.filter(function(el) { return el.p705d == i }).length,
            data.filter(function(el) { return el.p705e == i }).length,
          ]
        };
        $scope[poin].series.push(temp705);
        $scope[poin].key = ['a','b','c','d','e'];
        if (!loop) {
          passingChart705($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart705 = function(ObjectKey, data, poin, type){
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
      // 705 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 706 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput706 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput706(data, i, poin, loop, type)
        }
      }

      var setOutput706 = function(data, i, poin, loop, type){
        var temp706 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p706a == i }).length,
            data.filter(function(el) { return el.p706b == i }).length,
            data.filter(function(el) { return el.p706c == i }).length,
            data.filter(function(el) { return el.p706d == i }).length,
            data.filter(function(el) { return el.p706e == i }).length,
            data.filter(function(el) { return el.p706f == i }).length,
            data.filter(function(el) { return el.p706g == i }).length,
            data.filter(function(el) { return el.p706h == i }).length,
            data.filter(function(el) { return el.p706i == i }).length,
          ]
        };
        $scope[poin].series.push(temp706);
        $scope[poin].key = ['a','b','c','d','e','f','g','h','i'];
        if (!loop) {
          passingChart706($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart706 = function(ObjectKey, data, poin, type){
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
      // 706 --------------------------------------------------------------------------------------------------------------------------------------------------------------

    });

}());
