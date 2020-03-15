(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var buyer = this;

  buyer.items = ShoppingListService.getUnboughtItems();

  buyer.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var checker = this;

  checker.items = ShoppingListService.getBoughtItems();
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var unboughtItems = [
      {
	      "name": "Cookies",
	      "quantity" : 10,
	      "unit" : "box(es)",
	      "pricePerItem" : 4.50
      },
      {
	      "name": "Pepto Bismol",
	      "quantity" : 5,
	      "unit" : "bottle(s)",
	      "pricePerItem" : 2.00
      }
  ];

  var boughtItems = [];

  service.buyItem = function (index) {
    boughtItems.push(unboughtItems.pop(index));
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.getUnboughtItems = function () {
    return unboughtItems;
  };
}

})();
