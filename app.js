(function () {
  "use strict";
  const markup1 = ` <div class="prize">
  <img class="prize__img" src="coca-cola.jpg" alt="" srcset="" />
  <div class="prize__name">
    <h3>Coca Cola 700mL</h3>
  </div>
</div> `;
  const markup2 = ` <div class="prize">
  <img class="prize__img" src="kinder-joy.jpg" alt="" srcset="" />
  <div class="prize__name">
    <h3>Kinder Joy</h3>
  </div>
</div> `;
  const markup3 = ` <div class="prize">
  <img class="prize__img" src="bowl.jpg" alt="" srcset="" />
  <div class="prize__name">
    <h3>Bowl</h3>
  </div>
</div> `;

  const markuparr = [markup1, markup2, markup3];

  var isDrawing, lastPoint;
  var container = document.getElementById("js-container"),
    canvas = document.getElementById("js-canvas"),
    canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    ctx = canvas.getContext("2d"),
    image = new Image(1, 1),
    brush = new Image();

  // base64 Workaround because Same-Origin-Policy
  // image.src = "cover.PNG";
  image.src = "ee.PNG";
  //   image.style.height = "100%";
  //   image.style.borderRadius = "100px";
  image.onload = function () {
    ctx.drawImage(image, 0, 0);
    // Show the form when Image is loaded.
    const x = Math.floor(Math.random() * 3);
    console.log(x);
    const markup = markuparr[x];

    canvas.insertAdjacentHTML("afterend", markup);
    document.querySelectorAll(".form")[0].style.visibility = "visible";
  };
  brush.src = "brush.png";

  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("touchstart", handleMouseDown, false);
  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("touchmove", handleMouseMove, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);
  canvas.addEventListener("touchend", handleMouseUp, false);

  function distanceBetween(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }

  function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

  // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  function getFilledInPixels(stride) {
    if (!stride || stride < 1) {
      stride = 1;
    }

    var pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
      pdata = pixels.data,
      l = pdata.length,
      total = l / stride,
      count = 0;

    // Iterate over all pixels
    for (var i = (count = 0); i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }

    return Math.round((count / total) * 100);
  }

  function getMouse(e, canvas) {
    var offsetX = 0,
      offsetY = 0,
      mx,
      my;

    if (canvas.offsetParent !== undefined) {
      do {
        offsetX += canvas.offsetLeft;
        offsetY += canvas.offsetTop;
      } while ((canvas = canvas.offsetParent));
    }

    mx = (e.pageX || e.touches[0].clientX) - offsetX;
    my = (e.pageY || e.touches[0].clientY) - offsetY;

    return { x: mx, y: my };
  }

  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    console.log(filledInPixels + "%");
    if (filledInPixels > 60) {
      canvas.parentNode.removeChild(canvas);
      celebrations();
      // console.log("DONEEEE");
    }
  }

  function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, canvas);
  }

  function handleMouseMove(e) {
    if (!isDrawing) {
      return;
    }

    e.preventDefault();

    var currentPoint = getMouse(e, canvas),
      dist = distanceBetween(lastPoint, currentPoint),
      angle = angleBetween(lastPoint, currentPoint),
      x,
      y;

    for (var i = 0; i < dist; i++) {
      x = lastPoint.x + Math.sin(angle) * i - 25;
      y = lastPoint.y + Math.cos(angle) * i - 25;
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(brush, x, y);
    }

    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(32));
  }

  function handleMouseUp(e) {
    isDrawing = false;
  }
})();

/*******************************************************************
 
 ========= CONFETTI JAVASCRIPT  ========= 
 =========      BY TRELLO       =========
 
 As seen on https://trello.com/10million
 _______________________________________
 
 Copyright © Trello. All rights Reserved.
  _______________________________________
 
 XXX Use for Educational Purposes only XXX
 
 I will not be liable for any damages or legal actions for Using of this material.
 
 *******************************************************************/

const celebrations = function () {
  var COLORS,
    Confetti,
    NUM_CONFETTI,
    PI_2,
    cele,
    confetti,
    context,
    drawCircle,
    drawCircle2,
    drawCircle3,
    i,
    range,
    xpos;
  NUM_CONFETTI = 40;
  COLORS = [
    [235, 90, 70],
    [97, 189, 79],
    [242, 214, 0],
    [0, 121, 191],
    [195, 119, 224],
  ];
  PI_2 = 2 * Math.PI;
  cele = document.getElementById("celebrate");
  context = cele.getContext("2d");
  window.w = 0;
  window.h = 0;
  window.resizeWindow = function () {
    window.w = cele.width = window.innerWidth;
    return (window.h = cele.height = window.innerHeight);
  };
  // window.addEventListener("resize", resizeWindow, !1);
  resizeWindow();
  window.onload = function () {
    return setTimeout(resizeWindow, 0);
  };
  range = function (a, b) {
    return (b - a) * Math.random() + a;
  };
  drawCircle = function (a, b, c, d) {
    context.beginPath();
    context.moveTo(a, b);
    context.bezierCurveTo(a - 17, b + 14, a + 13, b + 5, a - 5, b + 22);
    context.lineWidth = 2;
    context.strokeStyle = d;
    return context.stroke();
  };
  drawCircle2 = function (a, b, c, d) {
    context.beginPath();
    context.moveTo(a, b);
    context.lineTo(a + 6, b + 9);
    context.lineTo(a + 12, b);
    context.lineTo(a + 6, b - 9);
    context.closePath();
    context.fillStyle = d;
    return context.fill();
  };
  drawCircle3 = function (a, b, c, d) {
    context.beginPath();
    context.moveTo(a, b);
    context.lineTo(a + 5, b + 5);
    context.lineTo(a + 10, b);
    context.lineTo(a + 5, b - 5);
    context.closePath();
    context.fillStyle = d;
    return context.fill();
  };
  xpos = 0.9;
  document.onmousemove = function (a) {
    return (xpos = a.pageX / w);
  };
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (a) {
        return window.setTimeout(a, 5);
      }
    );
  })();
  Confetti = (function () {
    function a() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb =
        "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }
    a.prototype.replace = function () {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return (this.vy = 0.7 * this.r + range(-1, 1));
    };
    a.prototype.draw = function () {
      var a;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      1 < this.opacity && ((this.opacity = 1), (this.dop *= -1));
      (0 > this.opacity || this.y > this.ymax) && this.replace();
      if (!(0 < (a = this.x) && a < this.xmax))
        this.x = (this.x + this.xmax) % this.xmax;
      drawCircle(
        ~~this.x,
        ~~this.y,
        this.r,
        this.rgb + "," + this.opacity + ")"
      );
      drawCircle3(
        0.5 * ~~this.x,
        ~~this.y,
        this.r,
        this.rgb + "," + this.opacity + ")"
      );
      return drawCircle2(
        1.5 * ~~this.x,
        1.5 * ~~this.y,
        this.r,
        this.rgb + "," + this.opacity + ")"
      );
    };
    return a;
  })();
  confetti = (function () {
    var a, b, c;
    c = [];
    i = a = 1;
    for (b = NUM_CONFETTI; 1 <= b ? a <= b : a >= b; i = 1 <= b ? ++a : --a)
      c.push(new Confetti());
    return c;
  })();
  window.step = function () {
    var a, b, c, d;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    d = [];
    b = 0;
    for (c = confetti.length; b < c; b++) (a = confetti[b]), d.push(a.draw());
    return d;
  };
  step();
};
