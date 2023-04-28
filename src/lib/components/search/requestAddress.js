import { get } from 'svelte/store';
import { dataAkteurin } from '$lib/stores';

export default function getAddress(filterText) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(
			'GET',
			`https://nominatim.openstreetmap.org/search?viewbox=13.353,52.530,13.488,52.479&bounded=1&q=${filterText.toLowerCase()}&countrycodes=de&format=json`
		);
		xhr.send();

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				const pointDataFromStore = get(dataAkteurin);

				// add the prop adressen to geocoding response
				const response = JSON.parse(xhr.response);
				response.forEach((element) => {
					element.group = 'ADRESSEN';
					element.markerId = element.osm_id;
					delete element.osm_id;
				});

				const akteurFilterText = filterText.toLowerCase().trim();

				if (akteurFilterText) {
					const filteredAkteurinnen = [];
					pointDataFromStore.features.forEach((a) => {
						const props = a.properties;
						const coo = a.geometry.coordinates;
						if (props.type === 'akteurin' && props.name.toLowerCase().includes(akteurFilterText)) {
							filteredAkteurinnen.push({
								markerId: props.markerId,
								lat: coo[1],
								lon: coo[0],
								display_name: props.name,
								group: 'AKTEUR:INNEN'
							});
						}
					});
					response.unshift(...filteredAkteurinnen);
				}

				setTimeout(resolve(response), 5000);
			} else {
				reject();
			}
		};
	});
}
