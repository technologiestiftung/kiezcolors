import pointsWithinPolygon from "@turf/points-within-polygon";

export default function (map, circleGeom) {
  // if (carCountingEnabled) return;

//   const bbox = bboxPolygon(map.getBounds().toArray().flat());
  const carFeatures = map.queryRenderedFeatures({
    layers: ["cars_parked_centroids", "cars_moving_centroids"],
  });  

  const pointsMoving = {
    type: "FeatureCollection",
    features: [],
  };

  const pointsParking = {
    type: "FeatureCollection",
    features: [],
  };

  carFeatures.forEach((d) => {
    if (d.layer.id === "cars_moving_centroids") {
      pointsMoving.features.push({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: d.geometry.coordinates,
        },
      });
    } else {
      pointsParking.features.push({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: d.geometry.coordinates,
        },
      });
    }
  });

  const carsMovingCounter = Number(pointsWithinPolygon(pointsMoving, circleGeom).features.length) || 0;
  const carsParkedCounter = Number(pointsWithinPolygon(pointsParking, circleGeom).features.length) || 0;
  const carsTotal = carsMovingCounter+carsParkedCounter;

  return {'moving':carsMovingCounter,'moving_perc':(carsMovingCounter / carsTotal) * 100,'parked':carsParkedCounter, 'parked_perc': ((carsParkedCounter / carsTotal) * 100) ?? undefined, 'total': carsTotal }
}
