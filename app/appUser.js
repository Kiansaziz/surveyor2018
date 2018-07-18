var app = angular.module('app', ['ngRoute', 'toastr']);

    app.config(["$routeProvider",
    function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "dashboard.html",
          activetab   : ''
      })
      .when("/berita-acara", {
          templateUrl : "berita-acara.html",
          activetab   : 'berita-acara',
          title       : 'BERITA ACARA'
      })
      .when("/berita-acara/data", {
          templateUrl : "berita-acara-data.html",
          activetab   : 'berita-acara',
          title       : 'DATA BERITA ACARA'
      })
      .when("/observasi", {
          templateUrl : "observasi.html",
          activetab   : 'observasi',
          title       : 'OBSERVASI'
      })
      .when("/observasi/data", {
          templateUrl : "observasi-data.html",
          activetab   : 'observasi',
          title       : 'OBSERVASI'
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
            if (response.level != '9') {
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
