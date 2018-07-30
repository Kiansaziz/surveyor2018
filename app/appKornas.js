var app = angular.module('app', ['ngRoute', 'toastr','angularUtils.directives.dirPagination', 'angular.morris']);
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
      .when("/kuesioner", {
          templateUrl : "kuesioner.html",
          controller  : "kuesionerController",
          activetab   : 'kuesioner'
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
      .when("/pesan", {
          templateUrl : "pesan.html",
          controller  : "pesanController",
          activetab   : 'pesan'
      })
      .when("/capaian", {
          templateUrl : "capaian.html",
          controller  : "capaianController",
          activetab   : 'capaian'
      })
     .when("/file", {
          templateUrl : "file.html",
          controller  : "fileController",
          activetab   : 'file'
      })
      .when("/file/ba/:idBa", {
          templateUrl : "file-ba.html",
          controller  : "fileDetailController",
          activetab   : 'file'
      })
      .when("/file/observasi/:idObservasi", {
          templateUrl : "file-observasi.html",
          controller  : "fileDetailController",
          activetab   : 'file'
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
            if (response.level != '5') {
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
