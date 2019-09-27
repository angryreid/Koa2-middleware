"use strict";

var luck = {
  id: 1,
  sayWithArrow: function sayWithArrow() {
    var _this = this;

    setTimeout(function () {
      console.log(_this);
    }, 500);
  },
  sayWithGlobalArror: function sayWithGlobalArror() {
    setTimeout(function () {
      console.log(undefined);
    }, 500);
  }
};

luck.sayWithArrow(); // luck
luck.sayWithGlobalArror(); // golabal
//# sourceMappingURL=arrow.js.map