// Closure
function name(n) {
  return function (a) {
    return `${n} likes ${a}`;
  };
}
const whoILike = man => woman => `${man} likes ${woman}`;

function Product() {
  let name;

  this.setName = (value) => {
    name = value;
  };

  this.getName = () => name
}

const product = new Product();
product.setName("anonystick.com");
console.log(product.name); // undefined
console.log(product.getName()); // anonystick.com

/**
 * Closure
 * @param {*} job 
 */

const hello = (greeting) => {
  return (who) => {
    console.log(greeting + ' ' + who);
  }
}

hello('Hello')('Dat'); // Hello Dat
hello('Good morning')('Matianda'); // Good morning Matianda

printInterviewQuestionFor("developer")("Matianda"); //Can you tell me about latest software you have built, Matianda?
printInterviewQuestionFor(); // nothings happen
printInterviewQuestionFor("designer")(); //Can you please explain about UX design, ?
printInterviewQuestionFor("")();