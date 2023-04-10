System.register(["./application.js"], function (_export, _context) {
  "use strict";

  const totalTime = Date.now();
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
        const time = Date.now() - totalTime;
        console.timeEnd('total time');

        const canvas = document.createElement('canvas')
        canvas.style.position = 'absolute';
        const ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText(time, 50, 50);
      });
    }
  };
});
