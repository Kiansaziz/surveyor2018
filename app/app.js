var app = angular.module('app', ['ngRoute', 'toastr','angularUtils.directives.dirPagination', 'angular.morris', 'underscore', 'ngSanitize', 'ngCsv']);
    app.config(["$routeProvider",
    function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "dashboard.html",
          controller  : "dashboardController",
          activetab   : ''
      })
      .when("/profile", {
          templateUrl : "profile.html"
      })
      .when("/user", {
          templateUrl : "user.html",
          controller  : "userController",
          activetab   : 'user'
      })
      .when("/user/:idUser", {
          templateUrl : "user-detail.html",
          controller  : "userDetailController",
          activetab   : 'user'
      })
      .when("/info", {
          templateUrl : "info.html",
          // controller  : "infoController",
          activetab   : 'info'
      })
      .when("/chart", {
          templateUrl : "chart.html",
          controller  : "chartController",
          activetab   : 'chart'
      })

      .when("/flow", {
          templateUrl : "flow.html",
          controller  : "flowController",
          activetab   : 'flow'
      })
      .when("/kuesioner", {
          templateUrl : "kuesioner.html",
          controller  : "kuesionerController",
          activetab   : 'kuesioner'
      })
      .when("/kuesioner/:nomor_kuesioner", {
          templateUrl : "kuesioner-detail.html",
          controller  : "kuesionerDetailController",
          activetab   : 'kuesioner'
      })
      .when("/pesan", {
          templateUrl : "pesan.html",
          controller  : "pesanController",
          activetab   : 'pesan'
      })
      .when("/wilayah", {
          templateUrl : "wilayah.html",
          controller  : "wilayahController",
          activetab   : 'wilayah'
      })
      .when("/dokumentasi", {
          templateUrl : "dokumentasi.html",
          controller  : "dokumentasiController",
          activetab   : 'dokumentasi'
      })
      .when("/khusus", {
          templateUrl : "khusus.html",
          controller  : "khususController",
          activetab   : 'khusus'
      })
      .when("/failed", {
          templateUrl : "failed.html",
          controller  : "failedController",
          activetab   : 'failed'
      })
      .when("/group/a", {
          templateUrl : "chart/a.html",
          controller  : "groupAController",
          activetab   : 'group'
      })
      .when("/group/b", {
          templateUrl : "chart/b.html",
          controller  : "groupBController",
          activetab   : 'group'
      })
      .when("/group/c", {
          templateUrl : "chart/c.html",
          controller  : "groupCController",
          activetab   : 'group'
      })
      .when("/group/d", {
          templateUrl : "chart/d.html",
          controller  : "groupDController",
          activetab   : 'group'
      })
      .when("/group/e", {
          templateUrl : "chart/e.html",
          controller  : "groupEController",
          activetab   : 'group'
      })
      .when("/group/f", {
          templateUrl : "chart/f.html",
          controller  : "groupFController",
          activetab   : 'group'
      })
      .when("/group/g", {
          templateUrl : "chart/g.html",
          controller  : "groupGController",
          activetab   : 'group'
      })
      .when("/group/h", {
          templateUrl : "chart/h.html",
          controller  : "groupHController",
          activetab   : 'group'
      })
      .when("/group/i", {
          templateUrl : "chart/i.html",
          controller  : "groupIController",
          activetab   : 'group'
      })
      .when("/group/j", {
          templateUrl : "chart/j.html",
          controller  : "groupJController",
          activetab   : 'group'
      })
      .when("/group/k", {
          templateUrl : "chart/k.html",
          controller  : "groupKController",
          activetab   : 'group'
      })
      .when("/group/l", {
          templateUrl : "chart/l.html",
          controller  : "groupLXController",
          activetab   : 'group'
      })
      .when("/group/m", {
          templateUrl : "chart/m.html",
          controller  : "groupMController",
          activetab   : 'group'
      })
      .when("/group/n", {
          templateUrl : "chart/n.html",
          controller  : "groupNController",
          activetab   : 'group'
      })
      .when("/sc", {
          templateUrl : "sc.html",
          controller  : "scxController",
          activetab   : ''
      })
      .when("/sx", {
          templateUrl : "sx.html",
          controller  : "scxController",
          activetab   : ''
      })
      .when("/err", {
          templateUrl : "err.html",
          controller  : "errController",
          activetab   : ''
      })
      .otherwise({
          redirectTo : "/"
      });
    }])
    .run(['$rootScope','AuthService', '$timeout', function($rootScope, AuthService, $timeout){
      $rootScope.$on('$routeChangeStart', function (event, next) {
        var token;
        if(localStorage['_token']){
          var token =  JSON.parse(localStorage['_token']);
          AuthService.checkValid(token).then(function(response){
            if (response.level != '1') {
              localStorage.clear();
              window.location.href = '../';
              console.log("Blocked");
            }
          });
        } else if(localStorage['_token']=='undefined') {
          localStorage.clear();
          window.location.href = '../';
        } else {
          localStorage.clear();
          window.location.href = '../';
        }
      });

    }]);
