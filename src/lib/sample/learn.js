/**
 * Higher Order Functions
 * nhận vào 1 function() và trả về 1 function()
 * @returns 
 */
 const sum = a => b => a + b

 // var sum = function sum(a) {
 //   return function (b) {
 //     return a + b;
 //   };
 // };

/**
 * @Closure
 * Theo mình hiểu, closure (dịch ra là: bao đóng), 
 * closure là cách một function cha return về function con ở bên trong nó. 
 * Mà function con có thể truy cập và thực thi các biến của function cha. 
 * Phải thoả mãn 2 điều kiện trên mới được gọi là closure.
 * @returns 
 */

const numberGenerator = () => {
  let num = 0;
  const checkNumber = () => ++num;
  return checkNumber;
}

var numberFunc = numberGenerator();

console.log(numberGenerator()()); // 1
console.log(numberGenerator()()); // 1
console.log(numberFunc()); // 1
console.log(numberFunc()); // 2
console.log(numberFunc()); // 3

/**
 * @Curry
 * @returns 
 */
// Tìm các số tự nhiên số lẻ bé hơn 10
const numberOdd = () => {
  const number = [];
  for(let i = 0; i < 10; i++) {
    if(i % 2 === 1) {
      number.push(i);
    }
  }
  return number;
}

// Tìm các số tự nhiên số chẵn bé hơn 20
const numberEven = () => {
  const number = [];
  for(let i = 0; i < 20; i++) {
    if(i % 2 === 0) {
      number.push(i);
    }
  }
  return number;
}

console.log(numberOdd());  // [1, 3, 5, 7, 9]
console.log(numberEven()); // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
