(function () {
'use strict';

angular.module('MenuApp')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['ShoppingListService', 'items'];
function MainShoppingListController(ShoppingListService, items) {
  var mainlist = this;
  mainlist.items = items;
}

})();
