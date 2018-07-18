(function(){

    app.controller('groupAController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};




      $scope.post103    = {
        'p103' : 'name',
      }
      $scope.post105    = {
        'p105' : 'name',
      }
      $scope.post106    = {
        'p106' : 'name',
      }
      $scope.post107    = {
        'p107' : 'name',
      }
      $scope.post108    = {
        'p108' : 'name',
      }
      $scope.post109    = {
        'p109' : 'name',
      }

      $scope.getData = function(table, poin, filter, type, x) {
        $scope.checkPoint   = poin;
        var post = {
          'table'   : table,
          'poin'    : poin,
          'x'       : x
        }
        var onSuccess       = function(response){
          $scope[poin]      = response.data.hasil;// dapatkan hasil pemanggilan
          $scope[poin].type = type;               // menentukan type chart
          var filtered  = filterFilter(response.data.hasil, {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
          setOutput(filtered, poin, type);     // mengganti urutan atau tampilan hasil data
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }

      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        var type        = $scope[poin].type;                    // kembali mengambil type jika melalui filter
        var data        = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        var GroupBy     = _.groupBy(data, 'name');
        var ObjectKey   = Object.keys(GroupBy);                 // untuk xAxis categories
        var CountBy     = _.countBy(data,'name');
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type)
      }

      var setOutput = function(data, poin, type){
        var GroupBy     = _.groupBy(data, 'name');
        var ObjectKey   = Object.keys(GroupBy);                 // untuk xAxis categories
        var CountBy     = _.countBy(data,'name');
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
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


    });

}());





// MMMM     MMM  UU      UU  LL             AA        II       KK    KK  EEEEEEE      CCCCCCCC  II   UU      UU  MMM      MMM
// MM  MM MM MM  UU      UU  LL            AA AA      II       KK  KK    EE         CC          II   UU      UU  MM MM  MM MM
// MM   MM   MM  UU      UU  LL           AA   AA     II       KKKK      EEEEEEE   CC           II   UU      UU  MM   MM   MM
// MM        MM  UU      UU  LL          AAAAAAAAA    II       KKKK      EE        CC           II   UU      UU  MM        MM
// MM        MM   UU    UU   LL         AA       AA   II       KK  KK    EE         CC          II    UU    UU   MM        MM
// MM        MM     UUUU     LLLLLLLLL AA         AA  II       KK    KK  EEEEEEEE     CCCCCCCC  II      UUUU     MM        MM
//
//
// BBBBBB    UU      UU   SSSSSSSSS    UU      UU  KK    KK  NN      NN   YY      YY     AA
// BB   BB   UU      UU  SS            UU      UU  KK  KK    NNN     NN    YY    YY     AA AA
// BB BB     UU      UU   SSSSSSSSS    UU      UU  KKK       NN  N   NN      YY YY     AA   AA
// BB BB     UU      UU            SS  UU      UU  KKK       NN   N  NN       YY      AAAAAAAAA
// BB   BB    UU    UU             SS   UU    UU   KK  KK    NN     NNN       YY     AA       AA
// BBBBBB       UUUU      SSSSSSSSS       UUUU     KK    KK  NN      NN       YY    AA         AA
                                                                                        // FUCKING BITCH ....

// RIZKIFAC2204@GMAIL.COM
