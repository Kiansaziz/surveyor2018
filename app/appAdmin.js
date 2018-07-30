var app = angular.module('app', ['ngRoute', 'toastr','angularUtils.directives.dirPagination', 'angular.morris', 'underscore', 'ngSanitize', 'ngCsv']);
    app.config(["$routeProvider",
    function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "../wp-master/dashboard.html",
          controller  : "dashboardController",
          activetab   : ''
      })
      .when("/profile", {
          templateUrl : "../wp-master/profile.html"
      })
      .when("/chart", {
          templateUrl : "../wp-master/chart.html",
          controller  : "chartController",
          activetab   : 'chart'
      })
      .when("/flow", {
          templateUrl : "../wp-master/flow.html",
          controller  : "flowController",
          activetab   : 'flow'
      })
      .when("/pesan", {
          templateUrl : "pesan.html",
          controller  : "pesanController",
          activetab   : 'pesan'
      })
      .when("/dokumentasi", {
          templateUrl : "../wp-master/dokumentasi.html",
          controller  : "dokumentasiController",
          activetab   : 'dokumentasi'
      })
      .when("/group/a", {
          templateUrl : "../wp-master/chart/a.html",
          controller  : "groupAController",
          activetab   : 'group'
      })
      .when("/group/b", {
          templateUrl : "../wp-master/chart/b.html",
          controller  : "groupBController",
          activetab   : 'group'
      })
      .when("/group/c", {
          templateUrl : "../wp-master/chart/c.html",
          controller  : "groupCController",
          activetab   : 'group'
      })
      .when("/group/d", {
          templateUrl : "../wp-master/chart/d.html",
          controller  : "groupDController",
          activetab   : 'group'
      })
      .when("/group/e", {
          templateUrl : "../wp-master/chart/e.html",
          controller  : "groupEController",
          activetab   : 'group'
      })
      .when("/group/f", {
          templateUrl : "../wp-master/chart/f.html",
          controller  : "groupFController",
          activetab   : 'group'
      })
      .when("/group/g", {
          templateUrl : "../wp-master/chart/g.html",
          controller  : "groupGController",
          activetab   : 'group'
      })
      .when("/group/h", {
          templateUrl : "../wp-master/chart/h.html",
          controller  : "groupHController",
          activetab   : 'group'
      })
      .when("/group/i", {
          templateUrl : "../wp-master/chart/i.html",
          controller  : "groupIController",
          activetab   : 'group'
      })
      .when("/group/j", {
          templateUrl : "../wp-master/chart/j.html",
          controller  : "groupJController",
          activetab   : 'group'
      })
      .when("/group/k", {
          templateUrl : "../wp-master/chart/k.html",
          controller  : "groupKController",
          activetab   : 'group'
      })
      .when("/group/l", {
          templateUrl : "../wp-master/chart/l.html",
          controller  : "groupLXController",
          activetab   : 'group'
      })
      .when("/group/m", {
          templateUrl : "../wp-master/chart/m.html",
          controller  : "groupMController",
          activetab   : 'group'
      })
      .when("/group/n", {
          templateUrl : "../wp-master/chart/n.html",
          controller  : "groupNController",
          activetab   : 'group'
      })
      .otherwise({
          redirectTo : "/"
      });
    }])
    .run(['$rootScope','AuthService', function($rootScope, AuthService){
      $rootScope.$on('$routeChangeStart', function (event, next) {
        var token;
        if(localStorage['_token']){
          var token =  JSON.parse(localStorage['_token']);
          AuthService.checkValid(token).then(function(response){
            if (response.level != '2') {
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
