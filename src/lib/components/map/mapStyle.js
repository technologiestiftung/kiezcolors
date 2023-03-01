import { landuses, categories } from '$lib/stores.js';

const landuseColors = [];

Object.keys(landuses).forEach((key) => {
	landuseColors.push(key);
	landuseColors.push(categories[landuses[key].category].color);
});

export default function (location) {
	return {
		version: 8,
		name: 'orthoPhotos',
		metadata: {},
		transition: {
			duration: 3500,
			delay: 0
		},
		sources: {
			osm: {
				type: 'raster',
				// tiles: ['https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'],
				// https://api.maptiler.com/maps/4fd1f229-6a31-459c-9fca-54a34787b610/?key=6m5QqJw5xV46eDXJW1ZD#
				tiles: ['https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'],
				tileSize: 256,
				attribution:
					"&copy; <a target='_blank' href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a target='_blank' href='https://carto.com/attributions'>CARTO</a>"
			},
			'landuse-source': {
				type: 'vector',
				tiles: [location + 'tiles/{z}/{x}/{y}.pbf'],
				minzoom: 10,
				maxzoom: 13
				// bounds: [5.625, 47.309, 15.6, 55.354]
			}
			// ,
			// 'borders-source': {
			// 	type: 'vector',
			// 	tiles: [window.location.origin + window.location.pathname + 'data/tiles/{z}/{x}/{y}.pbf'],
			// 	minzoom: 0,
			// 	maxzoom: 7
			// }
		},
		layers: [
			{
				id: 'background',
				type: 'background',
				paint: {
					'background-color': '#ccc'
				}
			},
			{
				id: 'landuse',
				type: 'fill',
				source: 'landuse-source',
				'source-layer': 'alkis',
				maxzoom: 24,
				paint: {
					'fill-opacity': 1,
					'fill-color': ['match', ['string', ['get', 'bezeich']], ...landuseColors, '#fff']
				}
			},

			// {
			// 	id: 'landuse-red',
			// 	type: 'fill',
			// 	source: 'landuse-source',
			// 	'source-layer': 'fleachen',
			// 	maxzoom: 24,
			// 	paint: {
			// 		'fill-opacity': 0.5,
			// 		'fill-color': 'red'
			// 	},
			//     filter:[]
			// },
			{
				id: 'landuse-line',
				type: 'line',
				source: 'landuse-source',
				'source-layer': 'fleachen',
				maxzoom: 24,
				paint: {
					'line-opacity': 0.5,
					'line-color': '#000000'
				}
			},
			{
				id: 'osm',
				type: 'raster',
				source: 'osm',
				layout: {
					visibility: 'none' // visible
				},
				paint: {
					'raster-saturation': -1,
					'raster-contrast': 0.1,
					'raster-opacity': 0.7
				},
				minzoom: 0
			}
		]
		// ,
		// glyphs: '/font/webfont/{fontstack}/{range}.pbf',
		// sprite: window.location.origin + '/sprite/sprite.json',
	};
}
