// apply truyền mảng các tham số
var obj = {
  firstName: "Ahihi",
  lastName: "Ihaha",

  mMethod: function(firstName, lastName) {
    var firstName = firstName || this.firstName
    var lastName = lastName || this.lastName
    console.log("Hello " + firstName + " " + lastName)
  }
}

var obj1 = {
  firstName: 'xxx',
  lastName: 'yyy'
};

obj.mMethod() // Hello Ahihi Ihaha

obj.mMethod.call(obj1) // Hello xxx yyy

obj.mMethod.apply(obj1) // Hello xxx yyy

obj.mMethod.call(obj1, "xxx", "yyy") // Hello xxx yyy

obj.mMethod.apply(obj1, ["xxx", "yyy"]) // Hello xxx yyy
