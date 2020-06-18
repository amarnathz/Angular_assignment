angular
  .module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyController.$infect = ["ShoppingListCheckOffService"];

function ToBuyController(ShoppingListCheckOffService) {
  var BuyCon = this;
  BuyCon.name = "";
  BuyCon.quantity = "";
  BuyCon.items = [];
  BuyCon.msg = "Everything is bought!";
  BuyCon.items = ShoppingListCheckOffService.getitem();
  BuyCon.additemBuy = function () {
    ShoppingListCheckOffService.additem(BuyCon.name, BuyCon.quantity);
    BuyCon.msg = ShoppingListCheckOffService.check();
  };

  BuyCon.Buyitem = function (ind) {
    ShoppingListCheckOffService.Boughtitem(BuyCon.items[ind]);
    BuyCon.items.splice(ind, 1);
    BuyCon.msg = ShoppingListCheckOffService.check();
    ShoppingListCheckOffService.check1();
  };

  // console.log(BuyCon.items[ind]);
}

AlreadyBoughtController.$infect = ["ShoppingListCheckOffService"];

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var BoughtCon = this;
  BoughtCon.items = ShoppingListCheckOffService.getBoughtitem();

  BoughtCon.msg = ShoppingListCheckOffService.getobj();

  BoughtCon.remove = function (ind) {
    console.log(BoughtCon.items[ind]);
    // or //  BoughtCon.items.splice(ind, 1);
    ShoppingListCheckOffService.remove(ind);
    BoughtCon.msg[0] = ShoppingListCheckOffService.check1();
  };
}

function ShoppingListCheckOffService() {
  var service = this;
  var items = [];
  var Boughtitem = [];
  var obj = { 0: "Nothing bought yet" };
  service.check = function () {
    if (items.length < 1) return " Everything is bought!";
    else return null;
  };
  service.getobj = function () {
    return obj;
  };
  service.check1 = function () {
    if (Boughtitem.length > 0) obj[0] = null;
    else return "Nothing bought yet";

    console.log(Boughtitem.length, "  ", obj);
  };

  service.additem = function (name, quantity) {
    var item = {
      name: name,
      quantity: quantity,
    };

    items.push(item);
  };

  service.getitem = function () {
    return items;
  };

  service.Boughtitem = function (item) {
    Boughtitem.push(item);
  };

  service.remove = function (ind) {
    Boughtitem.splice(ind, 1);
  };

  service.getBoughtitem = function () {
    return Boughtitem;
  };
}
