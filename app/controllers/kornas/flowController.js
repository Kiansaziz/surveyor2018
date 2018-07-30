(function(){

    app.controller('flowController', function($scope, $http, toastr, filterFilter){

      $scope.filter = {};
      $scope.filter.token = JSON.parse(localStorage['_token']);

      $scope.changeProv = function(filter){
        if (filter.id_prov == '') {
          delete $scope.filter.id_prov;
          delete $scope.filter.id_kab;
          delete $scope.filter.id_kec;
        } else {
          delete $scope.filter.id_kab;
          delete $scope.filter.id_kec;
        }
      }

      $scope.changeKab = function(filter){
        if (filter.id_kab == '') {
          delete $scope.filter.id_kab;
          delete $scope.filter.id_kec;
        } else {
          delete $scope.filter.id_kec;
        }
      }


      $scope.filterFlow = function(filter) {
        var onSuccess = function(response){
          if (response.data.status != "success") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.flow = response.data;
            list1(filter);
            list2(filter);
            listRes(filter);
            list13(filter);
            list14(filter);
            list15(filter);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/flow.php?type=filterFlow",filter).then(onSuccess, onError);
      }
      $scope.filterFlow($scope.filter);


      var list1 = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.flow.list1 = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/flow.php?type=list1", filter).then(onSuccess, onError);
      }

      var list2 = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.flow.list2 = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/flow.php?type=list2", filter).then(onSuccess, onError);
      }

      var list13 = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.flow.list13 = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/flow.php?type=list13", filter).then(onSuccess, onError);
      }

      var list14 = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.flow.list14 = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/flow.php?type=list14", filter).then(onSuccess, onError);
      }

      var list15 = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.flow.list15 = response.data;
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/flow.php?type=list15", filter).then(onSuccess, onError);
      }



      var listRes = function(filter) {
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $scope.flow.listRes = response.data;
            changeOutput(response.data);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kornas/flow.php?type=listRes", filter).then(onSuccess, onError);
      }

      var changeOutput = function(data){
        var temp =[
        {
          name: 'Selesai',
          data:
          [
            data.filter(function(el) { return el.list3 == '1' }).length,
            data.filter(function(el) { return el.list4 == '1' }).length,
            data.filter(function(el) { return el.list5 == '1' }).length,
            data.filter(function(el) { return el.list6 == '1' }).length,
            data.filter(function(el) { return el.list7 == '1' }).length,
            data.filter(function(el) { return el.list8 == '1' }).length,
            data.filter(function(el) { return el.list9 == '1' }).length,
            data.filter(function(el) { return el.list10 == '1' }).length,
            data.filter(function(el) { return el.list11 == '1' }).length,
            data.filter(function(el) { return el.list12 == '1' }).length,
          ]
        },
        {
          name: 'Belum',
          data:
          [
            data.filter(function(el) { return el.list3 == '0' }).length,
            data.filter(function(el) { return el.list4 == '0' }).length,
            data.filter(function(el) { return el.list5 == '0' }).length,
            data.filter(function(el) { return el.list6 == '0' }).length,
            data.filter(function(el) { return el.list7 == '0' }).length,
            data.filter(function(el) { return el.list8 == '0' }).length,
            data.filter(function(el) { return el.list9 == '0' }).length,
            data.filter(function(el) { return el.list10 == '0' }).length,
            data.filter(function(el) { return el.list11 == '0' }).length,
            data.filter(function(el) { return el.list12 == '0' }).length,
          ]
        }];
        $scope.flow.listRes.series = temp;
        $scope.flow.listRes.key = ['List 3','List 4','List 5','List 6', 'List 7', 'List 8', 'List 9', 'List 10', 'List 11', 'List 12'];
        passingChart($scope.flow.listRes.key, $scope.flow.listRes.series)
      }

      var passingChart = function(ObjectKey, data){
        $scope.flow.listRes.chart = {
          chart: {
              type: 'column',
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          subtitle: {
              text: 'List Flow Tugas 3 - 12'
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
                  text: 'Jumlah'
              }
          },
          tooltip: {
              valueSuffix: ''
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


    });

}());
