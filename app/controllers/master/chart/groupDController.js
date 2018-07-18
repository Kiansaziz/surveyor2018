(function(){

    app.controller('groupDController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p404e === null || item.p404e.trim().length === 0)
      }

      $scope.post401    = {
        'p401' : 'name',
      }
      $scope.post402    = {
        'p402' : 'name',
      }
      $scope.post403    = {
        'p403a1' : 'p403a1',
        'p403a2' : 'p403a2',
        'p403a3' : 'p403a3',
        'p403b' : 'p403b',
        'p403c' : 'p403c',
        'p403d' : 'p403d',
        'p403e' : 'p403e',
        'p403f' : 'p403f',
        'p403g' : 'p403g',
        'p403h' : 'p403h',
        'p403i' : 'p403i',
        'p403j' : 'p403j',
        'p403k' : 'p403k',
        'p403l' : 'p403l',
        'p403m' : 'p403m',
      }
      $scope.post404    = {
        'p404a' : 'p404a',
        'p404b' : 'p404b',
        'p404c' : 'p404c',
        'p404d' : 'p404d',
        'p404e' : 'p404e',
      }
      $scope.post405    = {
        'p405a' : 'p405a',
        'p405b' : 'p405b',
        'p405c' : 'p405c',
        'p405d' : 'p405d',
        'p405e' : 'p405e',
        'p405f' : 'p405f',
        'p405g' : 'p405g',
        'p405h' : 'p405h',
        'p405i' : 'p405i',
        'p405j' : 'p405j',
        'p405k' : 'p405k',
        'p405l' : 'p405l',
        'p405m' : 'p405m',
        'p405n' : 'p405n',
        'p405o' : 'p405o',
        'p405p' : 'p405p',
        'p405q' : 'p405q',
        'p405r' : 'p405r',
        'p405s' : 'p405s',
        'p405t' : 'p405t',
        'p405u' : 'p405u',
        'p405v' : 'p405v',
        'p405w' : 'p405w',
        'p405x' : 'p405x',
        'p405y' : 'p405y',
      }
      $scope.post406    = {
        'p406a' : 'p406a',
        'p406b' : 'p406b',
        'p406c' : 'p406c',
        'p406d' : 'p406d',
        'p406e' : 'p406e',
        'p406f' : 'p406f',
        'p406g' : 'p406g',
        'p406h' : 'p406h',
        'p406i' : 'p406i',
        'p406j' : 'p406j',
        'p406k' : 'p406k',
        'p406l' : 'p406l',
        'p406m' : 'p406m',
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
          if (poin == 'p401' || 'p402') {
            setOutput($scope[poin].filtered, poin, type);
          }
          if (poin == 'p403') {
            changeOutput403($scope[poin].filtered, poin, type);
          }
          if (poin == 'p404') {
            changeOutput404($scope[poin].filtered, poin, type);
          }
          if (poin == 'p405') {
            changeOutput405($scope[poin].filtered, poin, type);
          }
          if (poin == 'p406') {
            changeOutput406($scope[poin].filtered, poin, type);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_d', 'p401', $scope.filter, 'column', $scope.post401);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu_wil: filter.tppu_wil, tppt_wil: filter.tppt_wil, tppu_profesi: filter.tppu_profesi, tppt_profesi: filter.tppt_profesi, usia: filter.usia});
        if (poin == 'p401' || 'p402') {
          setOutput($scope[poin].filtered, poin, type);
        }
        if (poin == 'p403') {
          changeOutput403($scope[poin].filtered, poin, type);
        }
        if (poin == 'p404') {
          changeOutput404($scope[poin].filtered, poin, type);
        }
        if (poin == 'p405') {
          changeOutput405($scope[poin].filtered, poin, type);
        }
        if (poin == 'p406') {
          changeOutput406($scope[poin].filtered, poin, type);
        }
      }


      // 401 402 ------------------------------------------------------------------------------------------------------------------------------------------------------
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
      // 401 402 ------------------------------------------------------------------------------------------------------------------------------------------------------



      // 403 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput403 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput403(data, i, poin, loop, type)
        }
      }

      var setOutput403 = function(data, i, poin, loop, type){
        var temp403 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p403a1 == i }).length,
            data.filter(function(el) { return el.p403a2 == i }).length,
            data.filter(function(el) { return el.p403a3 == i }).length,
            data.filter(function(el) { return el.p403b == i }).length,
            data.filter(function(el) { return el.p403c == i }).length,
            data.filter(function(el) { return el.p403d == i }).length,
            data.filter(function(el) { return el.p403e == i }).length,
            data.filter(function(el) { return el.p403f == i }).length,
            data.filter(function(el) { return el.p403g == i }).length,
            data.filter(function(el) { return el.p403h == i }).length,
            data.filter(function(el) { return el.p403i == i }).length,
            data.filter(function(el) { return el.p403j == i }).length,
            data.filter(function(el) { return el.p403k == i }).length,
            data.filter(function(el) { return el.p403l == i }).length,
            data.filter(function(el) { return el.p403m == i }).length,
          ]
        };
        $scope[poin].series.push(temp403);
        $scope[poin].key = ['a1','a2','a3','b','c','d','e','f','g','h','i','j','k','l','m'];
        if (!loop) {
          passingChart403($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart403 = function(ObjectKey, data, poin, type){
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
      // 403 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 404 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput404 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput404(data, i, poin, loop, type)
        }
      }

      var setOutput404 = function(data, i, poin, loop, type){
        var temp404 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p404a == i }).length,
            data.filter(function(el) { return el.p404b == i }).length,
            data.filter(function(el) { return el.p404c == i }).length,
            data.filter(function(el) { return el.p404d == i }).length,
          ]
        };
        $scope[poin].series.push(temp404);
        $scope[poin].key = ['a','b','c','d'];
        if (!loop) {
          passingChart404($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart404 = function(ObjectKey, data, poin, type){
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
      // 404 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 405 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput405 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput405(data, i, poin, loop, type)
        }
      }

      var setOutput405 = function(data, i, poin, loop, type){
        var temp405 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p405a == i }).length,
            data.filter(function(el) { return el.p405b == i }).length,
            data.filter(function(el) { return el.p405c == i }).length,
            data.filter(function(el) { return el.p405d == i }).length,
            data.filter(function(el) { return el.p405e == i }).length,
            data.filter(function(el) { return el.p405f == i }).length,
            data.filter(function(el) { return el.p405g == i }).length,
            data.filter(function(el) { return el.p405h == i }).length,
            data.filter(function(el) { return el.p405i == i }).length,
            data.filter(function(el) { return el.p405j == i }).length,
            data.filter(function(el) { return el.p405k == i }).length,
            data.filter(function(el) { return el.p405l == i }).length,
            data.filter(function(el) { return el.p405m == i }).length,
            data.filter(function(el) { return el.p405n == i }).length,
            data.filter(function(el) { return el.p405o == i }).length,
            data.filter(function(el) { return el.p405p == i }).length,
            data.filter(function(el) { return el.p405q == i }).length,
            data.filter(function(el) { return el.p405r == i }).length,
            data.filter(function(el) { return el.p405s == i }).length,
            data.filter(function(el) { return el.p405t == i }).length,
            data.filter(function(el) { return el.p405u == i }).length,
            data.filter(function(el) { return el.p405v == i }).length,
            data.filter(function(el) { return el.p405w == i }).length,
            data.filter(function(el) { return el.p405x == i }).length,
            data.filter(function(el) { return el.p405y == i }).length,
          ]
        };
        $scope[poin].series.push(temp405);
        $scope[poin].key = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'];
        if (!loop) {
          passingChart405($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart405 = function(ObjectKey, data, poin, type){
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
      // 405 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 406 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput406 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput406(data, i, poin, loop, type)
        }
      }

      var setOutput406 = function(data, i, poin, loop, type){
        var temp406 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p406a == i }).length,
            data.filter(function(el) { return el.p406b == i }).length,
            data.filter(function(el) { return el.p406c == i }).length,
            data.filter(function(el) { return el.p406d == i }).length,
            data.filter(function(el) { return el.p406e == i }).length,
            data.filter(function(el) { return el.p406f == i }).length,
            data.filter(function(el) { return el.p406g == i }).length,
            data.filter(function(el) { return el.p406h == i }).length,
            data.filter(function(el) { return el.p406i == i }).length,
            data.filter(function(el) { return el.p406j == i }).length,
            data.filter(function(el) { return el.p406k == i }).length,
            data.filter(function(el) { return el.p406l == i }).length,
            data.filter(function(el) { return el.p406m == i }).length,
          ]
        };
        $scope[poin].series.push(temp406);
        $scope[poin].key = ['a','b','c','d','e','f','g','h','i','j','k','l','m'];
        if (!loop) {
          passingChart406($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart406 = function(ObjectKey, data, poin, type){
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
      // 406 --------------------------------------------------------------------------------------------------------------------------------------------------------------


    });

}());
