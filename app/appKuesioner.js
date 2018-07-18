var app = angular.module('app', ['ngRoute', 'toastr']);

    app.config(["$routeProvider",
    function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "dashboard.html",
          activetab   : ''
      })
      .when("/ab", {
          templateUrl : "ab.html",
          activetab   : 'ab',
          title       : 'A. KETERANGAN RUMAHTANGGA DAN PROFIL RESPONDEN',
          title2      : 'B. KETERANGAN KEGIATAN RESPONDEN'
      })
      .when("/c", {
          templateUrl : "c.html",
          activetab   : 'c',
          title       : 'C. KARAKTERISTIK PERBUATAN PENCUCIAN UANG'
      })
      .when("/d", {
          templateUrl : "d.html",
          activetab   : 'd',
          title       : 'D. PANDANGAN TERKAIT RISIKO PENCUCIAN UANG'
      })
      .when("/e", {
          templateUrl : "e.html",
          activetab   : 'e',
          title       : 'E. PENGALAMAN RESPONDEN TERKAIT ANTI PENCUCIAN UANG'
      })
      .when("/f", {
          templateUrl : "f.html",
          activetab   : 'f',
          title       : 'F. KARAKTERISTIK PEMBUATAN PENDANAAN TERORISME'
      })
      .when("/g", {
          templateUrl : "g.html",
          activetab   : 'g',
          title       : 'G. PANDANGAN TERKAIT RISIKO PENDANAAN TERORISME'
      })
      .when("/h", {
          templateUrl : "h.html",
          activetab   : 'h',
          title       : 'H. PENGALAMAN RESPONDEN TERKAIT PENCEGAHAN PENDANAAN TERORISME'
      })
      .when("/i", {
          templateUrl : "i.html",
          activetab   : 'i',
          title       : 'I. KEEFEKTIFAN KINERJA INSTANSI PEMERINTAH TERKAIT PROGRAM ANTI PENCUCIAN UANG DAN PENCEGAHAN PENDANAAN TERORISME'
      })
      .when("/j", {
          templateUrl : "j.html",
          activetab   : 'j',
          title       : 'J. PANDANGAN PUBLIK TERHADAP ANCAMAN POLITIK UANG DAN PELANGGARAN DANA KAMPANYE DALAM PEMILUKADA'
      })
      .when("/k", {
          templateUrl : "k.html",
          activetab   : 'k',
          title       : 'K. PANDANGAN PUBLIK TERKAIT RADIKALISME'
      })
      .when("/l", {
          templateUrl : "l.html",
          activetab   : 'l',
          title       : 'L. PANDANGAN PUBLIK TERHADAP PENDANAAN PROLIFERASI/PENGEMBANGAN SENJATA PEMUSNAH MASSAL'
      })
      .when("/m", {
          templateUrl : "m.html",
          activetab   : 'm',
          title       : 'M. EDUKASI PROGRAM ANTI PENCUCIAN UANG DAN PENCEGAHAN PENDANAAN TERORISME KEPADA MASYARAKAT'
      })
      .when("/n", {
          templateUrl : "n.html",
          activetab   : 'n',
          title       : 'n. MASUKAN RESPONDEN DAN LEMBAR PENGESAHAN'
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
            if (response.level != '7') {
              if (response.level != '8') {
                localStorage.clear();
                window.location.href = '../';
                console.log("Blocked");
              }
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
