app.service('AuthService', ["$http","$location", "toastr", function($http, $location, toastr){
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

}]);
