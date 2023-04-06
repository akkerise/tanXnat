var name = "xxx";
var user = {
  name: "yyy",
  showInfo: function () {
    console.log("Name:" + this.name);
  }
}

var showData = user.showInfo;
var showDataBind = user.showInfo.bind(user)
showData() // call global data : return Name: undefined
showDataBind() // call local data: return Name: yyy
