System.register(["./application.js"], function (_export, _context) {
  "use strict";

  console.time('total time');

  var Application, canvas, $p, bcr, application;

  function topLevelImport(url) {
    return System["import"](url);
  }

  return {
    setters: [function (_applicationJs) {
      Application = _applicationJs.Application;
    }],
    execute: function () {
      canvas = document.getElementById('GameCanvas');
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      canvas.width = bcr.width;
      canvas.height = bcr.height;
      application = new Application();
      console.time('phase require engine');
      topLevelImport('cc').then(function (engine) {
        console.timeEnd('phase require engine');
        return application.init(engine);
      }).then(function () {
        console.time('phase start engine');
        return application.start();
      }).then(function () {
        console.timeEnd('phase start engine');
        console.timeEnd('total time');
      });
    }
  };
});
