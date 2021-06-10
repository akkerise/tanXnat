/**
 * IIFE
 */
let Printer = (function () {
  // private
  let hello = "Hello, ";
  // public
  return { greeting: () => hello }
})();

let PrinterController = (function (instancePrinter) {
  // public
  return {
    init: () => {
      var text = instancePrinter.greeting() + "Matianda";
      console.log(text);
    }
  }
})(Printer);

PrinterController.init(); // will print "Hello, Matianda"