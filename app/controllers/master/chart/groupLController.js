(function(){

    app.controller('groupLXController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p1202b === null || item.p1202b.trim().length === 0)
      }

      $scope.post1201    = {
        'p1201' : 'name',
      }
      $scope.post1202    = {
        'p1202a'  : 'name',
        'p1202b'  : 'p1202b',
      }
      $scope.post1203    = {
        'p1203' : 'name',
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
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_l', 'p1201', $scope.filter, 'pie', $scope.post1201);



      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        setOutput($scope[poin].filtered, poin, type, 'a');
      }


      // SINGLE 1201------------------------------------------------------------------------------------------------------------------------------------------------------
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
      // SINGLE 1201 -----------------------------------------------------------------------------------------------------------------------------------------------------

    });

}());
