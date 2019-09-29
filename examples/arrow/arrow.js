let luck = {
  id: 1,
  sayWithArrow: function() {
    setTimeout(() => {
      console.log(this);
    }, 500);
  },
  sayWithGlobalArror: () => {
    setTimeout(() => {
      console.log(this);
    }, 500);
  }
};

luck.sayWithArrow(); // luck
luck.sayWithGlobalArror(); // golabal
