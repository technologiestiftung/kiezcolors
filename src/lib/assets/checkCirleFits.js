import within from "@turf/boolean-within";

export default function (map, cirlceGeom) {


    const bbox = map.getBounds().toArray()
    
    const bBoxGeoJSON = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
            bbox[0],
              [
                bbox[1][0],
                bbox[0][1]
              ],
              bbox[1],
              [
                bbox[0][0],
                bbox[1][1]
              ],
              bbox[0]
            ]
          ]
        }
      };

      return  within(cirlceGeom,bBoxGeoJSON); 

    
}
