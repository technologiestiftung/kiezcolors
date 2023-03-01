import destination from "@turf/destination";

export default function(map, opt) {
  let points = [];
  for (let i = 0; i < opt.steps; i++) {
    const angle = (360 / opt.steps) * i;
    const options = { units: "meters" };
    const cooUp = destination(map.getCenter().toArray(), opt.radius, angle, options).geometry.coordinates;
    points.push(cooUp);
  }
  points.push(points[0]);

  return {
    type: "Polygon",
    coordinates: [points],
  };
}
