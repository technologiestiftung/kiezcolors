import intersect from '@turf/intersect';
import area from '@turf/area';

export default function (map, circleGeom) {
	let sizes = {};
	let sumSizes = 0;
	const landuse = map.queryRenderedFeatures({ layers: ['landuse'] });
	landuse.forEach(function (feature) {
		const intersection = intersect(circleGeom, feature.geometry);
		if (intersection) {
			const size = area(intersection);
			if (!sizes[feature.properties.bezeich]) {
				sizes[feature.properties.bezeich] = {};
				sizes[feature.properties.bezeich].m = size;
			} else {
				sizes[feature.properties.bezeich].m += size;
			}
			sumSizes += size;
		}
	});
	Object.keys(sizes).forEach(function (key) {
		sizes[key].p = (sizes[key].m / sumSizes) * 100;
	});

	return { sizes, sumSizes };
}
