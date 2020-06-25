const drawCoordinates = function (x, y) {
  const ctx = document.getElementById('canvas').getContext('2d');

  ctx.fillStyle = '#262626';
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2, true);
  ctx.fill();
};

const drawStrokes = function (vertices) {
  const reached = [];
  const unreached = [];

  vertices.forEach((vertex) => {
    drawCoordinates(vertex.x, vertex.y);
    unreached.push(vertex);
  });

  reached.push(unreached[0]);
  unreached.splice(0, 1);

  while (unreached.length > 0) {
    let reachedIndex;
    let unreachedIndex;
    let record = Infinity;

    reached.forEach((v1, rI) => {
      unreached.forEach((v2, uI) => {
        let d = Math.hypot(v1.x - v2.x, v1.y - v2.y);
        if (d < record) {
          record = d;
          reachedIndex = rI;
          unreachedIndex = uI;
        }
      });
    });

    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.beginPath();
    ctx.moveTo(reached[reachedIndex].x, reached[reachedIndex].y);
    ctx.lineTo(unreached[unreachedIndex].x, unreached[unreachedIndex].y);
    ctx.stroke();

    reached.push(unreached[unreachedIndex]);
    unreached.splice(unreachedIndex, 1);
  }
};

const draw = function (vertices) {
  const ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, 1000, 651);
  const x = event.clientX - 5;
  const y = event.clientY - 5;
  vertices.push({ x, y });
  drawStrokes(vertices);
};

const main = function () {
  const vertices = [];
  document.getElementById('canvas').onclick = draw.bind(null, vertices);
  drawStrokes.bind(null, vertices);
};

window.onload = main;
