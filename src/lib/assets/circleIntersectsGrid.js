import intersect from "@turf/intersect";

export default function (map, circleGeom) {
  const grid = map.queryRenderedFeatures({ layers: ["gridLayer"] });
  let foundIntersection = false;
  grid.forEach(function (feature) {
    const intersection = intersect(circleGeom, feature.geometry); // circleGeom -> bbox

    if (foundIntersection) return;
    if (intersection) {
      foundIntersection = true;
    } else {
    }
  });
  return foundIntersection;
}
