(function () {

angular.module('public')
.controller('ProfileController', ProfileController);

ProfileController.$inject = ['userInfo'];
function ProfileController(userInfo) {
  var profile = this;

  profile.userInfo = userInfo;
}

})();
