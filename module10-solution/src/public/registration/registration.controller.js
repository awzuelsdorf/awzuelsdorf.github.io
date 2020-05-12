(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['menuItems'];
function RegistrationController(menuItems) {
  var reg = this;

  reg.menuItems = menuItems;

  reg.submit = function () {
    reg.completed = true;
  };
}

})();
