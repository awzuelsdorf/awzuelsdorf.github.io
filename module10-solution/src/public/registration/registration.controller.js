(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['menuItems', 'userInfo'];
function RegistrationController(menuItems, userInfo) {
  var reg = this;

  reg.menuItems = menuItems;
  reg.userInfo = userInfo;

  reg.submit = function (info) {
    reg.userInfo.firstname = info.firstname;
    reg.userInfo.lastname = info.lastname;
    reg.userInfo.phone = info.phone;
    reg.userInfo.email = info.email;
    reg.userInfo.favorite = info.favorite;
    reg.completed = true;
  };
}

})();
