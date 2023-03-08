
1. Constructor
```
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.showName = function() {
     console.log(this.firstName + ' ' + this.lastName);
  };
}

var psn1 = new Person('Hoang', 'Pham');

// các property khai báo vào biến this có thể bị truy xuất từ bên ngoài
// object không còn bao đóng nữa
psn1.firstName = 'changed';
console.log(ps1.firstName);
```

2. Private/Public properties
```
function Person(firstName, lastName) {
  var fstName = firstName;
  var lstName = lastName;
  
  this.setFirstName = function(firstName) { fstName = firstName; };
  this.getFirstName = function() { return fstName; };
  
  this.setLastName = function(lastName) { lstName = lastName; };
  this.getLastName = function() { return lstName; }
}

var psn1 = new Person('Hoang', 'Pham');
console.log(ps1.fstName); // Undefined, không thể truy cập được


console.log(ps1.getFirstName()); // Hoang
```
3. Extends
```
function Person() {
  this.firstName = 'Per';
  this.lastName = 'son';
  this.sayName = function() { return this.firstName + ' ' + this.lastName };
}

// Viết một Constructor Function khác
function SuperMan(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Ta muốn SuperMan sẽ kế thừa các thuộc tính của Person
// Sử dụng prototype để kế thừa
SuperMan.prototype = new Person();

// Tạo một object mới bằng Constructor Function 
var sm = new SuperMan('Hoang', 'Pham');
sm.sayName(); // Hoang Pham. Hàm này kế thừa từ prototype của Person
```
