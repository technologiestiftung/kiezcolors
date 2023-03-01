import midpoint from '@turf/midpoint';
import distance from '@turf/distance';
import bboxPolygon from '@turf/bbox-polygon';

export default function getMaxCircleRadius(map) {
	const center = map.getCenter().toArray();
	const bbox = map.getBounds().toArray().flat();
	const bboxPoly = bboxPolygon(bbox);
	const bboxPolyCoordinates = bboxPoly.geometry.coordinates[0];

	const midPointHeight = midpoint(bboxPolyCoordinates[1], bboxPolyCoordinates[2]);
	const maxWidth = distance(midPointHeight, center) * 1000;
	const midPointWidtht = midpoint(bboxPolyCoordinates[2], bboxPolyCoordinates[3]);
	const maxHeight = distance(midPointWidtht, center) * 1000;
	const maxDistance = Math.min(maxHeight, maxWidth);
	let radius;

	if (maxDistance >= 1000) {
		radius = 1000;
	} else if (maxDistance >= 900) {
		radius = 900;
	} else if (maxDistance >= 800) {
		radius = 800;
	} else if (maxDistance >= 700) {
		radius = 700;
	} else if (maxDistance >= 600) {
		radius = 600;
	} else if (maxDistance >= 500) {
		radius = 500;
	} else if (maxDistance >= 400) {
		radius = 400;
	} else if (maxDistance >= 300) {
		radius = 300;
	} else if (maxDistance >= 200) {
		radius = 200;
	} else if (maxDistance >= 100) {
		radius = 100;
	} else if (maxDistance >= 50) {
		radius = 50;
	} else {
		radius = 10;
	}

	return radius;
}
