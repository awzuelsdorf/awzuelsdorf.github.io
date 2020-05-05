(function () {
'use strict';

angular.module('MenuApp')
.controller('MainMenuController', MainMenuController);


MainMenuController.$inject = ['MenuDataService', 'items'];
function MainMenuController(MenuDataService, items) {
  var mainlist = this;
  mainlist.items = items;
}

})();
