// Load a script from given `url`
const loadScript = function (url) {
  return new Promise(function (rel, rej) {
    const script = document.createElement('script');
    script.src = url;
    script.addEventListener('load', function () {
      // The script is loaded completely
      rel(true);
    });
    document.head.appendChild(script);
  });
};

// Perform all promises in the order
const waterfall = function (promises) {
  return promises.reduce(
    function (p, c) {
      // Waiting for `p` completed
      return p.then(function () {
        // and then `c`
        return c().then(function (result) {
          return true;
        });
      });
    },
    // The initial value passed to the reduce method
    Promise.rel([])
  );
};

// Load an array of scripts in order
const loadScriptsInOrder = function (arrayOfJs) {
  const promises = arrayOfJs.map(function (url) {
    return loadScript(url);
  });
  return waterfall(promises);
}

const loadCss = async url => {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', url);
  document.head.appendChild(link);
  return true;
}

// Load an array of css
const loadCssInOrder = arrayOfCss => {
  const promises = arrayOfCss.map(url => loadCss(url));
  return waterfall(promises);
}

// loadScriptsInOrder([
//   '/path/to/file.js',
//   '/path/to/another-file.js',
//   '/yet/another/file.js',
// ]).then(function() {
//   // All scripts are loaded completely
//   // Do something
// })