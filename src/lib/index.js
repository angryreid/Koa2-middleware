import "../assets/style/common.scss"

function changeTitle() {
  window.$("#app").html("Parcel test devtool");
}

setTimeout(function(){
  changeTitle();
},2000)