(function () {

angular.module('public')
.controller('ProfileController', ProfileController);

ProfileController.$inject = ['userInfo', 'favoriteMenuItemInfo'];
function ProfileController(userInfo, favoriteMenuItemInfo) {
  var profile = this;

  profile.userInfo = userInfo;
  console.log(favoriteMenuItemInfo);
  profile.favoriteMenuItemInfo = favoriteMenuItemInfo;
}

})();
