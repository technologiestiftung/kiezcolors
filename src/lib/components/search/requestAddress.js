import { get } from "svelte/store";
export default function getAddress(filterText) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://nominatim.openstreetmap.org/search?viewbox=13.0648,52.7554,13.7796,52.33449&bounded=1&q=${filterText.toLowerCase()}&countrycodes=de&format=json`
    );
    xhr.send();

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // add the prop adressen to geocoding response
        const response = JSON.parse(xhr.response);

        setTimeout(resolve(response), 5000);
      } else {
        reject();
      }
    };
  });
}
