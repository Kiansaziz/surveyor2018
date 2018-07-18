    app
    .filter('startFrom', function(){
      return function(data, start){
        if (!data || !data.length) { return; }
        start = +start; //parse to int
        return data.slice(start);
      }
    })
    .filter('dateToISO', function() {
      return function(input) {
        if (input == '0000-00-00 00:00:00') {
          return false;
        }
        if (!input) { return; }
        input = new Date(input).toISOString();
        return input;
      };
    })
    .filter('attrHtmlHilang', function() {
      return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
      };
    })
    .filter('range', function() {
      return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
          input.push(i);
        return input;
      };
    })
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    })
    .directive('pwCheck', [function () {
      return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
          var firstPassword = '#' + attrs.pwCheck;
          elem.add(firstPassword).on('keyup', function () {
            scope.$apply(function () {
              var v = elem.val()===$(firstPassword).val();
              ctrl.$setValidity('pwmatch', v);
            });
          });
        }
      }
    }])
    .directive('datePicker', [function () {
      return {
          restrict: "A",
          require: "ngModel",
          link: function (scope, element, attrs, ngModelCtrl) {
              var parent = $(element).parent();
              var dtp = parent.datetimepicker({
                  format: "YYYY-MM-DD",
                  showTodayButton: true
              });
              dtp.on("dp.change", function (e) {
                  ngModelCtrl.$setViewValue(moment(e.date).format("YYYY-MM-DD"));
                  scope.$apply();
              });
          }
      }
    }])
    .directive('timePicker', [function () {
      return {
          restrict: "A",
          require: "ngModel",
          link: function (scope, element, attrs, ngModelCtrl) {
              var dtp = $(element).datetimepicker({
                  format: "HH:mm",
                  showTodayButton: true
              });
              dtp.on("dp.change", function (e) {
                  ngModelCtrl.$setViewValue(moment(e.date).format("HH:mm"));
                  scope.$apply();
              });
          }
      }
    }])
    .service('AuthService', ["$http","$location", "toastr", function($http, $location, toastr){
      var self = this;
      self.checkValid = function(token){
        var data = { token : token }
        var onSuccess = function(response){
          if (response.data.status == 'authorized') {
            return response.data.profile.data;
          } else {
            localStorage.clear();
            window.location.href = '../';
          }
        }
        var onError = function(reason){
          localStorage.clear();
          window.location.href = '../';
        }
        return $http.post("../api/auth.php?type=checkAuth", data).then(onSuccess, onError);
      }
      self.out = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          localStorage.clear();
          window.location.href = '../';
        }
        var onError = function(reason){
          localStorage.clear();
          window.location.href = '../';
        }
        $http.post("../api/auth.php?type=signout",{"token":token})
        .then(onSuccess, onError);
      }
    }])
    // HANDLE INPUT TYPE NUMBER
    .directive('input', [function() {
      return {
          restrict: 'E',
          require: '?ngModel',
          link: function(scope, element, attrs, ngModel) {
              if (
                     'undefined' !== typeof attrs.type
                  && 'number' === attrs.type
                  && ngModel
              ) {
                  ngModel.$formatters.push(function(modelValue) {
                      return Number(modelValue);
                  });

                  ngModel.$parsers.push(function(viewValue) {
                      return Number(viewValue);
                  });
              }
          }
      }
    }])
    // Directive unruk chart umum, mengambil semua option
    .directive('hcChart', function () {
      return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
          options: '='
        },
        link: function (scope, element) {
          Highcharts.chart(element[0], scope.options);

          scope.$watch('options', function(newVal) {
            if (newVal) {
              Highcharts.chart(element[0], scope.options);
            }
          }, true);

        }
      };
    });
