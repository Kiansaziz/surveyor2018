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
      .when("/info", {
          templateUrl : "info.html",
          // controller  : "infoController",
          activetab   : 'info'
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
      .when("/capaian", {
          templateUrl : "capaian.html",
          controller  : "capaianController",
          activetab   : 'capaian'
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
            if (response.level != '6') {
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
