import destination from "@turf/destination";

export default function (map, canvas, circleRadius) {
  const cooUp = destination(map.getCenter().toArray(), circleRadius, 90, {
    units: "meters",
  }).geometry.coordinates;
  const rightPoints = map.project(cooUp);
  const centerPoints = map.project(map.getCenter().toArray());
  const radius = rightPoints.x - centerPoints.x;

  const { width, height } = map.getContainer().getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.lineTo(0, 0);
  ctx.closePath();

  ctx.moveTo(width / 4, height / 4);
  ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, true);
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.strokeStyle = "rgba(255,255,255,0)";
  ctx.lineWidth = 0.1;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, true);
  ctx.strokeStyle = "rgba(255,255,255,1)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 4, 0, 2 * Math.PI, true);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 2, 0, 2 * Math.PI, true);
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fill();
}
