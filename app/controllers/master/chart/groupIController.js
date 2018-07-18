(function(){

    app.controller('groupIController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};




      $scope.post901    = {
        'p9013' : 'a',
        'p9014' : 'b',
      }
      $scope.post902    = {
        'p9023' : 'a',
        'p9024' : 'b',
      }
      $scope.post903    = {
        'p9033' : 'a',
        'p9034' : 'b',
      }
      $scope.post904    = {
        'p9043' : 'a',
        'p9044' : 'b',
      }
      $scope.post905    = {
        'p9053' : 'a',
        'p9054' : 'b',
      }
      $scope.post906    = {
        'p9063' : 'a',
        'p9064' : 'b',
      }
      $scope.post907    = {
        'p9073' : 'a',
        'p9074' : 'b',
      }
      $scope.post908    = {
        'p9083' : 'a',
        'p9084' : 'b',
      }
      $scope.post909    = {
        'p9093' : 'a',
        'p9094' : 'b',
        'p9095' : 'c',
        'p9096' : 'd',
      }
      $scope.post910    = {
        'p9103' : 'a',
        'p9104' : 'b',
        'p9105' : 'c',
        'p9106' : 'd',
      }
      $scope.post911    = {
        'p9113' : 'a',
        'p9114' : 'b',
        'p9115' : 'c',
        'p9116' : 'd',
      }
      $scope.post912    = {
        'p9123' : 'a',
        'p9124' : 'b',
        'p9125' : 'c',
        'p9126' : 'd',
      }
      $scope.post913    = {
        'p9135' : 'c',
        'p9136' : 'd',
      }
      $scope.post914    = {
        'p9145' : 'c',
        'p9146' : 'd',
      }
      $scope.post915    = {
        'p9155' : 'c',
        'p9156' : 'd',
      }
      $scope.post916    = {
        'p9165' : 'c',
        'p9166' : 'd',
      }
      $scope.post917    = {
        'p9175' : 'c',
        'p9176' : 'd',
      }
      $scope.post918    = {
        'p9185' : 'c',
        'p9186' : 'd',
      }
      $scope.post919    = {
        'p9195' : 'c',
        'p9196' : 'd',
      }
      $scope.post920    = {
        'p9205' : 'c',
        'p9206' : 'd',
      }
      $scope.post921    = {
        'p9215' : 'c',
        'p9216' : 'd',
      }
      $scope.post922    = {
        'p9225' : 'c',
        'p9226' : 'd',
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
          $scope[poin].filtered = filterFilter(response.data.hasil, {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
          setOutputA($scope[poin].filtered, poin, type, 'a');
          setOutputB($scope[poin].filtered, poin, type, 'b');
          setOutputC($scope[poin].filtered, poin, type, 'c');
          setOutputD($scope[poin].filtered, poin, type, 'd');
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_i', 'p901', $scope.filter, 'bar', $scope.post901);

      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        setOutputA($scope[poin].filtered, poin, type, 'a');
        setOutputB($scope[poin].filtered, poin, type, 'b');
        setOutputC($scope[poin].filtered, poin, type, 'c');
        setOutputD($scope[poin].filtered, poin, type, 'd');
      }


      var setOutputA = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var GroupBy     = _.groupBy(data, 'a');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(data,'a');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }
      var setOutputB = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var filteredArray = _.filter(data,function(obj) {
             return obj.b;
        });
        var GroupBy     = _.groupBy(filteredArray, 'b');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(filteredArray,'b');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }
      var setOutputC = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var GroupBy     = _.groupBy(data, 'c');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(data,'c');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }
      var setOutputD = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var filteredArray = _.filter(data,function(obj) {
             return obj.d;
        });
        var GroupBy     = _.groupBy(filteredArray, 'd');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(filteredArray,'d');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }

      var passingChart = function(ObjectKey, chartData, poin, type, sub){
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

    });

}());
