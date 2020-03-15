(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemAdder = this;

  itemAdder.items = ShoppingListCheckOffService.getUnboughtItems();

  itemAdder.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuy = [
	  {
		  "quantity": 60,
		  "name": "burritos",
		  "pricePerItem": 3.9
	  },
	  {
		  "quantity": 90,
		  "name": "tamales",
		  "pricePerItem": 4.5
	  },
	  {
		  "quantity": 100,
		  "name": "tomatoes",
		  "pricePerItem": 2.4
	  },
	  {
		  "quantity": 80,
		  "name": "jelly beans",
		  "pricePerItem": 1.1
	  }

  ];

  var bought = [];

  service.buyItem = function (index) {
    var item = toBuy.splice(index, 1)[0];
    bought.push(item);
  };

  service.getBoughtItems = function () {
    return bought;
  };

  service.getUnboughtItems = function () {
    return toBuy;
  };
}

})();
