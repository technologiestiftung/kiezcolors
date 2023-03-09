import { c as create_ssr_component, a as subscribe, b as add_attribute, v as validate_component, e as escape, d as set_store_value, n as null_to_empty } from "../../chunks/index2.js";
import "maplibre-gl";
import { w as writable } from "../../chunks/index.js";
import destination from "@turf/destination";
import midpoint from "@turf/midpoint";
import distance from "@turf/distance";
import bboxPolygon from "@turf/bbox-polygon";
import intersect from "@turf/intersect";
import area from "@turf/area";
import within from "@turf/boolean-within";
import * as d3 from "d3";
import textures from "textures";
const maplibreGl = "";
let areaSizes = writable();
let circleRadius = writable();
let dimensions = writable([210 * 3, 148 * 3]);
let svg = writable();
let svgBack = writable();
let totalSize = writable(0);
let mapCenter = writable();
let showBasemap = writable(false);
let locationText = writable();
let useLocationAsText = writable(false);
let lang = writable("en");
let newBounds = writable();
let textVis = writable("My Kiezcolors Text");
let landuses = {
  AX_FlaecheBesondererFunktionalerPraegung: {
    category: "other",
    info: "Schulen, Museum",
    name: "Besondere funktionale Prägung",
    name_en: "Special functional characterization"
  },
  AX_IndustrieUndGewerbeflaeche: {
    category: "industry",
    info: "",
    name: "Industrie, Gewerbe",
    name_en: "Industry, commerce"
  },
  AX_FlaecheGemischterNutzung: {
    category: "other",
    info: "",
    name: "Gemischte Nutzung",
    name_en: "Mixed use"
  },
  AX_Heide: {
    category: "nature",
    info: "",
    name: "Heide",
    name_en: "Heath"
  },
  AX_Gehoelz: {
    category: "nature",
    info: "",
    name: "Gehölz",
    name_en: "Grove"
  },
  AX_Moor: {
    category: "nature",
    info: "",
    name: "Moor",
    name_en: "Moor"
  },
  AX_Sumpf: {
    category: "nature",
    info: "",
    name: "Sumpf",
    name_en: "Swamp"
  },
  AX_Wald: {
    category: "nature",
    info: "",
    name: "Wald",
    name_en: "Forest"
  },
  AX_Friedhof: {
    category: "nature",
    info: "",
    name: "Friedhof",
    name_en: "Cemetery"
  },
  AX_UnlandVegetationsloseFlaeche: {
    category: "nature",
    info: "",
    name: "Unland, Vegetationslose Fläche",
    name_en: "Wasteland, area without vegetation"
  },
  AX_Landwirtschaft: {
    category: "nature",
    info: "",
    name: "Landwirtschaft",
    name_en: "Farming"
  },
  AX_Fliessgewaesser: {
    category: "water",
    info: "",
    name: "Fliessgewässer",
    name_en: "Watercourse"
  },
  AX_Hafenbecken: {
    category: "water",
    info: "",
    name: "Hafenbecken",
    name_en: "Port basin"
  },
  AX_StehendesGewaesser: {
    category: "water",
    info: "",
    name: "Stehendes Gewässer",
    name_en: "Stagnant water"
  },
  AX_SportFreizeitUndErholungsflaeche: {
    category: "leisure",
    info: "",
    name: "Sport, Freizeit, Erholungsfläche",
    name_en: "Sports, leisure, recreational area"
  },
  AX_Platz: {
    category: "street",
    info: "",
    name: "Platz",
    name_en: "Square"
  },
  AX_Strassenverkehr: {
    category: "street",
    info: "",
    name: "Straßenverkehr",
    name_en: "Street traffic"
  },
  AX_Weg: {
    category: "street",
    info: "",
    name: "Weg",
    name_en: "Path"
  },
  AX_Wohnbauflaeche: {
    category: "living",
    info: "",
    name: "Wohnbau",
    name_en: "Residential"
  },
  AX_Halde: {
    category: "trash",
    info: "",
    name: "Halde",
    name_en: "Dump"
  },
  AX_Flugverkehr: {
    category: "transport",
    info: "",
    name: "Flugverkehr",
    name_en: "Air traffic"
  },
  AX_TagebauGrubeSteinbruch: {
    category: "industry",
    info: "",
    name: "Tagebau, Grube, Steinbruch",
    name_en: "Open pit, mine, quarry"
  },
  AX_Schiffsverkehr: {
    category: "transport",
    info: "",
    name: "Schiffsverkehr",
    name_en: "Shipping traffic"
  },
  AX_Bahnverkehr: {
    category: "transport",
    info: "",
    name: "Bahnverkehr",
    name_en: "Rail transport"
  }
};
let categories = {
  street: { color: "#292929", name: "street" },
  living: { color: "#cf4b56", name: "living" },
  trash: { color: "#89775c", name: "trash" },
  transport: { color: "#4d5759", name: "transport" },
  other: { color: "#9c6a74", name: "other" },
  water: { color: "#277da1", name: "water" },
  nature: { color: "#53935c", name: "nature" },
  industry: { color: "#f9c74f", name: "industry" },
  leisure: { color: "#a4ba72", name: "leisure" }
};
const landuseColors = [];
Object.keys(landuses).forEach((key) => {
  landuseColors.push(key);
  landuseColors.push(categories[landuses[key].category].color);
});
const Gecoder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_textVis;
  let $$unsubscribe_newBounds;
  $$unsubscribe_textVis = subscribe(textVis, (value) => value);
  $$unsubscribe_newBounds = subscribe(newBounds, (value) => value);
  let searchText = "";
  $$unsubscribe_textVis();
  $$unsubscribe_newBounds();
  return `

<div class="${"absolute z-50 top-2 bg-white "}" style="${"transform:translate(2%); width:96%"}"><div class="${"demo-icon icon-search absolute text-xl right-4 mt-1 cursor-pointer top-2"}"><svg id="${"submit"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"16"}" height="${"16"}" fill="${"currentColor"}" class="${""}" viewBox="${"0 0 16 16"}"><path d="${"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"}"></path></svg></div>

  <input autocomplete="${"off"}" autocorrect="${"off"}" spellcheck="${"false"}" placeholder="${"search..."}" class="${"h-10 w-full px-4 focus:border-white"}"${add_attribute("value", searchText, 0)}>

  <div class="${"listContainerWrapper z-50 w-full left-0 top-12"}">${``}</div>
</div>`;
});
function drawCanvasCirlce(map, canvas, circleRadius2) {
  const cooUp = destination(map.getCenter().toArray(), circleRadius2, 90, {
    units: "meters"
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
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 0.1;
  ctx.fill();
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
function getMaxCircleRadius(map) {
  const center = map.getCenter().toArray();
  const bbox = map.getBounds().toArray().flat();
  const bboxPoly = bboxPolygon(bbox);
  const bboxPolyCoordinates = bboxPoly.geometry.coordinates[0];
  const midPointHeight = midpoint(bboxPolyCoordinates[1], bboxPolyCoordinates[2]);
  const maxWidth = distance(midPointHeight, center) * 1e3;
  const midPointWidtht = midpoint(bboxPolyCoordinates[2], bboxPolyCoordinates[3]);
  const maxHeight = distance(midPointWidtht, center) * 1e3;
  const maxDistance = Math.min(maxHeight, maxWidth);
  let radius;
  if (maxDistance >= 1e3) {
    radius = 1e3;
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
function getLanduseSizes(map, circleGeom) {
  let sizes = {};
  let sumSizes = 0;
  const landuse = map.queryRenderedFeatures({ layers: ["landuse"] });
  landuse.forEach(function(feature) {
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
  Object.keys(sizes).forEach(function(key) {
    sizes[key].p = sizes[key].m / sumSizes * 100;
  });
  return { sizes, sumSizes };
}
function getCircleGeom(map, opt) {
  let points = [];
  for (let i = 0; i < opt.steps; i++) {
    const angle = 360 / opt.steps * i;
    const options = { units: "meters" };
    const cooUp = destination(map.getCenter().toArray(), opt.radius, angle, options).geometry.coordinates;
    points.push(cooUp);
  }
  points.push(points[0]);
  return {
    type: "Polygon",
    coordinates: [points]
  };
}
function checkCirleFits(map, cirlceGeom) {
  const bbox = map.getBounds().toArray();
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
  return within(cirlceGeom, bBoxGeoJSON);
}
const Map_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "#map.svelte-1hz8ni8{width:444px;height:630px}#myCanvas.svelte-1hz8ni8{z-index:10;pointer-events:none}",
  map: null
};
const Map = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $circleRadius, $$unsubscribe_circleRadius;
  let $locationText, $$unsubscribe_locationText;
  let $textVis, $$unsubscribe_textVis;
  let $useLocationAsText, $$unsubscribe_useLocationAsText;
  let $mapCenter, $$unsubscribe_mapCenter;
  let $totalSize, $$unsubscribe_totalSize;
  let $areaSizes, $$unsubscribe_areaSizes;
  let $newBounds, $$unsubscribe_newBounds;
  let $showBasemap, $$unsubscribe_showBasemap;
  $$unsubscribe_circleRadius = subscribe(circleRadius, (value) => $circleRadius = value);
  $$unsubscribe_locationText = subscribe(locationText, (value) => $locationText = value);
  $$unsubscribe_textVis = subscribe(textVis, (value) => $textVis = value);
  $$unsubscribe_useLocationAsText = subscribe(useLocationAsText, (value) => $useLocationAsText = value);
  $$unsubscribe_mapCenter = subscribe(mapCenter, (value) => $mapCenter = value);
  $$unsubscribe_totalSize = subscribe(totalSize, (value) => $totalSize = value);
  $$unsubscribe_areaSizes = subscribe(areaSizes, (value) => $areaSizes = value);
  $$unsubscribe_newBounds = subscribe(newBounds, (value) => $newBounds = value);
  $$unsubscribe_showBasemap = subscribe(showBasemap, (value) => $showBasemap = value);
  let map;
  function setBounds(b) {
    if (!b || !map)
      return;
    console.log(b);
    map.setCenter(b);
  }
  const drawAndCount = function(map2) {
    if (!map2 || !map2.getLayer("landuse"))
      return;
    const mC = map2.getCenter().toArray();
    set_store_value(mapCenter, $mapCenter = [mC[0].toFixed(4), mC[1].toFixed(4)], $mapCenter);
    const canvas = document.getElementById("myCanvas");
    let carCountingEnabled = map2.getZoom() >= 10;
    set_store_value(circleRadius, $circleRadius = getMaxCircleRadius(map2), $circleRadius);
    let circleGeom = getCircleGeom(map2, { radius: $circleRadius, steps: 30 });
    let circleFits = checkCirleFits(map2, circleGeom);
    if (!circleFits || !carCountingEnabled) {
      const { width, height } = map2.getContainer().getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const { sizes, sumSizes } = getLanduseSizes(map2, circleGeom);
    set_store_value(areaSizes, $areaSizes = sizes, $areaSizes);
    set_store_value(totalSize, $totalSize = sumSizes, $totalSize);
    set_store_value(locationText, $locationText = "Lat " + $mapCenter[1] + " N, Lng " + $mapCenter[0] + " E", $locationText);
    if ($useLocationAsText) {
      set_store_value(textVis, $textVis = $locationText, $textVis);
    }
    drawCanvasCirlce(map2, canvas, $circleRadius);
  };
  $$result.css.add(css$1);
  {
    drawAndCount(map);
  }
  {
    setBounds($newBounds);
  }
  $$unsubscribe_circleRadius();
  $$unsubscribe_locationText();
  $$unsubscribe_textVis();
  $$unsubscribe_useLocationAsText();
  $$unsubscribe_mapCenter();
  $$unsubscribe_totalSize();
  $$unsubscribe_areaSizes();
  $$unsubscribe_newBounds();
  $$unsubscribe_showBasemap();
  return `<div id="${"map"}" class="${"border-2 w-fit svelte-1hz8ni8"}">${validate_component(Gecoder, "Geocoder").$$render($$result, {}, {}, {})}

  <button class="${"rounded-full absolute right-2 top-14 h-10 w-10 text-center cursor-pointer text-xl leading-7 hover:bg-gray-300 z-40 bg-white"}">+
  </button>
  <button class="${"rounded-full absolute right-2 top-24 mt-2 h-10 w-10 text-center cursor-pointer text-xl leading-7 hover:bg-gray-300 z-40 bg-white"}">-
  </button>

  <div class="${"absolute right-2 bottom-8 z-50 "}">Radius: ${escape($circleRadius)}m</div>

  <div class="${"absolute right-2 bottom-2 z-50 "}">${$showBasemap ? `©
      <a target="${"_blank"}" rel="${"noreferrer"}" href="${"https://www.openstreetmap.org/copyright"}">OpenStreetMap
      </a>
      contributors © |` : ``}

    Geoportal Berlin / ALKIS Berlin
  </div>
  <label class="${"absolute right-2 bottom-14 z-50"}"><input type="${"checkbox"}" class="${"mt-4"}"${add_attribute("checked", $showBasemap, 1)}>
    Show Basemap
  </label>

  <canvas id="${"myCanvas"}" class="${"absolute svelte-1hz8ni8"}"></canvas>
</div>`;
});
const Tree = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $svg, $$unsubscribe_svg;
  let $textVis, $$unsubscribe_textVis;
  let $areaSizes, $$unsubscribe_areaSizes;
  let $dimensions, $$unsubscribe_dimensions;
  $$unsubscribe_svg = subscribe(svg, (value) => $svg = value);
  $$unsubscribe_textVis = subscribe(textVis, (value) => $textVis = value);
  $$unsubscribe_areaSizes = subscribe(areaSizes, (value) => $areaSizes = value);
  $$unsubscribe_dimensions = subscribe(dimensions, (value) => $dimensions = value);
  const width = $dimensions[1], height = $dimensions[0];
  let visWrapper;
  function dataUpdated(size) {
    if (!size)
      return;
    const treeChildren = [];
    Object.keys(categories).forEach((keyCategories) => {
      const child = {};
      child.name = categories[keyCategories].name;
      child.children = [];
      Object.keys(landuses).forEach((keyLanduses) => {
        if (keyCategories === landuses[keyLanduses].category) {
          if (!size[keyLanduses]) {
            return;
          }
          if (Math.round(size[keyLanduses].p) < 1) {
            return;
          }
          child.children.push({
            name: keyCategories,
            size: size[keyLanduses]?.p || 0,
            color: categories[keyCategories].color
          });
        }
      });
      treeChildren.push(child);
    });
    const data = { children: treeChildren };
    redraw(data);
  }
  function redraw(data) {
    if ($svg) {
      $svg.remove();
    }
    set_store_value(svg, $svg = d3.select(visWrapper).append("svg").attr("width", width).attr("height", height).attr("xmlns", "http://www.w3.org/2000/svg"), $svg);
    const rect = $svg.append("rect");
    rect.attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "#f9f9f9");
    textures.lines().thicker();
    let treemap = d3.treemap().tile(d3.treemapBinary).size([width, height - 120]).round(true).paddingInner(6);
    const root = d3.hierarchy(data);
    treemap(root.sum(sumByCount));
    let cell = $svg.selectAll("g").data(root.leaves()).enter().append("g").attr("transform", function(d) {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });
    cell.append("rect").attr("id", function(d) {
    }).attr("width", function(d) {
      return d.x1 - d.x0;
    }).attr("height", function(d) {
      return d.y1 - d.y0;
    }).attr("fill", function(d) {
      return d.data.color;
    });
    $svg.selectAll("text").data([$textVis]).enter().append("text").attr("transform", "translate(" + width / 2 + "," + height * 0.91 + ")").attr("text-anchor", "middle").attr("font-family", "Outfit").attr("font-size", 30).attr("fill", "#292929").text(function(d) {
      return d;
    });
    $svg.append("text").attr("transform", "translate(" + width / 2 + "," + height * 0.95 + ")").attr("text-anchor", "middle").attr("font-family", "IBM Plex Mono").attr("font-size", 10).attr("fill", "#277da1").text("Made with Open Data");
    function sumByCount(d) {
      return d.size;
    }
  }
  {
    dataUpdated($areaSizes);
  }
  $$unsubscribe_svg();
  $$unsubscribe_textVis();
  $$unsubscribe_areaSizes();
  $$unsubscribe_dimensions();
  return `


<main class="${"w-fit"}"${add_attribute("this", visWrapper, 0)}></main>`;
});
const Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $svgBack, $$unsubscribe_svgBack;
  let $locationText, $$unsubscribe_locationText;
  let $lang, $$unsubscribe_lang;
  let $circleRadius, $$unsubscribe_circleRadius;
  let $areaSizes, $$unsubscribe_areaSizes;
  let $dimensions, $$unsubscribe_dimensions;
  $$unsubscribe_svgBack = subscribe(svgBack, (value) => $svgBack = value);
  $$unsubscribe_locationText = subscribe(locationText, (value) => $locationText = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  $$unsubscribe_circleRadius = subscribe(circleRadius, (value) => $circleRadius = value);
  $$unsubscribe_areaSizes = subscribe(areaSizes, (value) => $areaSizes = value);
  $$unsubscribe_dimensions = subscribe(dimensions, (value) => $dimensions = value);
  let visWrapper;
  const width = $dimensions[1], height = $dimensions[0];
  function redraw() {
    if ($svgBack) {
      $svgBack.remove();
    }
    if (!$areaSizes)
      return;
    set_store_value(svgBack, $svgBack = d3.select(visWrapper).append("svg").attr("encoding", "UTF-8").attr("version", "1.0").attr("width", width).attr("height", height).attr("xmlns", "http://www.w3.org/2000/svg"), $svgBack);
    const rect = $svgBack.append("rect");
    rect.attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "#f9f9f9");
    let sizeKeys = JSON.parse(JSON.stringify($areaSizes));
    sizeKeys = Object.keys($areaSizes).filter((key) => {
      if (Math.round($areaSizes[key].p) < 1) {
        return false;
      } else {
        return key;
      }
    });
    sizeKeys = sizeKeys.sort(function compareFn(a, b) {
      return $areaSizes[b].p - $areaSizes[a].p;
    });
    const textGroup = $svgBack.append("g");
    let xPositionRect = 20;
    textGroup.selectAll(".rect-legend").data(...[sizeKeys]).enter().append("rect").attr("classs", "rect-legend").attr("width", 20).attr("height", 20).attr("fill", function(d, i) {
      return categories[landuses[d].category].color;
    }).attr("transform", function(d, i) {
      if (i != 0) {
        xPositionRect += 24;
      }
      return "translate(" + 20 + "," + xPositionRect + ")";
    });
    let xPositionText = 12;
    textGroup.selectAll(".text-legend").data(sizeKeys).enter().append("text").attr("classs", "text-legend").attr("transform", function(d, i) {
      xPositionText += 24;
      return "translate(" + 45 + "," + xPositionText + ")";
    }).attr("text-anchor", "start").attr("font-family", "Outfit").attr("font-size", 14).attr("fill", "#292929").html(function(key) {
      return Math.round($areaSizes[key].p) + "% " + ($lang === "en" ? landuses[key].name_en : landuses[key].name);
    });
    const textLocation = $circleRadius + "m " + ($lang === "en" ? "around " : "um ") + $locationText;
    const textData = "Data: Geoportal Berlin / ALKIS Berlin";
    const textMaptime = "Maptime Berlin / Open Data Day 2023";
    const textUrl = "kiezcolors.odis-berlin.de";
    let dy = 0;
    $svgBack.append("text").attr("transform", "translate(" + (width - 20) + "," + height * 0.85 + ")").attr("text-anchor", "end").attr("font-family", "Outfit").attr("font-size", 12).attr("fill", "#292929").selectAll(".rect-legend").data([textLocation, textData, textMaptime, textUrl]).enter().append("tspan").attr("x", 0).attr("y", 0).attr("dy", function() {
      dy = dy + 1.5;
      return dy + "em";
    }).text(function(d) {
      return d;
    });
  }
  {
    redraw();
  }
  $$unsubscribe_svgBack();
  $$unsubscribe_locationText();
  $$unsubscribe_lang();
  $$unsubscribe_circleRadius();
  $$unsubscribe_areaSizes();
  $$unsubscribe_dimensions();
  return `<div class="${"w-fit"}"${add_attribute("this", visWrapper, 0)}></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '#nav.svelte-w2b6um{width:444px}.ibm.svelte-w2b6um{font-family:"IBM Plex Mono"}',
  map: null
};
const btnClasses = "border px-2 py-1 mr-2 hover:pointer-cursor hover:bg-gray-100";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dimensions, $$unsubscribe_dimensions;
  let $textVis, $$unsubscribe_textVis;
  let $useLocationAsText, $$unsubscribe_useLocationAsText;
  let $lang, $$unsubscribe_lang;
  let $$unsubscribe_svg;
  let $$unsubscribe_svgBack;
  $$unsubscribe_dimensions = subscribe(dimensions, (value) => $dimensions = value);
  $$unsubscribe_textVis = subscribe(textVis, (value) => $textVis = value);
  $$unsubscribe_useLocationAsText = subscribe(useLocationAsText, (value) => $useLocationAsText = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  $$unsubscribe_svg = subscribe(svg, (value) => value);
  $$unsubscribe_svgBack = subscribe(svgBack, (value) => value);
  $dimensions[1];
  $dimensions[0];
  $$result.css.add(css);
  $$unsubscribe_dimensions();
  $$unsubscribe_textVis();
  $$unsubscribe_useLocationAsText();
  $$unsubscribe_lang();
  $$unsubscribe_svg();
  $$unsubscribe_svgBack();
  return `${$$result.head += `<!-- HEAD_svelte-80kcdw_START -->${$$result.title = `<title>Kiezcolors</title>`, ""}<meta name="${"description"}" content="${"A map based tool to create a postcard showing the landuse distribution in your neighborhood"}"><!-- HEAD_svelte-80kcdw_END -->`, ""}

<div class="${"flex mt-8 flex-wrap justify-evenly text-4xl"}">Kiezcolors</div>


<p class="${"ibm flex mt-4 flex-wrap justify-evenly px-6 md:px-10 svelte-w2b6um"}">Move the map of Berlin to create a postcard showing the landuse distribution
  in your neighborhood.
</p>
<section class="${"flex m-4 mt-0 flex-wrap justify-evenly"}"><span class="${"m-2"}"><span class="${"text-center w-full inline-block my-4"}">Map</span>${validate_component(Map, "Map").$$render($$result, {}, {}, {})}</span>
  <span class="${"m-2"}"><span class="${"text-center w-full inline-block my-4"}">Postcard front</span>${validate_component(Tree, "Tree").$$render($$result, {}, {}, {})}</span>
  <span class="${"m-2"}"><span class="${"text-center w-full inline-block my-4"}">Postcard back</span>${validate_component(Text, "Text").$$render($$result, {}, {}, {})}</span>

  <div class="${"m-2 svelte-w2b6um"}" id="${"nav"}"><span class="${"text-center w-full inline-block my-4"}">Edit &amp; Download</span>
    <span class="${"border p-4 inline-block w-full"}"><input type="${"text"}" class="${"mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-secondary focus:border-secondary block w-full p-2.5"}"${add_attribute("value", $textVis, 0)}>
      <label class="${""}"><input type="${"checkbox"}" class="${"mt-4"}"${add_attribute("checked", $useLocationAsText, 1)}>
        use location as Text
      </label>
      <div class="${"mt-2 w-full"}"><span class="${"mr-2"}">Language</span>
        <label><input type="${"radio"}"${add_attribute("value", "de", 0)}${"de" === $lang ? add_attribute("checked", true, 1) : ""}>
          DE
        </label>
        <label><input type="${"radio"}"${add_attribute("value", "en", 0)}${"en" === $lang ? add_attribute("checked", true, 1) : ""}>
          EN
        </label></div>

      <div class="${"mt-4 mb-2"}">Download</div>
      <span class="${"mr-4"}"><span class="${"w-10 inline-block"}">SVG</span>
        <button class="${escape(null_to_empty(btnClasses), true) + " svelte-w2b6um"}">Front</button>
        <button class="${escape(null_to_empty(btnClasses), true) + " svelte-w2b6um"}">Back</button></span>

      <span class="${"w-10 inline-block"}">PNG</span>
      <button class="${escape(null_to_empty(btnClasses), true) + " svelte-w2b6um"}">Front</button>
      <button class="${escape(null_to_empty(btnClasses), true) + " svelte-w2b6um"}">Back</button>

      </span></div></section>

<footer class="${"flex mt-4 flex-wrap justify-evenly p-6 md:p-10 pt-20"}"><p>Kiezcolors was developed by ODIS and CityLAB Berlin. ODIS is a project by
    the Technologiestiftung Berlin and is funded by the Berlin Senate Department
    for the Interior, Digitization and Sports.
  </p>

  <div style="${"text-align:center;margin-top:20px"}" class="${"flex"}"><a style="${"margin:10px"}" href="${"https://odis-berlin.de"}"><img width="${"200"}" src="${"https://logos.citylab-berlin.org/logo-odis-berlin.svg"}"></a>
    <a style="${"margin:10px"}" href="${"https://www.technologiestiftung-berlin.de/"}"><img width="${"150"}" src="${"https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg"}"></a>
    <a style="${"margin:10px"}" href="${"https://www.berlin.de/sen/inneres/"}"><img width="${"100"}" src="${"https://logos.citylab-berlin.org/logo-berlin-seninnds-de.svg"}"></a>
    <a style="${"margin:10px"}" href="${"https://citylab-berlin.org/de/start/"}"><img width="${"200"}" src="${"https://logos.citylab-berlin.org/logo-citylab-berlin.svg"}"></a></div>
</footer>`;
});
export {
  Page as default
};
