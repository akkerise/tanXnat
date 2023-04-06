// call truyền từng tham số
function print() {
  console.log(this.mVal)
}

var obj = {
  mVal: "lalala",

  mMethod: function(callback) {
    // truyền đối tượng hiện tại cho hàm phản hồi callback
    callback.call(this)
  }
}

obj.mMethod(print)
