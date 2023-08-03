import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, e as escape, v as validate_component, f as set_store_value, o as onDestroy, h as createEventDispatcher, i as spread, j as escape_object, k as escape_attribute_value, l as compute_slots } from "../../chunks/index2.js";
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
import "textures";
import chroma from "chroma-js";
import { computePosition, autoUpdate, offset, flip, shift } from "@floating-ui/dom";
const maplibreGl = "";
let areaSizes = writable();
let circleRadius = writable();
let dimensions = writable([210 * 3, 148 * 3]);
let svg = writable();
let totalSize = writable(0);
let mapCenter = writable();
let showBasemap = writable(false);
let locationText = writable();
let useLocationAsText = writable(true);
let lang = writable("de");
let newBounds = writable();
let printBackUI = writable(true);
let isMobile = writable(true);
let screenWidth = writable(0);
let textVis = writable("");
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
    category: "trash",
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
  street: { color: "#292929", name_en: "Street", name: "Straßenverkehr" },
  living: { color: "#cf4b56", name_en: "Living", name: "Wohnen" },
  transport: { color: "#4d5759", name_en: "Transport", name: "Verkehr" },
  water: { color: "#277da1", name_en: "Water", name: "Wasser" },
  nature: { color: "#53935c", name_en: "Nature", name: "Natur" },
  industry: { color: "#f9c74f", name_en: "Economy", name: "Wirtschaft" },
  leisure: { color: "#a4ba72", name_en: "Leisure", name: "Freizeit" },
  trash: {
    color: "#89775c",
    name_en: "Trash, Open pit",
    name: "Halde, Tagebau"
  },
  other: { color: "#9c6a74", name_en: "Other", name: "Andere" }
};
const landuseColors = [];
Object.keys(landuses).forEach((key) => {
  landuseColors.push(key);
  landuseColors.push(categories[landuses[key].category].color);
});
const MapKey = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isMobile, $$unsubscribe_isMobile;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  $$unsubscribe_isMobile();
  $$unsubscribe_lang();
  return `<div class="${[
    "z-50 absolute pointer-events-auto inline-block mx-2",
    ($isMobile ? "relative" : "") + " " + (!$isMobile ? "bottom-4" : "") + " " + ($isMobile ? "my-8" : "")
  ].join(" ").trim()}"${add_attribute("style", $isMobile ? "" : "max-width:calc(100% - 250px)", 0)}>${each(Object.values(categories), ({ color, name, name_en }, i) => {
    return `<div class="${"inline-block align-middle"}"><div class="${"w-4 h-4 rounded-full ml-2 inline-block"}"${add_attribute("style", `background-color:${color}`, 0)}></div>
      <p class="${"align-middle leading-4 ml-1 inline-block mb-2"}">${escape($lang === "de" ? name : name_en)}</p>
    </div>`;
  })}</div>`;
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
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.strokeStyle = "rgba(255,255,255,0)";
  ctx.lineWidth = 0.1;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, true);
  ctx.strokeStyle = "rgba(255,255,255,1)";
  ctx.lineWidth = 2;
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
function getLanduseSizes(map, circleGeom, landuses2) {
  let sizes = {};
  let sumSizes = 0;
  const landuse = map.queryRenderedFeatures({ layers: ["landuse"] });
  landuse.forEach(function(feature) {
    const intersection = intersect(circleGeom, feature.geometry);
    if (intersection) {
      const size = area(intersection);
      const category = landuses2[feature.properties.bezeich].category;
      if (!sizes[category]) {
        sizes[category] = {};
        sizes[category].m = size;
      } else {
        sizes[category].m += size;
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
const css$6 = {
  code: "#myCanvas.svelte-1dfwv1l{z-index:10;pointer-events:none}",
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
  let $isMobile, $$unsubscribe_isMobile;
  let $newBounds, $$unsubscribe_newBounds;
  let $showBasemap, $$unsubscribe_showBasemap;
  $$unsubscribe_circleRadius = subscribe(circleRadius, (value) => $circleRadius = value);
  $$unsubscribe_locationText = subscribe(locationText, (value) => $locationText = value);
  $$unsubscribe_textVis = subscribe(textVis, (value) => $textVis = value);
  $$unsubscribe_useLocationAsText = subscribe(useLocationAsText, (value) => $useLocationAsText = value);
  $$unsubscribe_mapCenter = subscribe(mapCenter, (value) => $mapCenter = value);
  $$unsubscribe_totalSize = subscribe(totalSize, (value) => $totalSize = value);
  $$unsubscribe_areaSizes = subscribe(areaSizes, (value) => $areaSizes = value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
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
    set_store_value(mapCenter, $mapCenter = [mC[0].toFixed(3), mC[1].toFixed(3)], $mapCenter);
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
    const { sizes, sumSizes } = getLanduseSizes(map2, circleGeom, landuses);
    set_store_value(areaSizes, $areaSizes = sizes, $areaSizes);
    set_store_value(totalSize, $totalSize = sumSizes, $totalSize);
    set_store_value(locationText, $locationText = "Lat " + $mapCenter[1] + " N, Lng " + $mapCenter[0] + " E", $locationText);
    if ($useLocationAsText) {
      set_store_value(textVis, $textVis = $locationText, $textVis);
    }
    drawCanvasCirlce(map2, canvas, $circleRadius);
  };
  $$result.css.add(css$6);
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
  $$unsubscribe_isMobile();
  $$unsubscribe_newBounds();
  $$unsubscribe_showBasemap();
  return `<div id="${"map"}" class="${"w-full h-1/2 lg:h-screen !absolute left-0 z-0"}"><canvas id="${"myCanvas"}" class="${"absolute svelte-1dfwv1l"}"></canvas></div>

<div class="${"relative w-full h-full pointer-events-none"}">${!$isMobile ? `${validate_component(MapKey, "MapKey").$$render($$result, {}, {}, {})}` : ``}
  <button class="${"btn btn-primary drop-shadow-xl text-2xl btn-circle absolute left-4 top-4 leading-7 z-40 pointer-events-auto "}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"26"}" height="${"26"}" fill="${"currentColor"}" class="${"bi bi-plus"}" viewBox="${"0 0 16 16"}"><path d="${"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"}"></path></svg></button>
  <button class="${"btn btn-primary drop-shadow-xl text-2xl btn-circle absolute left-4 top-10 mt-8 leading-7 z-40 pointer-events-auto"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"26"}" height="${"26"}" fill="${"currentColor"}" class="${"bi bi-dash"}" viewBox="${"0 0 16 16"}"><path d="${"M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"}"></path></svg></button>

  <div class="${"absolute right-2 bottom-8 z-50 text-md"}">Radius: ${escape($circleRadius)}m
  </div>

  <div class="${"absolute right-2 bottom-2 z-50 text-md"}">${$showBasemap ? `©
      <a target="${"_blank"}" rel="${"noreferrer"}" href="${"https://www.openstreetmap.org/copyright"}">OpenStreetMap
      </a>
      contributors © |` : ``}

    Geoportal Berlin / ALKIS Berlin
  </div>

  <div class="${"absolute right-0 bottom-12 z-50 form-control w-fit pointer-events-auto"}"><label class="${"cursor-pointer label"}"><span class="${"mx-2 text-md"}">Basemap</span>
      <input type="${"checkbox"}" class="${"toggle toggle-primary"}"${add_attribute("checked", $showBasemap, 1)}></label></div>
</div>`;
});
const PostcardFront_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: '.bold.svelte-hlq8ce{font-family:"IBM Plex Sans Bold"}',
  map: null
};
function sumByCount(d) {
  return d.size;
}
const PostcardFront = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $svg, $$unsubscribe_svg;
  let $textVis, $$unsubscribe_textVis;
  let $isMobile, $$unsubscribe_isMobile;
  let $areaSizes, $$unsubscribe_areaSizes;
  let $dimensions, $$unsubscribe_dimensions;
  let $screenWidth, $$unsubscribe_screenWidth;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_svg = subscribe(svg, (value) => $svg = value);
  $$unsubscribe_textVis = subscribe(textVis, (value) => $textVis = value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_areaSizes = subscribe(areaSizes, (value) => $areaSizes = value);
  $$unsubscribe_dimensions = subscribe(dimensions, (value) => $dimensions = value);
  $$unsubscribe_screenWidth = subscribe(screenWidth, (value) => $screenWidth = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let treemap;
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
      if (!size[keyCategories]) {
        return;
      }
      if (Math.round(size[keyCategories].p) < 1) {
        return;
      }
      child.children.push({
        name: keyCategories,
        size: size[keyCategories]?.p || 0,
        color: categories[keyCategories].color
      });
      treeChildren.push(child);
    });
    const data = { children: treeChildren };
    redraw(data);
  }
  function updateText(newText) {
    if (!$svg) {
      return;
    }
    $svg.selectAll(".title-text").data([newText]).text(function(d) {
      return d;
    });
  }
  function redraw(data) {
    if ($svg) {
      $svg.remove();
    }
    const t = d3.transition().duration(1e3);
    set_store_value(svg, $svg = d3.select(visWrapper).append("svg").attr("width", width).attr("height", height).attr("xmlns", "http://www.w3.org/2000/svg").attr("class", "inline " + ($isMobile ? "border" : "")), $svg);
    const rect = $svg.append("rect");
    rect.attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "#fff");
    treemap = d3.treemap().tile(d3.treemapBinary).size([width, height - 120]).round(true).paddingOuter(4);
    const root = d3.hierarchy(data);
    treemap(root.sum(sumByCount));
    let cell = $svg.selectAll("g").data(root.leaves()).enter().append("g").attr("transform", function(d) {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });
    $svg.selectAll(".title-text").data([$textVis]).enter().append("text").attr("class", "title-text").attr("transform", "translate(" + width / 2 + "," + height * 0.91 + ")").attr("text-anchor", "middle").attr("font-family", "IBM Plex Sans Bold").attr("font-size", 30).attr("fill", "#292929").text(function(d) {
      return d;
    });
    cell.append("rect").attr("id", function(d) {
    }).attr("width", function(d) {
      return d.x1 - d.x0;
    }).attr("height", function(d) {
      return d.y1 - d.y0;
    }).attr("fill", function(d) {
      return d.data.color;
    }).style("opacity", 0).transition(t).style("opacity", 1);
    cell.append("text").attr("x", function(d) {
      return d.x1 - d.x0 - 5;
    }).attr("y", function(d) {
      return d.y1 - d.y0 - 10;
    }).attr("text-anchor", "end").attr("font-family", "IBM Plex Sans Text").attr("font-size", 12).text(function(d) {
      const w = d.x1 - d.x0;
      const h = d.y1 - d.y0;
      if (w < 30 || h < 30)
        return;
      return Math.round(d.data.size).toString() + "%";
    }).attr("fill", function(d) {
      if (d.data.color) {
        if (d.data.name === "street" || d.data.name === "transport") {
          return chroma(d.data.color).brighten(1).hex();
        } else {
          return chroma(d.data.color).darken(1).hex();
        }
      }
    }).style("opacity", 0).transition(t).style("opacity", 1);
    $svg.append("text").attr("transform", "translate(" + width / 2 + "," + height * 0.95 + ")").attr("text-anchor", "middle").attr("font-family", "IBM Plex Sans Bold").attr("font-size", 10).attr("fill", "#2f2fa2").text("Viele Grüße vom CityLAB Kiezlabor");
  }
  $$result.css.add(css$5);
  {
    dataUpdated($areaSizes);
  }
  {
    updateText($textVis);
  }
  $$unsubscribe_svg();
  $$unsubscribe_textVis();
  $$unsubscribe_isMobile();
  $$unsubscribe_areaSizes();
  $$unsubscribe_dimensions();
  $$unsubscribe_screenWidth();
  $$unsubscribe_lang();
  return `


<div${add_attribute(
    "class",
    $isMobile ? "mx-4 pt-10 text-center" : "absolute border right-16 z-40 drop-shadow-xl",
    0
  )}${add_attribute(
    "style",
    $screenWidth <= 500 ? `transform-origin: top left; transform:scale(${($screenWidth - 50) / 444}); height: ${630 * ($screenWidth - 0) / 444}px;` : "",
    0
  )}><main class="${"w-full text-center"}"${add_attribute("this", visWrapper, 0)}></main>

  <input type="${"text"}"${add_attribute("placeholder", $lang === "de" ? "Dein Text hier" : "Your text here", 0)} class="${[
    "input text-center absolute bottom-10 text-[30px] bold svelte-hlq8ce",
    ($screenWidth <= 444 ? `` : "w-full") ? "w-full" : ""
  ].join(" ").trim()}"${add_attribute(
    "style",
    $isMobile ? `position: relative; bottom: 90px;  width:440px` : "",
    0
  )}${add_attribute("value", $textVis, 0)}>
</div>`;
});
const LogoCityLab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 872 175"}" version="${"1.1"}"><title>Group</title><desc>Created with Sketch.</desc><g id="${"Page-1"}" stroke="${"none"}" stroke-width="${"1"}" fill="${"none"}" fill-rule="${"evenodd"}"><g id="${"citylab-logo"}" transform="${"translate(-58.000000, -413.000000)"}"><g id="${"Group"}" transform="${"translate(58.000000, 413.000000)"}"><path d="${"M273.878618,99.7743212 C268.258397,109.4728 261.076012,114.269406 246.9194,114.269406 C230.058737,114.269406 218.4,102.588727 218.4,82.1490285 C218.4,61.7093296 229.537355,50.3424658 248.792807,50.3424658 C261.908638,50.3424658 269.923648,56.2870794 274.4,66.1941066 L259.202605,73.5985568 C257.537355,67.8624913 254.93441,64.2138929 248.376494,64.2138929 C239.737015,64.2138929 234.43002,71.0959798 234.43002,82.5661246 C234.43002,93.8297076 239.217615,100.397979 248.792807,100.397979 C253.685472,100.397979 258.058737,97.5835732 260.243387,91.9527748 L273.878618,99.7743212 Z"}" id="${"Fill-1"}" fill="${"#2F2FA2"}"></path><path d="${"M282.238876,113.47032 L297.451814,113.47032 L297.451814,65.4333996 L282.238876,65.4333996 L282.238876,113.47032 Z M289.846324,42.3515982 C295.190722,42.3515982 299.2,45.1595936 299.2,50.9835107 C299.2,56.5975213 295.190722,59.5084897 289.846324,59.5084897 C284.913033,59.5084897 280.8,56.5975213 280.8,50.9835107 C280.8,45.1595936 284.913033,42.3515982 289.846324,42.3515982 L289.846324,42.3515982 Z"}" id="${"Fill-3"}" fill="${"#2F2FA2"}"></path><path d="${"M344,111.030374 C339.631462,113.226868 334.43318,114.269406 328.195241,114.269406 C318.42049,114.269406 311.766689,109.77694 311.766689,98.078223 L311.766689,76.664398 L304.8,76.664398 L304.8,64.7527963 L311.869664,64.7527963 L311.869664,54.5164189 L327.25856,52.739726 L327.25856,64.7527963 L341.504824,64.7527963 L341.504824,76.664398 L327.155585,76.664398 L327.155585,94.5248372 C327.155585,99.5405626 329.131922,101.10835 332.874686,101.10835 C335.888699,101.10835 338.593786,99.9583739 341.399869,97.9747649 L344,111.030374 Z"}" id="${"Fill-5"}" fill="${"#2F2FA2"}"></path><path d="${"M368.953618,85.2968043 C371.562766,94.7436503 372.085789,101.040215 372.085789,101.040215 L372.503411,101.040215 C372.503411,101.040215 373.024445,94.6377081 375.844393,85.2968043 L382.110724,64.7260274 L398.4,64.7260274 L378.873153,117.623168 C373.235246,132.840865 366.447881,135.045662 356.005324,135.045662 C353.081964,135.045662 349.635582,134.519949 346.921034,133.892291 L349.323359,120.03785 C351.097262,121.191221 353.396176,121.820877 355.693101,121.820877 C359.869328,121.820877 362.583876,120.245737 364.254367,115.944084 L346.4,64.7260274 L363.315711,64.7260274 L368.953618,85.2968043 Z"}" id="${"Fill-6"}" fill="${"#2F2FA2"}"></path><polygon id="${"Fill-7"}" fill="${"#2F2FA2"}" points="${"421.967942 51.9406393 421.967942 99.8894622 444.8 99.8894622 444.8 113.47032 406.4 113.47032 406.4 51.9406393"}"></polygon><path d="${"M473.521424,88.9209202 L487.242692,88.9209202 L485.566934,84.2215377 C481.900215,73.9831708 480.643396,66.2516718 480.643396,66.2516718 L480.224457,66.2516718 C480.224457,66.2516718 478.654431,74.0866288 475.197182,84.1160901 L473.521424,88.9209202 Z M491.851027,101.978519 L469.120564,101.978519 L465.24637,113.47032 L448.8,113.47032 L471.111524,51.9406393 L490.281001,51.9406393 L512.8,113.47032 L495.936685,113.47032 L491.851027,101.978519 Z"}" id="${"Fill-8"}" fill="${"#2F2FA2"}"></path><path d="${"M537.308865,100.203815 L547.151837,100.203815 C551.76118,100.203815 554.483705,98.9503815 554.483705,94.2490093 C554.483705,90.3832598 551.76118,88.5031089 547.151837,88.5031089 L537.308865,88.5031089 L537.308865,100.203815 Z M545.163298,77.2202137 C549.455512,77.2202137 552.18003,75.654416 552.18003,71.3708552 C552.18003,66.7749307 549.561221,65.2071435 544.848163,65.2071435 L537.308865,65.2071435 L537.308865,77.2202137 L545.163298,77.2202137 Z M556.787379,82.1304915 C566.002076,83.4893731 570.4,89.4441792 570.4,96.7578668 C570.4,106.785339 563.594687,113.47032 548.514097,113.47032 L521.6,113.47032 L521.6,51.9406393 L548.723521,51.9406393 C561.185303,51.9406393 567.783186,57.7919873 567.783186,67.4016477 C567.783186,75.0276991 563.488977,79.9359873 556.787379,81.7126802 L556.787379,82.1304915 Z"}" id="${"Fill-9"}" fill="${"#2F2FA2"}"></path><path d="${"M631.901465,77.2202137 C636.160898,77.2202137 639.900018,75.654416 639.900018,70.5352326 C639.900018,66.6694831 637.717875,65.2071435 633.66815,65.2071435 L626.603388,65.2071435 L624.526099,77.2202137 L631.901465,77.2202137 Z M620.474396,100.203815 L630.239634,100.203815 C635.120275,100.203815 638.548791,98.3216749 638.548791,93.5168447 C638.548791,90.3832598 636.88696,88.5031089 632.316923,88.5031089 L622.551685,88.5031089 L620.474396,100.203815 Z M641.769579,82.0270335 C650.701923,83.385915 653.922711,89.0263678 653.922711,94.9791844 C653.922711,107.515514 644.054597,113.47032 629.096136,113.47032 L602.4,113.47032 L613.101008,51.9406393 L638.445916,51.9406393 C651.014506,51.9406393 656,57.6865397 656,65.7304024 C656,75.0257095 649.560403,80.5646938 641.874433,81.6072326 L641.769579,82.0270335 Z"}" id="${"Fill-10"}" fill="${"#2F2FA2"}"></path><path d="${"M693.51795,83.5459719 C693.623361,82.9232396 693.726782,82.1957302 693.726782,81.3634436 C693.726782,77.9394047 692.577212,75.2408983 688.505983,75.2408983 C684.327355,75.2408983 681.823361,79.082069 680.673791,83.5459719 L693.51795,83.5459719 Z M692.473791,96.4177486 L707.302848,99.9465647 C704.482623,109.702703 697.8,114.269406 684.223934,114.269406 C670.335614,114.269406 662.4,106.17191 662.4,93.4049107 C662.4,74.4105886 675.138749,63.9269406 689.132479,63.9269406 C703.126209,63.9269406 709.6,72.3348145 709.6,81.3634436 C709.6,85.2065912 708.868094,88.9410078 707.51168,91.6414911 L679.003135,91.6414911 C677.750143,97.9735908 680.359548,102.437494 685.476926,102.437494 C689.027069,102.437494 691.429631,100.982475 692.473791,96.4177486 L692.473791,96.4177486 Z"}" id="${"Fill-11"}" fill="${"#2F2FA2"}"></path><path d="${"M752.341238,82.687571 C745.443736,79.0224358 736.036061,80.0713265 734.260427,90.2252266 L730.183635,113.47032 L714.4,113.47032 L722.866112,65.0977138 L736.663107,65.0977138 L736.350579,78.396292 C739.692832,68.447783 747.740913,62.1664033 756,64.3658833 L752.341238,82.687571 Z"}" id="${"Fill-12"}" fill="${"#2F2FA2"}"></path><path d="${"M773.706457,97.342227 C773.284611,99.6407095 773.495534,101.624768 776.659379,101.624768 C777.607528,101.624768 778.557686,101.417805 779.823224,101.10338 L777.292148,112.910217 C774.656615,113.746029 771.595219,114.269406 768.959686,114.269406 C759.361686,114.269406 755.565073,109.463488 757.148,100.162097 L767.272302,43.9497717 L783.2,43.9497717 L773.706457,97.342227 Z"}" id="${"Fill-13"}" fill="${"#2F2FA2"}"></path><path d="${"M804.179359,41.5525114 C809.562019,41.5525114 813.6,44.3714144 813.6,50.2159663 C813.6,55.8517843 809.562019,58.7760482 804.179359,58.7760482 C799.208779,58.7760482 795.070243,55.8517843 795.070243,50.2159663 C795.070243,44.3714144 799.208779,41.5525114 804.179359,41.5525114 L804.179359,41.5525114 Z M804.59341,96.5608778 C804.179359,98.8569518 804.386385,100.838931 807.493737,100.838931 C808.424366,100.838931 809.356966,100.632185 810.599118,100.31809 L808.112842,112.112555 C805.52601,112.947491 802.523156,113.47032 799.936325,113.47032 C790.513713,113.47032 786.789228,108.669438 788.340932,99.3777928 L794.447195,64.7239732 L810.080569,64.7239732 L804.59341,96.5608778 Z"}" id="${"Fill-14"}" fill="${"#2F2FA2"}"></path><path d="${"M865.904769,96.6795004 C865.484408,98.959467 865.694589,100.927542 868.847294,100.927542 C869.792105,100.927542 870.738918,100.722246 872,100.410355 L869.477835,112.12208 C866.851582,112.951158 863.800964,113.47032 861.17471,113.47032 C851.610502,113.47032 847.827255,108.703117 849.404608,99.4766543 L852.030862,84.5512622 C852.767494,80.1985987 851.926773,76.6750139 847.092624,76.6750139 C843.307376,76.6750139 840.15467,79.993303 838.787497,87.5576598 L834.267618,112.951158 L818.4,112.951158 L826.913306,65.065937 L840.785211,65.065937 L840.995392,74.8095866 C844.044008,67.762417 848.351705,63.9269406 856.44465,63.9269406 C864.117235,63.9269406 868.951384,68.7987655 868.951384,76.1578266 C868.951384,77.8140102 868.847294,78.9549805 868.637114,80.1985987 L865.904769,96.6795004 Z"}" id="${"Fill-15"}" fill="${"#2F2FA2"}"></path><polygon id="${"Fill-16"}" fill="${"#F64C72"}" points="${"95.1873397 123.059361 66.4 106.693481 66.9479874 33.5407345 125.71064 0 153.6 15.9118228 153.486003 89.5305229"}"></polygon><polygon id="${"Fill-17"}" fill="${"#393A61"}" points="${"69.6 24.612994 60.3258154 29.9629488 60.0839491 62.4977463 27.1663429 81.4897878 26.728208 140.639269 0 125.280747 0.543207907 51.9845785 58.7913522 18.3789954"}"></polygon><polygon id="${"Fill-18"}" fill="${"#2F2FA2"}" points="${"60.4747991 70.3196347 60.1733254 110.994516 95.3406363 131.154489 120 116.853936 119.964299 141.471429 62.1467885 175 33.6 158.633283 34.1434461 85.4767932"}"></polygon></g></g></g></svg>`;
});
const LogoODIS = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 221 53"}"><g fill="${"none"}" transform="${"translate(.908 .023)"}"><path fill="${"#000"}" d="${"M78.6524424,9.1399053 C78.6524424,12.3521612 77.5351129,13.7339036 74.7711924,13.7339036 C72.0543174,13.7339036 70.878181,12.2931124 70.878181,9.1399053 C70.878181,5.98669821 72.0190333,4.56952651 74.7711924,4.56952651 C77.5351129,4.56952651 78.6524424,5.98669821 78.6524424,9.1399053 Z M76.5824424,9.1399053 C76.5824424,6.89605008 76.1237492,6.35280093 74.7711924,6.35280093 C73.430397,6.35280093 72.9599424,6.89605008 72.9599424,9.1399053 C72.9599424,11.3837605 73.4421583,11.9506292 74.7829538,11.9506292 C76.1119879,11.9506292 76.5824424,11.3719508 76.5824424,9.1399053 Z M87.6603401,7.74635311 C87.6603401,9.61229585 86.6723856,10.6869844 84.2142606,10.6869844 L83.0381242,10.6869844 L83.0381242,13.5685669 L81.0504538,13.5685669 L81.0504538,4.71124367 L84.2142606,4.71124367 C86.6606242,4.71124367 87.6603401,5.67964434 87.6603401,7.74635311 Z M85.6138629,7.73454336 C85.6138629,6.67166457 85.2374992,6.37642045 84.2142606,6.37642045 L83.0381242,6.37642045 L83.0381242,9.09266622 L84.2142606,9.09266622 C85.1904538,9.09266622 85.6138629,8.84466118 85.6138629,7.73454336 Z M91.8931242,11.8325316 L95.9507947,11.8325316 L95.9037492,13.5685669 L89.9054538,13.5685669 L89.9054538,4.71124367 L95.7273288,4.71124367 L95.7626129,6.47089857 L91.8931242,6.47089857 L91.8931242,8.23055343 L95.151022,8.23055343 L95.151022,9.81306185 L91.8931242,9.81306185 L91.8931242,11.8325316 Z M105.346817,13.5685669 L103.958976,13.5685669 L100.536419,8.7383733 L100.007158,7.94711911 L99.9836352,7.95892887 L99.9953972,8.91551978 L99.9953972,13.5685669 L98.2311924,13.5685669 L98.2311924,4.71124367 L99.9248292,4.71124367 L103.065113,9.28162246 L103.594374,10.0728767 L103.617897,10.0610669 L103.594374,9.11628578 L103.594374,4.71124367 L105.346817,4.71124367 L105.346817,13.5685669 Z M122.257044,9.10447598 C122.257044,12.3049222 120.92801,13.5685669 118.316988,13.5685669 L114.988522,13.5685669 L114.988522,4.71124367 L118.293465,4.71124367 C121.092669,4.71124367 122.257044,6.04574705 122.257044,9.10447598 Z M120.175283,9.09266622 C120.175283,6.9905282 119.669544,6.49451809 118.269942,6.49451809 L116.976192,6.49451809 L116.976192,11.7971023 L118.281704,11.7971023 C119.63426,11.7971023 120.175283,11.360141 120.175283,9.09266622 Z M129.86534,13.5685669 L129.371363,11.8443413 L126.172272,11.8443413 L125.678294,13.5685669 L123.584772,13.5685669 L126.630965,4.71124367 L128.994999,4.71124367 L132.076476,13.5685669 L129.86534,13.5685669 Z M127.783579,6.21108373 L127.53659,7.14405512 L126.654488,10.1791646 L128.900908,10.1791646 L128.05409,7.14405512 L127.818863,6.21108373 L127.783579,6.21108373 Z M139.284885,6.50632785 L136.90909,6.50632785 L136.90909,13.5685669 L134.909658,13.5685669 L134.909658,6.50632785 L132.545624,6.50632785 L132.592669,4.71124367 L139.23784,4.71124367 L139.284885,6.50632785 Z M146.034601,13.5685669 L145.540624,11.8443413 L142.341533,11.8443413 L141.847556,13.5685669 L139.754033,13.5685669 L142.800226,4.71124367 L145.16426,4.71124367 L148.245738,13.5685669 L146.034601,13.5685669 Z M143.95284,6.21108373 L143.705851,7.14405512 L142.823749,10.1791646 L145.070169,10.1791646 L144.223351,7.14405512 L143.988124,6.21108373 L143.95284,6.21108373 Z M71.3368742,29.9710173 L71.3368742,21.1136941 L73.3598288,21.1136941 L73.3598288,29.9710173 L71.3368742,29.9710173 Z M83.320397,29.9710173 L81.932556,29.9710173 L78.5099992,25.1408238 L77.9807379,24.3495695 L77.9572151,24.3613793 L77.9689765,25.3179702 L77.9689765,29.9710173 L76.204772,29.9710173 L76.204772,21.1136941 L77.8984083,21.1136941 L81.0386924,25.6840729 L81.5679538,26.4753271 L81.5914765,26.4635173 L81.5679538,25.5187362 L81.5679538,21.1136941 L83.320397,21.1136941 L83.320397,29.9710173 Z M91.8931242,22.9087783 L88.0236356,22.9087783 L88.0236356,24.8219601 L91.2462492,24.8219601 L91.2227265,26.5225662 L88.0236356,26.5225662 L88.0236356,29.9710173 L86.0477265,29.9710173 L86.0477265,21.1136941 L91.8578401,21.1136941 L91.8931242,22.9087783 Z M101.383238,25.5423558 C101.383238,28.7546116 100.265908,30.1363541 97.5019879,30.1363541 C94.7851129,30.1363541 93.6089765,28.6955628 93.6089765,25.5423558 C93.6089765,22.3891487 94.7498288,20.971977 97.5019879,20.971977 C100.265908,20.971977 101.383238,22.3891487 101.383238,25.5423558 Z M99.3132382,25.5423558 C99.3132382,23.2985005 98.8545447,22.7552513 97.5019879,22.7552513 C96.1611924,22.7552513 95.6907379,23.2985005 95.6907379,25.5423558 C95.6907379,27.786211 96.1729538,28.3530796 97.5137492,28.3530796 C98.8427833,28.3530796 99.3132382,27.7744012 99.3132382,25.5423558 Z M110.297044,23.8653692 C110.297044,25.1053945 109.767783,25.979317 108.815113,26.2745611 L110.873351,29.9710173 L108.556363,29.9710173 L107.015624,26.6642833 L105.768919,26.6642833 L105.768919,29.9710173 L103.781249,29.9710173 L103.781249,21.1136941 L107.015624,21.1136941 C109.203238,21.1136941 110.297044,21.9758069 110.297044,23.8653692 Z M108.227044,23.9480376 C108.227044,23.0504955 107.897726,22.7670611 107.027385,22.7670611 L105.768919,22.7670611 L105.768919,25.176253 L106.992101,25.176253 C107.874204,25.176253 108.227044,24.9046285 108.227044,23.9480376 Z M112.824431,21.1136941 L115.012044,21.1136941 L117.058522,26.2863709 L117.38784,27.1721032 L117.423124,27.1721032 L117.752442,26.2863709 L119.810681,21.1136941 L121.998294,21.1136941 L121.998294,29.9710173 L120.187044,29.9710173 L120.187044,25.4596874 L120.210567,24.5030965 L120.175283,24.4912867 L119.845965,25.3888288 L118.034715,29.9710173 L116.717442,29.9710173 L114.917954,25.4006386 L114.588635,24.5030965 L114.565113,24.5149062 L114.576874,25.4714972 L114.576874,29.9710173 L112.824431,29.9710173 L112.824431,21.1136941 Z M130.229942,29.9710173 L129.735965,28.2467918 L126.536874,28.2467918 L126.042897,29.9710173 L123.949374,29.9710173 L126.995567,21.1136941 L129.359601,21.1136941 L132.441079,29.9710173 L130.229942,29.9710173 Z M128.148181,22.6135342 L127.901192,23.5465056 L127.01909,26.581615 L129.26551,26.581615 L128.418692,23.5465056 L128.183465,22.6135342 L128.148181,22.6135342 Z M139.649488,22.9087783 L137.273692,22.9087783 L137.273692,29.9710173 L135.27426,29.9710173 L135.27426,22.9087783 L132.910226,22.9087783 L132.957272,21.1136941 L139.602442,21.1136941 L139.649488,22.9087783 Z M141.80051,29.9710173 L141.80051,21.1136941 L143.823465,21.1136941 L143.823465,29.9710173 L141.80051,29.9710173 Z M154.113351,25.5423558 C154.113351,28.7546116 152.996022,30.1363541 150.232101,30.1363541 C147.515226,30.1363541 146.33909,28.6955628 146.33909,25.5423558 C146.33909,22.3891487 147.479942,20.971977 150.232101,20.971977 C152.996022,20.971977 154.113351,22.3891487 154.113351,25.5423558 Z M152.043351,25.5423558 C152.043351,23.2985005 151.584658,22.7552513 150.232101,22.7552513 C148.891306,22.7552513 148.420851,23.2985005 148.420851,25.5423558 C148.420851,27.786211 148.903067,28.3530796 150.243863,28.3530796 C151.572897,28.3530796 152.043351,27.7744012 152.043351,25.5423558 Z M163.626988,29.9710173 L162.239147,29.9710173 L158.81659,25.1408238 L158.287329,24.3495695 L158.263806,24.3613793 L158.275567,25.3179702 L158.275567,29.9710173 L156.511363,29.9710173 L156.511363,21.1136941 L158.204999,21.1136941 L161.345283,25.6840729 L161.874544,26.4753271 L161.898067,26.4635173 L161.874544,25.5187362 L161.874544,21.1136941 L163.626988,21.1136941 L163.626988,29.9710173 Z M171.964488,27.3138204 C171.964488,29.0616655 170.753067,30.1363541 168.694829,30.1363541 C167.67159,30.1363541 166.730681,29.888349 165.966192,29.4750073 L166.224942,27.7625914 C167.001192,28.1759332 167.800965,28.4121285 168.671306,28.4121285 C169.635738,28.4121285 170.059147,28.0578355 170.059147,27.4437278 C170.059147,26.0501756 166.001476,26.6406638 166.001476,23.676413 C166.001476,22.1765729 166.965908,20.9601672 169.200567,20.9601672 C170.059147,20.9601672 170.988294,21.1373136 171.670454,21.420748 L171.423465,23.0977345 C170.69426,22.8615392 169.965056,22.7198221 169.294658,22.7198221 C168.200851,22.7198221 167.906817,23.0977345 167.906817,23.5701251 C167.906817,24.9518675 171.964488,24.3141402 171.964488,27.3138204 Z M179.80801,27.3138204 C179.80801,29.0616655 178.59659,30.1363541 176.538351,30.1363541 C175.515113,30.1363541 174.574204,29.888349 173.809715,29.4750073 L174.068465,27.7625914 C174.844715,28.1759332 175.644488,28.4121285 176.514829,28.4121285 C177.47926,28.4121285 177.902669,28.0578355 177.902669,27.4437278 C177.902669,26.0501756 173.844999,26.6406638 173.844999,23.676413 C173.844999,22.1765729 174.809431,20.9601672 177.04409,20.9601672 C177.902669,20.9601672 178.831817,21.1373136 179.513976,21.420748 L179.266988,23.0977345 C178.537783,22.8615392 177.808579,22.7198221 177.138181,22.7198221 C176.044374,22.7198221 175.75034,23.0977345 175.75034,23.5701251 C175.75034,24.9518675 179.80801,24.3141402 179.80801,27.3138204 Z M188.169033,22.9087783 L185.793238,22.9087783 L185.793238,29.9710173 L183.793806,29.9710173 L183.793806,22.9087783 L181.429772,22.9087783 L181.476817,21.1136941 L188.121988,21.1136941 L188.169033,22.9087783 Z M192.178352,28.234982 L196.236022,28.234982 L196.188977,29.9710173 L190.190681,29.9710173 L190.190681,21.1136941 L196.012556,21.1136941 L196.04784,22.873349 L192.178352,22.873349 L192.178352,24.6330039 L195.436249,24.6330039 L195.436249,26.2155123 L192.178352,26.2155123 L192.178352,28.234982 Z M200.515852,28.1759332 L204.150113,28.1759332 L204.103068,29.9710173 L198.51642,29.9710173 L198.51642,21.1136941 L200.515852,21.1136941 L200.515852,28.1759332 Z M208.241761,28.1759332 L211.876022,28.1759332 L211.828977,29.9710173 L206.242329,29.9710173 L206.242329,21.1136941 L208.241761,21.1136941 L208.241761,28.1759332 Z M215.955909,28.234982 L220.013579,28.234982 L219.966534,29.9710173 L213.968238,29.9710173 L213.968238,21.1136941 L219.790113,21.1136941 L219.825397,22.873349 L215.955909,22.873349 L215.955909,24.6330039 L219.213806,24.6330039 L219.213806,26.2155123 L215.955909,26.2155123 L215.955909,28.234982 Z M77.570397,43.8934172 C77.570397,45.4641159 76.8411924,46.373468 74.9123288,46.373468 L71.6779538,46.373468 L71.6779538,37.5161446 L74.7359083,37.5161446 C76.3707379,37.5161446 77.1940333,38.2129206 77.1940333,39.6891412 C77.1940333,40.8464981 76.6412492,41.4606058 75.9002833,41.6731816 L75.9002833,41.6968011 C76.9352833,41.9093769 77.570397,42.5825335 77.570397,43.8934172 Z M76.8059083,43.8343686 C76.8059083,42.6297725 76.1707947,42.0747136 74.8770447,42.0747136 L72.4189197,42.0747136 L72.4189197,45.6885014 L74.9240901,45.6885014 C76.1002265,45.6885014 76.8059083,45.2043013 76.8059083,43.8343686 Z M76.4530674,39.8190486 C76.4530674,38.6735015 75.9002833,38.2129206 74.7123856,38.2129206 L72.430681,38.2129206 L72.430681,41.4369863 L74.8064765,41.4369863 C75.9120447,41.4369863 76.4530674,40.8937372 76.4530674,39.8190486 Z M81.5326697,45.6412626 L86.2136924,45.6412626 L86.1784083,46.373468 L80.768181,46.373468 L80.768181,37.5161446 L85.9667038,37.5161446 L86.0019879,38.24835 L81.5326697,38.24835 L81.5326697,41.401557 L85.4021583,41.401557 L85.4021583,42.0629038 L81.5326697,42.0629038 L81.5326697,45.6412626 Z M94.6217606,39.9135267 C94.6217606,41.354318 93.9631242,42.1101429 92.7399424,42.25186 L95.1980674,46.373468 L94.2571583,46.373468 L91.9989765,42.3935772 L89.9524992,42.3935772 L89.9524992,46.373468 L89.1762492,46.373468 L89.1762492,37.5161446 L92.0342606,37.5161446 C93.8102265,37.5161446 94.6217606,38.295589 94.6217606,39.9135267 Z M93.8219879,39.948956 C93.8219879,38.7089307 93.2692038,38.2129206 92.0342606,38.2129206 L89.9524992,38.2129206 L89.9524992,41.75585 L91.9636924,41.75585 C93.245681,41.75585 93.8219879,41.2362203 93.8219879,39.948956 Z M98.6663629,45.6176427 L103.04159,45.6176427 L103.006306,46.373468 L97.8901129,46.373468 L97.8901129,37.5161446 L98.6663629,37.5161446 L98.6663629,45.6176427 Z M105.874772,46.373468 L105.874772,37.5161446 L106.651022,37.5161446 L106.651022,46.373468 L105.874772,46.373468 Z M116.846817,46.373468 L116.27051,46.373468 L111.707101,39.5238045 L111.189601,38.7207405 L111.166079,38.7325503 L111.17784,39.6891412 L111.17784,46.373468 L110.472158,46.373468 L110.472158,37.5161446 L111.236647,37.5161446 L115.647158,44.2004711 L116.164658,45.0035353 L116.188181,44.9917256 L116.164658,44.0469444 L116.152897,37.5161446 L116.846817,37.5161446 L116.846817,46.373468 Z"}"></path><ellipse cx="${"22.496"}" cy="${"30.473"}" fill="${"#53B6E7"}" rx="${"22.404"}" ry="${"22.496"}" transform="${"rotate(-90 22.496 30.473)"}"></ellipse><ellipse cx="${"47.805"}" cy="${"5.628"}" fill="${"#E60332"}" rx="${"5.628"}" ry="${"5.651"}" transform="${"rotate(-90 47.805 5.628)"}"></ellipse><ellipse cx="${"22.72"}" cy="${"30.628"}" fill="${"#16469D"}" rx="${"5.628"}" ry="${"5.651"}" transform="${"rotate(-90 22.72 30.628)"}"></ellipse></g></svg>`;
});
const LogoTSB = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `
<svg version="${"1.1"}" id="${"Ebene_1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 497.4 151.9"}" style="${"enable-background:new 0 0 497.4 151.9;"}" xml:space="${"preserve"}"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}><style type="${"text/css"}">.st0 {
      fill: #1e3791;
    }</style><g id="${"Schriftzug"}"><path class="${"st0"}" d="${"M302.4,103v24.2h11.4l-0.1,3.3h-14.8V103H302.4z M245.7,103v27.5h15.7l0.1-3.3h-12.3v-9.5h10.1v-3h-10.1v-8.4\n		H261l-0.1-3.3C260.9,103,245.7,103,245.7,103z M284.4,110.9c0-3.6-1.4-4.8-4.5-4.8h-4.8v9.7h4.7\n		C282.9,115.8,284.4,114.6,284.4,110.9z M283,118l6.6,12.4h-4.1l-5.6-11.8h-4.8v11.8h-3.5V103h8.2c5.5,0,8.1,2.4,8.1,7.8\n		C288,115.1,286.2,117.4,283,118z M226.9,127.4c3,0,4.7-1.2,4.7-5c0-3.4-1.5-4.8-4.8-4.8H221v9.8H226.9z M220.9,114.8h5.6\n		c2.9,0,4.1-1.4,4.1-4.4c0-3.2-1.3-4.3-4.3-4.3h-5.5L220.9,114.8L220.9,114.8z M230.5,115.9c2.9,0.7,4.6,2.8,4.6,6.7\n		c0,5-2.3,7.8-8.2,7.8h-9.3V103h9c5,0,7.6,2.2,7.6,6.8C234.1,113.2,232.6,115.1,230.5,115.9L230.5,115.9z M323.1,130.4h3.5V103h-1.8\n		H323L323.1,130.4L323.1,130.4z M354.4,103v17.9l0.1,2.9h-0.1l-1.5-2.6L342,103h-3.2v27.5h3.1V112v-3h0.1l1.5,2.6l11.5,18.9h2.5V103\n		H354.4z M406.1,74.8c-0.8,0.2-1.6,0.3-2.6,0.3c-4.2,0-5.7-1.8-5.7-8.9c0-7,1.5-8.9,6.4-8.9c2.1,0,4.3,0.4,6,1.1l0.6-5.1\n		c-1.9-0.8-4.5-1.2-6.9-1.2c-8.5,0-12.1,4.4-12.1,14.3c0,9.6,3.2,14.2,11.9,14.2c2.8,0,5.7-0.6,7.6-1.5v-14h-5.2L406.1,74.8\n		L406.1,74.8z M272.8,52.5h-2.9H267V80h5.9V52.5H272.8z M246.4,80h5.8V57.9h6.7l-0.1-5.4h-18.9l-0.1,5.4h6.7L246.4,80L246.4,80z\n		 M224,75.3c-2.5,0-4.7-0.7-6.8-1.8l-0.8,5.1c2.1,1.2,4.8,1.9,7.7,1.9c5.9,0,9.4-3.2,9.4-8.6c0-9-11.4-7.4-11.4-11.8\n		c0-1.5,0.9-2.7,4-2.7c1.9,0,3.8,0.4,5.9,1.1l0.7-5c-1.9-0.9-4.4-1.4-6.9-1.4c-6.3,0-9.2,3.6-9.2,8.2c0,9,11.4,7.4,11.4,11.9\n		C227.9,74.2,226.7,75.3,224,75.3z M377.6,66.2l0.1,2.9h-0.1l-10.2-16.7h-4.9V80h5.1V65.5v-3h0.1l1.5,2.6l9.4,14.9h4.1V52.5h-5.1\n		V66.2z M298,64h-9v-6.1h10.7l-0.1-5.4h-16.4V80h5.8V69.1h8.9L298,64z M352.6,70.6V52.5h-5.7v18.1c0,3.2-1.2,4.5-4.3,4.5\n		c-3.1,0-4.4-1.4-4.4-4.5V52.5h-5.8v18.1c0,6.6,3.5,9.8,10.1,9.8S352.6,77.2,352.6,70.6z M324.9,52.5H306l-0.1,5.4h6.7V80h5.8V57.9\n		h6.7L324.9,52.5z M342.7,28V0.5h-5.1v13.7l0.1,2.9h-0.1L327.5,0.5h-4.9V28h5.1V13.5v-3h0.1l1.5,2.6l9.4,14.9\n		C338.6,28,342.7,28,342.7,28z M220.6,28h5.8V5.9h6.7L233,0.5h-18.9L214,5.9h6.7L220.6,28L220.6,28z M486.1,22.8v-6.5h9.1v-4.8h-9.1\n		V5.7h10.8l-0.1-5.3h-16.4V28h16.9l0.1-5.2H486.1L486.1,22.8z M398.9,22.6h-10.1V0.5H383V28h15.8L398.9,22.6z M298,16.6h8.5V28h5.8\n		V0.5h-5.8v10.7H298V0.5h-5.8V28h5.8V16.6z M258.4,22.8H247v-6.5h9.1v-4.8H247V5.7h10.8l-0.1-5.3h-16.4V28h16.9L258.4,22.8z\n		 M367.7,14.2c0-7.3-1.2-8.8-5-8.8c-3.7,0-5,1.6-5,8.8c0,7.3,1.3,8.9,5,8.9C366.5,23.1,367.7,21.5,367.7,14.2z M362.8,28.4\n		c-7.7,0-11-4.1-11-14.2C351.8,4,355,0,362.8,0s11,4,11,14.2C373.8,24.6,370.6,28.4,362.8,28.4z M464.1,28h5.9V0.5h-3h-2.9V28z\n		 M277.5,28.4c2.2,0,4.5-0.5,6.2-1.4l-0.6-4.9c-1.4,0.6-2.9,1-4.7,1c-4.5,0-6.1-2-6.1-9.2c0-6.7,1.5-8.7,6-8.7\n		c1.8,0,3.5,0.4,4.8,0.8l0.6-5.1c-1.4-0.6-3.8-1.1-5.8-1.1c-8,0-11.6,4.6-11.6,14C266.2,24,269.8,28.4,277.5,28.4z M421,14.2\n		c0-7.3-1.2-8.8-5-8.8c-3.7,0-5,1.6-5,8.8c0,7.3,1.3,8.9,5,8.9C419.7,23.1,421,21.5,421,14.2z M427,14.2c0,10.4-3.2,14.2-11,14.2\n		c-7.7,0-11-4.1-11-14.2C405,4,408.2,0,416,0S427,4.1,427,14.2z M449.2,22.8c-0.8,0.2-1.7,0.3-2.6,0.3c-4.2,0-5.7-1.8-5.7-8.9\n		c0-7,1.5-8.9,6.4-8.9c2.1,0,4.3,0.4,6,1.1l0.6-5.1C452,0.5,449.3,0,447,0c-8.5,0-12.1,4.4-12.1,14.3c0,9.6,3.3,14.2,11.9,14.2\n		c2.8,0,5.8-0.6,7.6-1.5V13.1h-5.2L449.2,22.8L449.2,22.8z"}"></path></g><g id="${"Linienmarke_A1"}"><path class="${"st0"}" d="${"M8.1,104.5l2.3-1.4l39,6.1l-1.5,1.5L8.1,104.5z M110.9,58.8l-1.3,1.3l43.9,19.3l-0.4-2.1L110.9,58.8z\n		 M94.1,51.4l-1.8,1.1l8.4,3.7l1.3-1.3L94.1,51.4z M186.7,91.6l-18.2,40.1L58.2,113l2.9-3.1l103.8,17.7L145.4,19.3L16.6,151.9\n		L0,102.3l36.7-76.7l47.9,21.1L81,48.9L38.4,30.1L5.6,98.7l141.8-87.5l20.4,113.3L182,93.4l-18.4-8.1l-0.7-4.2L186.7,91.6z\n		 M18.1,145.3L139.9,20L4.2,103.7L18.1,145.3z"}"></path></g></svg>`;
});
const LogoSenatskanzlei = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg id="${"Ebene_1"}" data-name="${"Ebene 1"}" xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 1700.79 283.46"}"><defs><style>.cls-1 {
        fill: #e40422;
      }</style></defs><path d="${"M0,0V283.46H1700.79V0ZM850.39,277.8H5.67V5.67H850.39Zm566.93,0H856.06V5.67h561.26Zm277.8,0H1423V5.67h272.13Z"}"></path><path class="${"cls-1"}" d="${"M1335.94,96v62.44c0,.81-.54,1.08-.94.27l-35.63-63.25a2.41,2.41,0,0,0-2-1.08h-15.25a1.57,1.57,0,0,0-1.62,1.62v91.16a1.57,1.57,0,0,0,1.62,1.62h13.23a1.57,1.57,0,0,0,1.62-1.62v-62.3c0-.81.54-1.08.94-.27l35.63,63.11a2.41,2.41,0,0,0,2,1.08h15.25a1.56,1.56,0,0,0,1.62-1.62V96a1.56,1.56,0,0,0-1.62-1.62h-13.23a1.57,1.57,0,0,0-1.62,1.62m-95.36,92.78H1254a1.57,1.57,0,0,0,1.62-1.62V96a1.57,1.57,0,0,0-1.62-1.62h-13.37A1.56,1.56,0,0,0,1239,96v91.16a1.56,1.56,0,0,0,1.61,1.62m-53.28-16.45V96a1.56,1.56,0,0,0-1.62-1.62h-13.36A1.57,1.57,0,0,0,1170.7,96v91.16a1.57,1.57,0,0,0,1.62,1.62h46a1.56,1.56,0,0,0,1.62-1.62V174.76a1.56,1.56,0,0,0-1.62-1.62h-30.23a.77.77,0,0,1-.81-.8M1100,110h12.28c10.93,0,19.71,5.8,19.71,17.8s-8.78,17.8-19.84,17.8H1100a.78.78,0,0,1-.81-.81v-34a.71.71,0,0,1,.81-.8m31.31,78.75h17c1.35,0,1.75-.95.94-2L1129,159.39a.77.77,0,0,1,.27-1.21c12-4.86,20-15.51,20-30.34,0-21-15.93-33.45-36.17-33.45h-28.88A1.56,1.56,0,0,0,1082.6,96v91.16a1.56,1.56,0,0,0,1.62,1.62h13.36a1.57,1.57,0,0,0,1.62-1.62V162.09a.78.78,0,0,1,.81-.81h10.26a1.68,1.68,0,0,1,1.08.54l18.08,25.89a2.17,2.17,0,0,0,1.89,1.08m-73.26-80.37V96a1.56,1.56,0,0,0-1.62-1.62h-49.12A1.56,1.56,0,0,0,1005.7,96v91.16a1.56,1.56,0,0,0,1.62,1.62h49.12a1.56,1.56,0,0,0,1.62-1.62V174.76a1.56,1.56,0,0,0-1.62-1.62H1023a.77.77,0,0,1-.81-.8V149.68a.78.78,0,0,1,.81-.81h33.47a1.55,1.55,0,0,0,1.62-1.62V135a1.56,1.56,0,0,0-1.62-1.62H1023a.71.71,0,0,1-.81-.8V110.84a.78.78,0,0,1,.81-.8h33.47a1.56,1.56,0,0,0,1.62-1.62M952.84,173.14H938.53a.77.77,0,0,1-.8-.8V149.68a.71.71,0,0,1,.8-.81h14.31c8.77,0,13.63,5,13.63,12.14s-4.86,12.13-13.63,12.13M951.49,110c8.5,0,13.23,4.58,13.23,11.59s-4.73,11.73-13.23,11.73h-13a.71.71,0,0,1-.8-.8V110.84a.71.71,0,0,1,.8-.8ZM971.2,139.7A22.58,22.58,0,0,0,982,119.88c0-14.43-10-25.49-28.34-25.49H922.88A1.56,1.56,0,0,0,921.26,96v91.16a1.56,1.56,0,0,0,1.62,1.62h32c18.89,0,28.88-11.47,28.88-26.57,0-9.84-4.73-17.26-12.55-21.44-.54-.4-.54-.81,0-1.08"}"></path><path d="${"M1600.7,222.16s-5-32.87-7.29-46.73l1-.21a3.05,3.05,0,0,0,2-4.53c-5.61-9.66-7.61-21.69-7.61-33.65a64.6,64.6,0,0,1,3.5-21c.13-.38.27-.75.41-1.13l.27-.81a61.68,61.68,0,0,0,5-18.43,52.39,52.39,0,0,0-4.1-25.28l-.45-.8a6.59,6.59,0,0,0,.86-8c-1.84-3.16-5.6-4.42-8.4-2.8-.3.17-1,.66-1.3.89-.52-.38-.82-.57-.82-.57s-.79-.52-1.47-.87l-.26-.14a22.85,22.85,0,0,0-9.37-1.95,23.83,23.83,0,0,0-4.8.49,23.27,23.27,0,0,0-9.1,4.08,13.57,13.57,0,0,1-2.88.55l-3.8.18c-1.79.07-3.83,0-3.83,0a1.61,1.61,0,0,0-1.61,1.62c0,.08.58,5.3.58,5.32a4.33,4.33,0,0,0,1.79,3.25l.13.09a1.36,1.36,0,0,1,.6.62,5.87,5.87,0,0,0,1.84,2.62.51.51,0,0,0,.75-.21c.72-2.85,2.42.22,5.65-1.53.83-.45,1.28,1.57.93,2.45l-.3.76a5.13,5.13,0,0,1-4,3.18c-1.44.21-2.26.35-2.24.55.17,1.61,0,3,1.62,4a3.79,3.79,0,0,0,.72.31c2.51.66,9.83,3.47.52,14.46a23.43,23.43,0,0,0-1.57,2,7.08,7.08,0,0,0-.51.89l-.2.39-28-10.47a6.41,6.41,0,0,1-2.45-2l-2.75-4.74a7.29,7.29,0,0,0-6.19-3.51,24.81,24.81,0,0,0-3.89,0c-.84,0-1.32.24-1.49.73a5,5,0,0,0,.6,3.51l2.41,4.41c.21.31,3.24,7.09,3.24,7.09a5,5,0,0,0,1.5,2.14L1544.75,121l-30.29,15.11a3.7,3.7,0,0,1-2.84.29l-2.72-.82c-5-2.21-8.69-.67-10.87,1.16l-.86.81a1.44,1.44,0,0,0,.42,2.4s4.78,2.81,5.83,3.53l7.45,4.41a5.41,5.41,0,0,0,3.82.62l29.41-5.93a101.36,101.36,0,0,0,3.55,20.62,52.9,52.9,0,0,0-15,28.19c-1.43,7.94-1,15.13,1.2,23.59-4.1.23-8.07.83-11.36,3.12-3.13,2.18-3.77,6.06-3.79,8l23,.05h1.94a3.32,3.32,0,0,0,3.05-2.44,16.74,16.74,0,0,0,.42-2.38,51.43,51.43,0,0,1,5.4-17.6,58.32,58.32,0,0,1,9.14-12.65,91.17,91.17,0,0,0,26,24.1,25.58,25.58,0,0,0-9.57,2.57,9.83,9.83,0,0,0-4.76,8.46H1597a3.68,3.68,0,0,0,3.49-2.49c0-.15.09-.31.13-.46s0-.23,0-.34A3.76,3.76,0,0,0,1600.7,222.16Z"}"></path><path d="${"M92.75,59.48a15,15,0,0,1,6,6.12,19.14,19.14,0,0,1,2.15,9.22,19.12,19.12,0,0,1-2.15,9.23,15,15,0,0,1-6,6.12A17.68,17.68,0,0,1,84,92.33H73.5a.44.44,0,0,1-.5-.5v-34a.44.44,0,0,1,.5-.5H84A17.68,17.68,0,0,1,92.75,59.48ZM77,88.78H83.8a14.29,14.29,0,0,0,6.85-1.61,11,11,0,0,0,4.67-4.75A15.92,15.92,0,0,0,97,74.82a16,16,0,0,0-1.68-7.6,11.21,11.21,0,0,0-4.67-4.75,14.39,14.39,0,0,0-6.85-1.59H77c-.17,0-.25.08-.25.24v27.4C76.7,88.69,76.78,88.78,77,88.78Z"}"></path><path d="${"M111.32,91.37a10.52,10.52,0,0,1-4.17-4.27,14.36,14.36,0,0,1,0-12.72,10.45,10.45,0,0,1,4-4.25,11.27,11.27,0,0,1,5.78-1.5,11.16,11.16,0,0,1,5.72,1.5,10.57,10.57,0,0,1,4,4.12,12.14,12.14,0,0,1,1.45,5.93,10.81,10.81,0,0,1-.05,1.15.49.49,0,0,1-.5.4H110c-.4,0-.55.21-.45.65A8.21,8.21,0,0,0,112,87.63a7.73,7.73,0,0,0,5.43,2,8.84,8.84,0,0,0,6.55-2.9c.37-.37.65-.44.85-.21l1.65,1.81c.23.2.23.41,0,.65a12.75,12.75,0,0,1-4.13,2.92,12.11,12.11,0,0,1-4.92,1A12.34,12.34,0,0,1,111.32,91.37Zm12.93-13.14a7.65,7.65,0,0,0-2.47-4.58,7.63,7.63,0,0,0-9.71,0,7.47,7.47,0,0,0-2.47,4.58l0,.24c0,.2.16.31.5.31H123.8Q124.4,78.83,124.25,78.23Z"}"></path><path d="${"M144.7,68.68c.3,0,.45.16.45.5v2.65c0,.29-.12.44-.35.44a3.51,3.51,0,0,1-.72-.07,3.65,3.65,0,0,0-.68-.08,6.3,6.3,0,0,0-5.5,3,2,2,0,0,0-.35,1.24V91.83a.44.44,0,0,1-.5.5H134.4a.44.44,0,0,1-.5-.5V69.63a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.79c0,.14,0,.22.1.26s.15,0,.25-.1a7.8,7.8,0,0,1,6.3-3A3.64,3.64,0,0,1,144.7,68.68Z"}"></path><path d="${"M165.65,92.33H163a.44.44,0,0,1-.5-.5v-34a.44.44,0,0,1,.5-.5h9.75a14.22,14.22,0,0,1,6.45,1.42,10.74,10.74,0,0,1,4.47,4.1,11.88,11.88,0,0,1,1.63,6.33,11.09,11.09,0,0,1-2.32,7.2,12.29,12.29,0,0,1-6.28,4c-.37.11-.43.29-.2.55l8.7,10.8a.46.46,0,0,1,.1.31c0,.19-.14.3-.4.3h-3.5a1.26,1.26,0,0,1-.48-.08,1,1,0,0,1-.37-.32l-8.3-10.6a1.26,1.26,0,0,0-.35-.33,1,1,0,0,0-.45-.08h-5c-.17,0-.25.09-.25.26V91.83A.44.44,0,0,1,165.65,92.33Zm.5-31.21v16c0,.16.08.24.25.24h5.95a10,10,0,0,0,6.5-2.05c1.7-1.36,2.55-3.43,2.55-6.19s-.85-4.84-2.55-6.2a10,10,0,0,0-6.5-2H166.4C166.23,60.88,166.15,61,166.15,61.12Z"}"></path><path d="${"M194.92,91.37a10.52,10.52,0,0,1-4.17-4.27,14.36,14.36,0,0,1,0-12.72,10.45,10.45,0,0,1,4.05-4.25,11.27,11.27,0,0,1,5.78-1.5,11.16,11.16,0,0,1,5.72,1.5,10.57,10.57,0,0,1,4,4.12,12.14,12.14,0,0,1,1.45,5.93,10.81,10.81,0,0,1-.05,1.15.49.49,0,0,1-.5.4H193.55c-.41,0-.55.21-.45.65a8.21,8.21,0,0,0,2.52,5.25,7.73,7.73,0,0,0,5.43,2,8.84,8.84,0,0,0,6.55-2.9c.37-.37.65-.44.85-.21l1.65,1.81c.23.2.23.41,0,.65A12.75,12.75,0,0,1,206,91.85a12.11,12.11,0,0,1-4.92,1A12.34,12.34,0,0,1,194.92,91.37Zm12.92-13.14a7.55,7.55,0,0,0-2.47-4.58,7.07,7.07,0,0,0-4.82-1.72,7.17,7.17,0,0,0-4.88,1.77,7.47,7.47,0,0,0-2.47,4.58l-.06.24c0,.2.17.31.5.31H207.4C207.8,78.83,208,78.63,207.84,78.23Z"}"></path><path d="${"M222,101.6a11.5,11.5,0,0,1-3.9-2.78.48.48,0,0,1,0-.7l1.7-1.85a.53.53,0,0,1,.35-.19.52.52,0,0,1,.34.19,9.5,9.5,0,0,0,12.26,1.38,6,6,0,0,0,1.94-4.93V89.28a.25.25,0,0,0-.14-.26.42.42,0,0,0-.36.15A9.91,9.91,0,0,1,227,91.83a11.13,11.13,0,0,1-5.66-1.46,10.27,10.27,0,0,1-4-4.09,12.48,12.48,0,0,1-1.45-6.1,11.94,11.94,0,0,1,1.5-6,10.64,10.64,0,0,1,4.07-4.08,11.56,11.56,0,0,1,5.73-1.44,9.52,9.52,0,0,1,7.25,2.79c.13.14.24.19.32.16s.13-.14.13-.31V69.63a.51.51,0,0,1,.5-.5h2.45a.44.44,0,0,1,.5.5V93a8.64,8.64,0,0,1-3.08,7.07,12.25,12.25,0,0,1-8,2.53A12.81,12.81,0,0,1,222,101.6Zm9.75-14.07A7.38,7.38,0,0,0,234.5,85a1.59,1.59,0,0,0,.25-.89V76.32a1.46,1.46,0,0,0-.25-.89,7.27,7.27,0,0,0-2.75-2.55,8.41,8.41,0,0,0-4.05-.95,7.74,7.74,0,0,0-5.83,2.3,8.19,8.19,0,0,0-2.22,6,8.3,8.3,0,0,0,2.22,6,7.77,7.77,0,0,0,5.83,2.3A8.41,8.41,0,0,0,231.75,87.53Z"}"></path><path d="${"M245.87,62.9a2.63,2.63,0,0,1-.82-1.93,2.53,2.53,0,0,1,.82-1.89,2.66,2.66,0,0,1,1.93-.81,2.54,2.54,0,0,1,1.85.81,2.59,2.59,0,0,1,.8,1.89,2.69,2.69,0,0,1-.8,1.93,2.52,2.52,0,0,1-1.85.83A2.64,2.64,0,0,1,245.87,62.9Zm0,28.93V69.63a.44.44,0,0,1,.5-.5h2.65a.44.44,0,0,1,.5.5v22.2a.44.44,0,0,1-.5.5H246.4A.44.44,0,0,1,245.9,91.83Z"}"></path><path d="${"M261.17,91.37A10.52,10.52,0,0,1,257,87.1a14.36,14.36,0,0,1,0-12.72,10.45,10.45,0,0,1,4-4.25,11.27,11.27,0,0,1,5.78-1.5,11.16,11.16,0,0,1,5.72,1.5,10.57,10.57,0,0,1,4,4.12A12.14,12.14,0,0,1,278,80.18a10.81,10.81,0,0,1-.05,1.15.48.48,0,0,1-.5.4H259.8c-.4,0-.55.21-.45.65a8.21,8.21,0,0,0,2.52,5.25,7.73,7.73,0,0,0,5.43,2,8.84,8.84,0,0,0,6.55-2.9c.37-.37.65-.44.85-.21l1.65,1.81c.23.2.23.41,0,.65a12.75,12.75,0,0,1-4.13,2.92,12.11,12.11,0,0,1-4.92,1A12.34,12.34,0,0,1,261.17,91.37ZM274.1,78.23a7.65,7.65,0,0,0-2.47-4.58,7.63,7.63,0,0,0-9.71,0,7.47,7.47,0,0,0-2.47,4.58l-.05.24c0,.2.16.31.5.31h13.75Q274.25,78.83,274.1,78.23Z"}"></path><path d="${"M294.55,68.68c.3,0,.45.16.45.5v2.65c0,.29-.12.44-.35.44a3.51,3.51,0,0,1-.72-.07,3.65,3.65,0,0,0-.68-.08,6.3,6.3,0,0,0-5.5,3,2.11,2.11,0,0,0-.35,1.24V91.83a.44.44,0,0,1-.5.5h-2.65a.44.44,0,0,1-.5-.5V69.63a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.79c0,.14,0,.22.1.26s.15,0,.25-.1a7.8,7.8,0,0,1,6.3-3A3.64,3.64,0,0,1,294.55,68.68Z"}"></path><path d="${"M302.82,91.37a10.52,10.52,0,0,1-4.17-4.27,14.32,14.32,0,0,1,0-12.72,10.49,10.49,0,0,1,4-4.25,11.79,11.79,0,0,1,11.51,0,10.61,10.61,0,0,1,4,4.12,12,12,0,0,1,1.45,5.93,10.81,10.81,0,0,1,0,1.15.49.49,0,0,1-.5.4H301.45c-.4,0-.55.21-.45.65a8.21,8.21,0,0,0,2.53,5.25,7.69,7.69,0,0,0,5.42,2,8.84,8.84,0,0,0,6.55-2.9c.36-.37.65-.44.85-.21L318,88.28c.23.2.23.41,0,.65a12.82,12.82,0,0,1-4.12,2.92,12.16,12.16,0,0,1-4.93,1A12.34,12.34,0,0,1,302.82,91.37Zm12.93-13.14a7.56,7.56,0,0,0-2.48-4.58,7,7,0,0,0-4.82-1.72,7.17,7.17,0,0,0-4.88,1.77,7.47,7.47,0,0,0-2.47,4.58l-.05.24c0,.2.17.31.5.31H315.3Q315.9,78.83,315.75,78.23Z"}"></path><path d="${"M328.55,92.33H325.9a.44.44,0,0,1-.5-.5V69.63a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.64c0,.14,0,.22.12.26s.18,0,.28-.15a8.35,8.35,0,0,1,2.65-2,7.7,7.7,0,0,1,3.4-.7A7.57,7.57,0,0,1,341,70.77a7.7,7.7,0,0,1,2.05,5.51V91.83a.44.44,0,0,1-.5.5H339.9a.44.44,0,0,1-.5-.5v-15a5.12,5.12,0,0,0-1.25-3.73,4.84,4.84,0,0,0-3.6-1.27,5.49,5.49,0,0,0-3,.85,6.74,6.74,0,0,0-2.25,2.44,2.33,2.33,0,0,0-.25,1.06v15.6A.44.44,0,0,1,328.55,92.33Z"}"></path><path d="${"M368.3,56.13H371a.44.44,0,0,1,.5.5v35.2a.44.44,0,0,1-.5.5H368.5a.44.44,0,0,1-.5-.5V90.08c0-.17,0-.26-.13-.28s-.19,0-.32.18c-1.7,1.89-4.17,2.85-7.4,2.85a11.22,11.22,0,0,1-5.8-1.53,10.94,10.94,0,0,1-4.1-4.27,14,14,0,0,1,0-12.6,11,11,0,0,1,4.1-4.28,11.31,11.31,0,0,1,5.8-1.52,10,10,0,0,1,7.2,2.64c.13.14.24.19.32.15s.13-.13.13-.3V56.63A.44.44,0,0,1,368.3,56.13Zm-3.5,32.39a7.2,7.2,0,0,0,2.8-2.7,1.78,1.78,0,0,0,.2-.79v-8.6a1.79,1.79,0,0,0-.2-.8,7.2,7.2,0,0,0-2.8-2.7,8.27,8.27,0,0,0-4.1-1,7.77,7.77,0,0,0-6,2.42,8.93,8.93,0,0,0-2.28,6.37,8.92,8.92,0,0,0,2.28,6.38,7.77,7.77,0,0,0,6,2.42A8.27,8.27,0,0,0,364.8,88.52Z"}"></path><path d="${"M382.57,91.37a10.52,10.52,0,0,1-4.17-4.27,14.32,14.32,0,0,1,0-12.72,10.45,10.45,0,0,1,4.05-4.25,11.77,11.77,0,0,1,11.5,0,10.61,10.61,0,0,1,4,4.12,12,12,0,0,1,1.45,5.93,10.81,10.81,0,0,1,0,1.15.49.49,0,0,1-.5.4H381.2c-.4,0-.55.21-.45.65a8.21,8.21,0,0,0,2.53,5.25,7.69,7.69,0,0,0,5.42,2,8.84,8.84,0,0,0,6.55-2.9c.36-.37.65-.44.85-.21l1.65,1.81c.23.2.23.41,0,.65a12.82,12.82,0,0,1-4.12,2.92,12.16,12.16,0,0,1-4.93,1A12.34,12.34,0,0,1,382.57,91.37ZM395.5,78.23A7.56,7.56,0,0,0,393,73.65a7,7,0,0,0-4.82-1.72,7.17,7.17,0,0,0-4.88,1.77,7.47,7.47,0,0,0-2.47,4.58l-.05.24c0,.2.17.31.5.31h13.75Q395.65,78.83,395.5,78.23Z"}"></path><path d="${"M435,58.53a8.25,8.25,0,0,1,3.45,3.29,9.65,9.65,0,0,1,1.18,4.76A8.47,8.47,0,0,1,438.45,71a8.18,8.18,0,0,1-3.1,3.08c-.33.2-.33.38,0,.55a8.91,8.91,0,0,1,5,8.15,9.17,9.17,0,0,1-2.8,6.9q-2.81,2.7-7.9,2.7h-10.1a.44.44,0,0,1-.5-.5v-34a.44.44,0,0,1,.5-.5h10A11.47,11.47,0,0,1,435,58.53Zm-12.22,2.59V72.47c0,.17.08.26.25.26h6.1a7.13,7.13,0,0,0,4.95-1.55,5.62,5.62,0,0,0,1.7-4.35,5.69,5.69,0,0,0-1.7-4.38,7,7,0,0,0-4.95-1.57H423C422.83,60.88,422.75,61,422.75,61.12Zm0,15.4v12c0,.17.08.26.25.26h6.3a7.76,7.76,0,0,0,5.37-1.65,6.7,6.7,0,0,0,0-9.2,7.76,7.76,0,0,0-5.37-1.65H423C422.83,76.28,422.75,76.36,422.75,76.52Z"}"></path><path d="${"M461.05,69.13h2.65a.44.44,0,0,1,.5.5v22.2a.44.44,0,0,1-.5.5h-2.4a.44.44,0,0,1-.5-.5V90.17c0-.13,0-.21-.13-.24s-.19,0-.32.15a7.62,7.62,0,0,1-6.05,2.75,7.5,7.5,0,0,1-5.73-2.15,7.71,7.71,0,0,1-2-5.5V69.63a.44.44,0,0,1,.5-.5h2.65a.44.44,0,0,1,.5.5v15a5.07,5.07,0,0,0,1.25,3.72,4.81,4.81,0,0,0,3.6,1.28,5.57,5.57,0,0,0,3-.85,6.77,6.77,0,0,0,2.25-2.45,2.39,2.39,0,0,0,.25-1V69.63A.44.44,0,0,1,461.05,69.13ZM448.6,62.9a2.69,2.69,0,0,1-.8-1.93,2.7,2.7,0,0,1,5.4,0,2.69,2.69,0,0,1-.8,1.93,2.58,2.58,0,0,1-1.9.83A2.55,2.55,0,0,1,448.6,62.9Zm9.85,0a2.65,2.65,0,0,1-.8-1.93,2.75,2.75,0,0,1,2.7-2.7,2.75,2.75,0,0,1,2.7,2.7,2.69,2.69,0,0,1-.8,1.93,2.59,2.59,0,0,1-3.8,0Z"}"></path><path d="${"M482.6,68.68c.3,0,.45.16.45.5v2.65c0,.29-.12.44-.35.44a3.75,3.75,0,0,1-.73-.07,3.47,3.47,0,0,0-.67-.08,6.29,6.29,0,0,0-5.5,3,2,2,0,0,0-.35,1.24V91.83a.44.44,0,0,1-.5.5H472.3a.44.44,0,0,1-.5-.5V69.63a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.79c0,.14,0,.22.1.26s.15,0,.25-.1a7.8,7.8,0,0,1,6.3-3A3.64,3.64,0,0,1,482.6,68.68Z"}"></path><path d="${"M491.45,101.6a11.5,11.5,0,0,1-3.9-2.78.48.48,0,0,1,0-.7l1.7-1.85a.53.53,0,0,1,.35-.19.56.56,0,0,1,.35.19,8.3,8.3,0,0,0,6.75,3,8.39,8.39,0,0,0,5.5-1.63,6.05,6.05,0,0,0,1.95-4.93V89.28A.25.25,0,0,0,504,89a.4.4,0,0,0-.35.15,10,10,0,0,1-7.2,2.66,11.09,11.09,0,0,1-5.65-1.46,10.23,10.23,0,0,1-4-4.09,12.48,12.48,0,0,1-1.45-6.1,11.94,11.94,0,0,1,1.5-6,10.64,10.64,0,0,1,4.07-4.08,11.56,11.56,0,0,1,5.73-1.44,9.52,9.52,0,0,1,7.25,2.79c.13.14.24.19.32.16s.13-.14.13-.31V69.63a.51.51,0,0,1,.5-.5h2.45a.44.44,0,0,1,.5.5V93a8.66,8.66,0,0,1-3.07,7.07,12.29,12.29,0,0,1-8,2.53A12.81,12.81,0,0,1,491.45,101.6Zm9.75-14.07A7.38,7.38,0,0,0,504,85a1.59,1.59,0,0,0,.25-.89V76.32a1.46,1.46,0,0,0-.25-.89,7.27,7.27,0,0,0-2.75-2.55,8.41,8.41,0,0,0-4.05-.95,7.74,7.74,0,0,0-5.83,2.3,8.19,8.19,0,0,0-2.22,6,8.3,8.3,0,0,0,2.22,6,7.77,7.77,0,0,0,5.83,2.3A8.41,8.41,0,0,0,501.2,87.53Z"}"></path><path d="${"M519.37,91.37a10.52,10.52,0,0,1-4.17-4.27,14.36,14.36,0,0,1,0-12.72,10.58,10.58,0,0,1,4.05-4.25,11.79,11.79,0,0,1,11.51,0,10.61,10.61,0,0,1,4,4.12,12,12,0,0,1,1.45,5.93,10.81,10.81,0,0,1-.05,1.15.49.49,0,0,1-.5.4H518c-.4,0-.55.21-.45.65a8.25,8.25,0,0,0,2.52,5.25,7.73,7.73,0,0,0,5.43,2,8.84,8.84,0,0,0,6.55-2.9c.36-.37.65-.44.85-.21l1.65,1.81c.23.2.23.41,0,.65a12.82,12.82,0,0,1-4.12,2.92,12.16,12.16,0,0,1-4.93,1A12.32,12.32,0,0,1,519.37,91.37ZM532.3,78.23a7.56,7.56,0,0,0-2.48-4.58A7,7,0,0,0,525,71.93a7.17,7.17,0,0,0-4.88,1.77,7.47,7.47,0,0,0-2.47,4.58l0,.24c0,.2.17.31.5.31h13.75Q532.45,78.83,532.3,78.23Z"}"></path><path d="${"M552.75,68.68c.3,0,.45.16.45.5v2.65c0,.29-.12.44-.35.44a3.83,3.83,0,0,1-.73-.07,3.47,3.47,0,0,0-.67-.08,6.29,6.29,0,0,0-5.5,3,2,2,0,0,0-.35,1.24V91.83a.44.44,0,0,1-.5.5h-2.65a.44.44,0,0,1-.5-.5V69.63a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.79c0,.14,0,.22.1.26s.15,0,.25-.1a7.8,7.8,0,0,1,6.3-3A3.64,3.64,0,0,1,552.75,68.68Z"}"></path><path d="${"M561,92.33h-2.65a.44.44,0,0,1-.5-.5V69.63a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.64c0,.14,0,.22.12.26s.18,0,.28-.15a7.6,7.6,0,0,1,6.05-2.75,8.51,8.51,0,0,1,4.13.94,7.26,7.26,0,0,1,2.72,2.61c.13.23.3.23.5,0a11.51,11.51,0,0,1,3-2.63,7.24,7.24,0,0,1,3.75-.92,7.5,7.5,0,0,1,5.73,2.14,7.76,7.76,0,0,1,2,5.51V91.83a.44.44,0,0,1-.5.5h-2.65a.44.44,0,0,1-.5-.5v-15a5.05,5.05,0,0,0-1.28-3.73A4.88,4.88,0,0,0,581,71.88a5.71,5.71,0,0,0-5.15,3.2,2.27,2.27,0,0,0-.3,1.2V91.83a.44.44,0,0,1-.5.5h-2.65a.44.44,0,0,1-.5-.5v-15a5.12,5.12,0,0,0-1.25-3.73,4.84,4.84,0,0,0-3.6-1.27,5.49,5.49,0,0,0-3,.85,6.74,6.74,0,0,0-2.25,2.44,2.44,2.44,0,0,0-.25,1.11V91.83A.44.44,0,0,1,561,92.33Z"}"></path><path d="${"M600.83,91.37a10.48,10.48,0,0,1-4.18-4.27,14.32,14.32,0,0,1,0-12.72,10.45,10.45,0,0,1,4-4.25,11.77,11.77,0,0,1,11.5,0,10.61,10.61,0,0,1,4,4.12,12,12,0,0,1,1.45,5.93,10.81,10.81,0,0,1,0,1.15.49.49,0,0,1-.5.4H599.45c-.4,0-.55.21-.45.65a8.21,8.21,0,0,0,2.53,5.25,7.69,7.69,0,0,0,5.42,2,8.84,8.84,0,0,0,6.55-2.9c.37-.37.65-.44.85-.21L616,88.28c.23.2.23.41,0,.65a12.82,12.82,0,0,1-4.12,2.92,12.86,12.86,0,0,1-11-.48Zm12.92-13.14a7.56,7.56,0,0,0-2.48-4.58,7,7,0,0,0-4.82-1.72,7.17,7.17,0,0,0-4.88,1.77,7.47,7.47,0,0,0-2.47,4.58l-.05.24c0,.2.17.31.5.31H613.3Q613.9,78.83,613.75,78.23Z"}"></path><path d="${"M623.37,62.9a2.67,2.67,0,0,1-.82-1.93,2.57,2.57,0,0,1,.82-1.89,2.68,2.68,0,0,1,1.93-.81,2.52,2.52,0,0,1,1.85.81A2.59,2.59,0,0,1,628,61a2.69,2.69,0,0,1-.8,1.93,2.5,2.5,0,0,1-1.85.83A2.66,2.66,0,0,1,623.37,62.9Zm0,28.93V69.63a.44.44,0,0,1,.5-.5h2.65a.44.44,0,0,1,.5.5v22.2a.44.44,0,0,1-.5.5H623.9A.44.44,0,0,1,623.4,91.83Z"}"></path><path d="${"M635.88,91.37a7.73,7.73,0,0,1-2.83-4l0-.21c0-.2.11-.33.35-.39l2.4-.85.2-.05c.2,0,.35.13.45.4a4.47,4.47,0,0,0,1.72,2.5,4.64,4.64,0,0,0,2.73.89,4.54,4.54,0,0,0,3.2-1,3.43,3.43,0,0,0,1.1-2.62,3.08,3.08,0,0,0-1.07-2.5,6.35,6.35,0,0,0-3-1.26l-2-.39a6.79,6.79,0,0,1-4.05-2.28,6.71,6.71,0,0,1-.55-7.67,6.58,6.58,0,0,1,2.68-2.43,8.47,8.47,0,0,1,3.87-.87,7.62,7.62,0,0,1,4.67,1.42,7.36,7.36,0,0,1,2.68,4.07l.05.2c0,.21-.14.35-.4.46l-2.35.6-.2.05c-.2,0-.33-.13-.4-.4a4.4,4.4,0,0,0-1.43-2.35,3.93,3.93,0,0,0-2.62-.85,4.09,4.09,0,0,0-2.82.94,3.08,3.08,0,0,0-1.08,2.4,3,3,0,0,0,.85,2.31,5.31,5.31,0,0,0,2.55,1.15l2,.39A8.39,8.39,0,0,1,647,81.35a7,7,0,0,1-.39,9.6,8.27,8.27,0,0,1-5.78,1.92A8.1,8.1,0,0,1,635.88,91.37Z"}"></path><path d="${"M656.05,60.08l2.7-1.46a.87.87,0,0,1,.25,0c.23,0,.35.13.35.4v9.9a.22.22,0,0,0,.25.25h2.75a.44.44,0,0,1,.5.5v2.14a.44.44,0,0,1-.5.5H659.6c-.17,0-.25.09-.25.26v19.3a.44.44,0,0,1-.5.5H656.2a.44.44,0,0,1-.5-.5V72.53c0-.17-.08-.26-.25-.26H652.7a.44.44,0,0,1-.5-.5V69.63a.44.44,0,0,1,.5-.5h2.75a.22.22,0,0,0,.25-.25v-8.2A.59.59,0,0,1,656.05,60.08Z"}"></path><path d="${"M671.87,91.37a10.52,10.52,0,0,1-4.17-4.27,14.36,14.36,0,0,1,0-12.72,10.58,10.58,0,0,1,4.05-4.25,11.3,11.3,0,0,1,5.78-1.5,11.13,11.13,0,0,1,5.72,1.5,10.57,10.57,0,0,1,4,4.12,12,12,0,0,1,1.45,5.93,10.81,10.81,0,0,1-.05,1.15.49.49,0,0,1-.5.4H670.5c-.4,0-.55.21-.45.65a8.21,8.21,0,0,0,2.52,5.25,7.73,7.73,0,0,0,5.43,2,8.84,8.84,0,0,0,6.55-2.9c.36-.37.65-.44.85-.21l1.65,1.81c.23.2.23.41,0,.65a12.82,12.82,0,0,1-4.12,2.92,12.19,12.19,0,0,1-4.93,1A12.32,12.32,0,0,1,671.87,91.37ZM684.8,78.23a7.61,7.61,0,0,0-2.48-4.58,7,7,0,0,0-4.82-1.72,7.17,7.17,0,0,0-4.88,1.77,7.47,7.47,0,0,0-2.47,4.58l0,.24c0,.2.16.31.5.31h13.75Q685,78.83,684.8,78.23Z"}"></path><path d="${"M705.25,68.68c.3,0,.45.16.45.5v2.65c0,.29-.12.44-.35.44a3.83,3.83,0,0,1-.73-.07,3.47,3.47,0,0,0-.67-.08,6.29,6.29,0,0,0-5.5,3,2,2,0,0,0-.35,1.24V91.83a.44.44,0,0,1-.5.5H695a.44.44,0,0,1-.5-.5V69.63a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.79c0,.14,0,.22.1.26s.15,0,.25-.1a7.8,7.8,0,0,1,6.3-3A3.64,3.64,0,0,1,705.25,68.68Z"}"></path><path d="${"M86.15,133.83H89c.36,0,.5.19.4.55L82,156.63a.6.6,0,0,1-.64.4H77.5a.61.61,0,0,1-.65-.4l-7.36-22.25,0-.2c0-.23.15-.35.45-.35h2.8a.58.58,0,0,1,.6.4l6,18.46a.18.18,0,0,0,.17.14c.09,0,.14-.05.18-.14l5.94-18.46A.6.6,0,0,1,86.15,133.83Z"}"></path><path d="${"M98.22,155.91a11.68,11.68,0,0,1-4.2-4.4,12.9,12.9,0,0,1,0-12.15,11.61,11.61,0,0,1,4.2-4.4,11.77,11.77,0,0,1,12,0,11.53,11.53,0,0,1,4.2,4.4,12.83,12.83,0,0,1,0,12.15,11.6,11.6,0,0,1-4.2,4.4,11.83,11.83,0,0,1-12,0Zm10.1-2.9a8,8,0,0,0,2.85-3.18,9.91,9.91,0,0,0,0-8.8,8,8,0,0,0-2.85-3.17,7.8,7.8,0,0,0-8.25,0A8.09,8.09,0,0,0,97.22,141a10,10,0,0,0,0,8.8,8.05,8.05,0,0,0,2.85,3.18,7.86,7.86,0,0,0,8.25,0Z"}"></path><path d="${"M125,157h-2.65a.44.44,0,0,1-.5-.5v-22.2a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5V136c0,.14,0,.22.12.25s.18,0,.28-.15A8.5,8.5,0,0,1,128.3,134a7.85,7.85,0,0,1,3.4-.7,7.58,7.58,0,0,1,5.75,2.15,7.69,7.69,0,0,1,2.05,5.5v15.55a.44.44,0,0,1-.5.5h-2.65a.44.44,0,0,1-.5-.5V141.58a5.12,5.12,0,0,0-1.25-3.72,4.84,4.84,0,0,0-3.6-1.28,5.49,5.49,0,0,0-3,.85,6.77,6.77,0,0,0-2.25,2.45,2.26,2.26,0,0,0-.25,1.05v15.6A.44.44,0,0,1,125,157Z"}"></path><path d="${"M176.67,123.23a8.21,8.21,0,0,1,3.45,3.3,9.62,9.62,0,0,1,1.18,4.75,8.63,8.63,0,0,1-1.15,4.38,8.23,8.23,0,0,1-3.1,3.07c-.33.2-.33.39,0,.55a9.08,9.08,0,0,1,3.65,3.3,9,9,0,0,1,1.35,4.85,9.16,9.16,0,0,1-2.8,6.9c-1.87,1.8-4.5,2.7-7.91,2.7H161.25a.44.44,0,0,1-.5-.5v-34a.44.44,0,0,1,.5-.5h10A11.47,11.47,0,0,1,176.67,123.23Zm-12.22,2.6v11.35a.22.22,0,0,0,.25.25h6.1a7.05,7.05,0,0,0,4.94-1.55,5.56,5.56,0,0,0,1.71-4.35,5.65,5.65,0,0,0-1.71-4.37,7,7,0,0,0-4.94-1.58h-6.1A.22.22,0,0,0,164.45,125.83Zm0,15.4v12a.22.22,0,0,0,.25.25H171a7.76,7.76,0,0,0,5.37-1.65,6.7,6.7,0,0,0,0-9.2A7.76,7.76,0,0,0,171,141h-6.3A.22.22,0,0,0,164.45,141.23Z"}"></path><path d="${"M192.92,156.08a10.48,10.48,0,0,1-4.18-4.27,14.43,14.43,0,0,1,0-12.73,10.57,10.57,0,0,1,4.05-4.25,11.77,11.77,0,0,1,11.5,0,10.57,10.57,0,0,1,4,4.13,12,12,0,0,1,1.46,5.92,8.34,8.34,0,0,1-.06,1.15.47.47,0,0,1-.5.41H191.55c-.4,0-.55.21-.46.64a8.19,8.19,0,0,0,2.53,5.25,7.69,7.69,0,0,0,5.42,1.95,8.79,8.79,0,0,0,6.55-2.9c.37-.37.66-.43.85-.2l1.66,1.8a.39.39,0,0,1,0,.65,12.78,12.78,0,0,1-4.13,2.93,12.13,12.13,0,0,1-4.93,1A12.31,12.31,0,0,1,192.92,156.08Zm12.93-13.15a7.62,7.62,0,0,0-2.48-4.57,7.58,7.58,0,0,0-9.7,0A7.45,7.45,0,0,0,191.2,143l0,.25c0,.2.16.3.5.3H205.4Q206,143.53,205.85,142.93Z"}"></path><path d="${"M226.3,133.38c.29,0,.44.17.44.5v2.65c0,.3-.11.45-.35.45a3.05,3.05,0,0,1-.72-.08,4.49,4.49,0,0,0-.67-.07,6.33,6.33,0,0,0-5.51,2.95,2.17,2.17,0,0,0-.35,1.25v15.5a.44.44,0,0,1-.5.5H216a.44.44,0,0,1-.5-.5v-22.2a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.8c0,.14,0,.22.1.25s.14,0,.25-.1a7.79,7.79,0,0,1,6.29-2.95A4.59,4.59,0,0,1,226.3,133.38Z"}"></path><path d="${"M237.6,154.48v2.25a.44.44,0,0,1-.5.5h-.91a5.37,5.37,0,0,1-3.64-1.12,4.35,4.35,0,0,1-1.3-3.48v-31.3a.44.44,0,0,1,.5-.5h2.65a.44.44,0,0,1,.5.5v30.85q0,1.8,1.5,1.8h.7A.44.44,0,0,1,237.6,154.48Z"}"></path><path d="${"M243.27,127.6a2.61,2.61,0,0,1-.83-1.92,2.56,2.56,0,0,1,.83-1.9,2.69,2.69,0,0,1,1.93-.8,2.56,2.56,0,0,1,1.85.8,2.6,2.6,0,0,1,.79,1.9,2.64,2.64,0,0,1-.79,1.92,2.48,2.48,0,0,1-1.85.83A2.61,2.61,0,0,1,243.27,127.6Zm0,28.93v-22.2a.44.44,0,0,1,.5-.5h2.66a.44.44,0,0,1,.5.5v22.2a.44.44,0,0,1-.5.5h-2.66A.44.44,0,0,1,243.29,156.53Z"}"></path><path d="${"M257.7,157h-2.65a.44.44,0,0,1-.5-.5v-22.2a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5V136c0,.14,0,.22.12.25s.18,0,.27-.15A8.65,8.65,0,0,1,261,134a7.8,7.8,0,0,1,3.39-.7,7.56,7.56,0,0,1,5.75,2.15,7.65,7.65,0,0,1,2.05,5.5v15.55a.44.44,0,0,1-.5.5h-2.64a.44.44,0,0,1-.5-.5V141.58a5.08,5.08,0,0,0-1.26-3.72,4.8,4.8,0,0,0-3.59-1.28,5.55,5.55,0,0,0-3,.85,6.84,6.84,0,0,0-2.24,2.45,2.26,2.26,0,0,0-.25,1.05v15.6A.44.44,0,0,1,257.7,157Z"}"></path><path d="${"M74.62,220.49a11.22,11.22,0,0,1-4.28-5.8l0-.2a.48.48,0,0,1,.35-.45l2.55-1a.58.58,0,0,1,.25-.05.35.35,0,0,1,.25.1.87.87,0,0,1,.15.25,7.69,7.69,0,0,0,2.87,4.2,8.21,8.21,0,0,0,4.93,1.5,7.71,7.71,0,0,0,5.47-1.8,6.7,6.7,0,0,0,.2-9.2,9.09,9.09,0,0,0-4.72-2.3l-2.55-.5A11.18,11.18,0,0,1,73.72,202a8.92,8.92,0,0,1-2.32-6.37,9.25,9.25,0,0,1,1.35-4.88,9.7,9.7,0,0,1,3.72-3.52,11.11,11.11,0,0,1,15.93,5.9.3.3,0,0,1,0,.2.49.49,0,0,1-.35.45l-2.6,1.1a.62.62,0,0,1-.25,0,.33.33,0,0,1-.25-.1.58.58,0,0,1-.15-.25,8,8,0,0,0-2.78-3.7,7,7,0,0,0-4.17-1.35,6.67,6.67,0,0,0-4.83,1.7,5.76,5.76,0,0,0-1.77,4.35,5.56,5.56,0,0,0,1.4,3.9,7.08,7.08,0,0,0,4.15,2.05l2.55.5a13.68,13.68,0,0,1,6.85,3.4,9,9,0,0,1,2.7,6.9,10.19,10.19,0,0,1-1.38,5.25,9.62,9.62,0,0,1-3.95,3.7,12.76,12.76,0,0,1-6,1.35A11.94,11.94,0,0,1,74.62,220.49Z"}"></path><path d="${"M103.32,220.79a10.55,10.55,0,0,1-4.17-4.28,14.36,14.36,0,0,1,0-12.72,10.71,10.71,0,0,1,4-4.25,11.79,11.79,0,0,1,11.51,0,10.75,10.75,0,0,1,4,4.12,12,12,0,0,1,1.45,5.93,10.81,10.81,0,0,1-.05,1.15.49.49,0,0,1-.5.4H102c-.4,0-.55.21-.45.65A8.23,8.23,0,0,0,104,217a7.73,7.73,0,0,0,5.43,2,8.84,8.84,0,0,0,6.55-2.9c.36-.37.65-.43.85-.2l1.65,1.8c.23.2.23.41,0,.65a12.82,12.82,0,0,1-4.12,2.92,12,12,0,0,1-4.93,1A12.32,12.32,0,0,1,103.32,220.79Zm12.93-13.15a7.59,7.59,0,0,0-2.48-4.58,7.6,7.6,0,0,0-9.7.06,7.42,7.42,0,0,0-2.47,4.57l0,.25c0,.2.17.3.5.3H115.8Q116.4,208.24,116.25,207.64Z"}"></path><path d="${"M129.05,221.74H126.4a.44.44,0,0,1-.5-.5V199a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.65a.25.25,0,0,0,.12.25c.09,0,.18,0,.28-.15a8.35,8.35,0,0,1,2.65-2,7.7,7.7,0,0,1,3.4-.7,7.58,7.58,0,0,1,5.75,2.15,7.66,7.66,0,0,1,2.05,5.5v15.55a.44.44,0,0,1-.5.5H140.4a.44.44,0,0,1-.5-.5v-15a5.14,5.14,0,0,0-1.25-3.73,4.84,4.84,0,0,0-3.6-1.27,5.49,5.49,0,0,0-3,.85,6.69,6.69,0,0,0-2.25,2.45,2.26,2.26,0,0,0-.25,1v15.6A.44.44,0,0,1,129.05,221.74Z"}"></path><path d="${"M154.85,220.71a10.94,10.94,0,0,1-4.1-4.27,14,14,0,0,1,0-12.6,10.88,10.88,0,0,1,4.1-4.27,11.22,11.22,0,0,1,5.8-1.53,9.38,9.38,0,0,1,7.55,3.1.18.18,0,0,0,.2.05c.07,0,.1-.1.1-.2v-2a.44.44,0,0,1,.5-.5h2.45a.44.44,0,0,1,.5.5v22.2a.44.44,0,0,1-.5.5H169a.44.44,0,0,1-.5-.5v-2c0-.1,0-.17-.1-.2a.16.16,0,0,0-.2,0,10.28,10.28,0,0,1-7.55,3.1A11.22,11.22,0,0,1,154.85,220.71Zm10.55-2.77a6.28,6.28,0,0,0,2.7-2.7,2,2,0,0,0,.2-.9v-8.4a2,2,0,0,0-.2-.9,6.83,6.83,0,0,0-2.78-2.7,8.38,8.38,0,0,0-4.12-1,7.78,7.78,0,0,0-6,2.43,10,10,0,0,0,0,12.74,7.78,7.78,0,0,0,6,2.43A8.8,8.8,0,0,0,165.4,217.94Z"}"></path><path d="${"M181.1,189.49l2.7-1.45a.58.58,0,0,1,.25,0c.23,0,.35.13.35.4v9.9a.22.22,0,0,0,.25.25h2.75a.44.44,0,0,1,.5.5v2.15a.44.44,0,0,1-.5.5h-2.75a.22.22,0,0,0-.25.25v19.3a.44.44,0,0,1-.5.5h-2.65a.44.44,0,0,1-.5-.5v-19.3a.22.22,0,0,0-.25-.25h-2.75a.44.44,0,0,1-.5-.5V199a.44.44,0,0,1,.5-.5h2.75a.22.22,0,0,0,.25-.25v-8.2A.58.58,0,0,1,181.1,189.49Z"}"></path><path d="${"M194.17,220.79a7.8,7.8,0,0,1-2.82-4l0-.2a.4.4,0,0,1,.35-.4l2.4-.85.2-.05c.2,0,.35.13.45.4a4.43,4.43,0,0,0,1.72,2.5,4.67,4.67,0,0,0,2.73.9,4.51,4.51,0,0,0,3.2-1,3.42,3.42,0,0,0,1.1-2.62,3.07,3.07,0,0,0-1.08-2.5,6.3,6.3,0,0,0-3-1.25l-2-.4a6.83,6.83,0,0,1-4.05-2.27,6.42,6.42,0,0,1-1.5-4.28,6.32,6.32,0,0,1,1-3.4,6.56,6.56,0,0,1,2.67-2.43,8.48,8.48,0,0,1,3.88-.87,7.62,7.62,0,0,1,4.67,1.42,7.35,7.35,0,0,1,2.68,4.08l.05.2c0,.2-.13.35-.4.45l-2.35.6-.2.05c-.2,0-.34-.13-.4-.4a4.43,4.43,0,0,0-1.43-2.35,3.93,3.93,0,0,0-2.62-.85,4.09,4.09,0,0,0-2.83.95,3,3,0,0,0-1.07,2.4,3,3,0,0,0,.85,2.3,5.27,5.27,0,0,0,2.55,1.15l2,.4a8.35,8.35,0,0,1,4.52,2.32,6.45,6.45,0,0,1,1.73,4.68,6.33,6.33,0,0,1-2.13,4.92,8.23,8.23,0,0,1-5.77,1.93A8.13,8.13,0,0,1,194.17,220.79Z"}"></path><path d="${"M225.7,221.29l-5.95-10c-.07-.17-.16-.26-.28-.28a.38.38,0,0,0-.33.18l-2.09,2.5a1.46,1.46,0,0,0-.3.9v6.65a.49.49,0,0,1-.15.35.55.55,0,0,1-.4.15h-2.6a.44.44,0,0,1-.5-.5V186a.44.44,0,0,1,.5-.5h2.6a.55.55,0,0,1,.4.15.49.49,0,0,1,.15.35v22.15c0,.2,0,.31.15.33s.21-.07.35-.23l7.8-9.45a.74.74,0,0,1,.6-.3h3.45a.42.42,0,0,1,.4.2.43.43,0,0,1-.1.45l-7,8.4a1,1,0,0,0-.23.43.61.61,0,0,0,.13.42l7.55,12.7a.69.69,0,0,1,.1.3c0,.2-.16.3-.45.3h-3.05A.8.8,0,0,1,225.7,221.29Z"}"></path><path d="${"M238.2,220.71a10.87,10.87,0,0,1-4.1-4.27,14,14,0,0,1,0-12.6,10.81,10.81,0,0,1,4.1-4.27A11.2,11.2,0,0,1,244,198a9.39,9.39,0,0,1,7.55,3.1.17.17,0,0,0,.2.05.21.21,0,0,0,.1-.2v-2a.44.44,0,0,1,.5-.5h2.45a.44.44,0,0,1,.5.5v22.2a.44.44,0,0,1-.5.5h-2.45a.44.44,0,0,1-.5-.5v-2a.21.21,0,0,0-.1-.2.16.16,0,0,0-.2,0,10.28,10.28,0,0,1-7.55,3.1A11.2,11.2,0,0,1,238.2,220.71Zm10.55-2.77a6.28,6.28,0,0,0,2.7-2.7,2,2,0,0,0,.2-.9v-8.4a2,2,0,0,0-.2-.9,6.89,6.89,0,0,0-2.78-2.7,8.4,8.4,0,0,0-4.12-1,7.81,7.81,0,0,0-6,2.43,10.07,10.07,0,0,0,0,12.74,7.81,7.81,0,0,0,6,2.43A8.78,8.78,0,0,0,248.75,217.94Z"}"></path><path d="${"M266.1,221.74h-2.65a.44.44,0,0,1-.5-.5V199a.44.44,0,0,1,.5-.5h2.4a.44.44,0,0,1,.5.5v1.65a.25.25,0,0,0,.12.25c.08,0,.18,0,.28-.15a8.35,8.35,0,0,1,2.65-2,7.67,7.67,0,0,1,3.4-.7,7.23,7.23,0,0,1,7.8,7.65v15.55a.44.44,0,0,1-.5.5h-2.65a.44.44,0,0,1-.5-.5v-15a5.14,5.14,0,0,0-1.25-3.73,4.8,4.8,0,0,0-3.6-1.27,5.49,5.49,0,0,0-3,.85,6.69,6.69,0,0,0-2.25,2.45,2.26,2.26,0,0,0-.25,1v15.6A.44.44,0,0,1,266.1,221.74Z"}"></path><path d="${"M291.7,218.59h12.05c.33,0,.5.18.5.55v2.1a.44.44,0,0,1-.5.5H286.5c-.4,0-.6-.17-.6-.5a.8.8,0,0,1,.15-.5L298,202c.09-.2.05-.3-.15-.3H286.45a.44.44,0,0,1-.5-.5V199a.44.44,0,0,1,.5-.5h16.6c.37,0,.55.16.55.5a.92.92,0,0,1-.16.5L291.5,218.29C291.4,218.49,291.46,218.59,291.7,218.59Z"}"></path><path d="${"M315.7,219.19v2.25a.44.44,0,0,1-.5.5h-.9a5.4,5.4,0,0,1-3.65-1.13,4.33,4.33,0,0,1-1.3-3.47V186a.44.44,0,0,1,.5-.5h2.65a.44.44,0,0,1,.5.5v30.85q0,1.8,1.5,1.8h.7A.44.44,0,0,1,315.7,219.19Z"}"></path><path d="${"M325,220.79a10.55,10.55,0,0,1-4.17-4.28,14.36,14.36,0,0,1,0-12.72,10.57,10.57,0,0,1,4.05-4.25,11.27,11.27,0,0,1,5.78-1.5,11.16,11.16,0,0,1,5.72,1.5,10.71,10.71,0,0,1,4,4.12,12.13,12.13,0,0,1,1.44,5.93,11.37,11.37,0,0,1,0,1.15.49.49,0,0,1-.5.4H323.6c-.41,0-.56.21-.45.65a8.18,8.18,0,0,0,2.52,5.25,7.73,7.73,0,0,0,5.43,2,8.84,8.84,0,0,0,6.55-2.9c.36-.37.65-.43.85-.2l1.65,1.8c.23.2.23.41,0,.65a12.75,12.75,0,0,1-4.13,2.92,12,12,0,0,1-4.92,1A12.34,12.34,0,0,1,325,220.79Zm12.92-13.15a7.58,7.58,0,0,0-2.47-4.58,7.6,7.6,0,0,0-9.7.06,7.37,7.37,0,0,0-2.47,4.57l-.06.25c0,.2.17.3.5.3h13.76C337.85,208.24,338,208,337.89,207.64Z"}"></path><path d="${"M347.52,192.31a2.64,2.64,0,0,1-.83-1.92,2.56,2.56,0,0,1,.83-1.9,2.69,2.69,0,0,1,1.93-.8,2.56,2.56,0,0,1,1.85.8,2.6,2.6,0,0,1,.79,1.9,2.68,2.68,0,0,1-.79,1.92,2.52,2.52,0,0,1-1.85.83A2.64,2.64,0,0,1,347.52,192.31Zm0,28.93V199c0-.34.16-.5.49-.5h2.66a.44.44,0,0,1,.5.5v22.2a.44.44,0,0,1-.5.5H348A.44.44,0,0,1,347.55,221.24Z"}"></path></svg>`;
});
const MulitlineText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "" } = $$props;
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  let { width = 0 } = $$props;
  let { lineHeight = 1.2 } = $$props;
  let { fontSize = 16 } = $$props;
  let { fontFamily = "Arial" } = $$props;
  let { fontStyle = "" } = $$props;
  let { fontFill = "#292929" } = $$props;
  let lines = [];
  let canvas;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.lineHeight === void 0 && $$bindings.lineHeight && lineHeight !== void 0)
    $$bindings.lineHeight(lineHeight);
  if ($$props.fontSize === void 0 && $$bindings.fontSize && fontSize !== void 0)
    $$bindings.fontSize(fontSize);
  if ($$props.fontFamily === void 0 && $$bindings.fontFamily && fontFamily !== void 0)
    $$bindings.fontFamily(fontFamily);
  if ($$props.fontStyle === void 0 && $$bindings.fontStyle && fontStyle !== void 0)
    $$bindings.fontStyle(fontStyle);
  if ($$props.fontFill === void 0 && $$bindings.fontFill && fontFill !== void 0)
    $$bindings.fontFill(fontFill);
  return `


<text${add_attribute("x", x, 0)}${add_attribute("y", y, 0)}${add_attribute("font-size", fontSize, 0)}${add_attribute("font-family", fontFamily, 0)}${add_attribute("font-style", fontStyle, 0)}${add_attribute("fill", fontFill, 0)}>${each(lines, (line, i) => {
    return `<tspan${add_attribute("x", x, 0)}${add_attribute(
      "dy",
      i === 0 ? 0 : (line.extraSpace ? 2 : 1) * lineHeight * fontSize,
      0
    )}>${escape(line.text)}</tspan>`;
  })}</text>
<canvas style="${"display: none;"}"${add_attribute("this", canvas, 0)}></canvas>`;
});
const PostcardBack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dimensions, $$unsubscribe_dimensions;
  $$unsubscribe_dimensions = subscribe(dimensions, (value) => $dimensions = value);
  const width = $dimensions[0], height = $dimensions[1];
  $$unsubscribe_dimensions();
  return `<svg encoding="${"UTF-8"}" version="${"1.0"}"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} xmlns="${"http://www.w3.org/2000/svg"}" id="${"postcardBack"}"><rect x="${"0"}" y="${"0"}"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} fill="${"#fff"}"></rect><g><g transform="${"translate(15,5)"}">${validate_component(MulitlineText, "MulitlineText").$$render(
    $$result,
    {
      text: "Wie viel Platz brauchen wir eigentlich, um zu wohnen, uns fortzubewegen und mal tief durchzuatmen?$Eine gerechte Nutzung der Fläche in Städten kann dazu beitragen, dass wir glücklicher und gesünder leben. Besuche kiezcolors.odis-berlin.de und entdecke die Verteilung in deinem Kiez,",
      x: "10",
      y: "30",
      width: "275",
      lineHeight: "1.4",
      fontSize: "11",
      fontFamily: "IBM Plex Sans Text",
      fill: "#292929"
    },
    {},
    {}
  )}</g><g transform="${"translate(15,107)"}">${validate_component(MulitlineText, "MulitlineText").$$render(
    $$result,
    {
      text: "Mit herzlichen Grüßen aus dem Kiezlabor!",
      x: "10",
      y: "30",
      width: "275",
      lineHeight: "1.4",
      fontSize: "11",
      fontFamily: "IBM Plex Sans Text",
      fill: "#292929"
    },
    {},
    {}
  )}</g><g transform="${"translate(15,160)"}">${each(Object.values(categories), ({ color, name, name_en }, i) => {
    return `<rect classs="${"rect-legend"}" width="${"10"}" height="${"10"}"${add_attribute("fill", color, 0)}${add_attribute("transform", `translate(10,${10 + i * 16})`, 0)}></rect>
        <text classs="${"text-legend"}"${add_attribute("transform", `translate(25,${19 + i * 16})`, 0)} text-anchor="${"start"}" font-family="${"IBM Plex Sans Text"}" font-size="${"11"}" fill="${"#292929"}">${escape(name)} (${escape(name_en)})</text>`;
  })}</g><g transform="${"translate(15,310)"}">${validate_component(MulitlineText, "MulitlineText").$$render(
    $$result,
    {
      text: "Du siehst die Flächenverteilung in einem 1000 Meter Radius.\n        Möglich gemacht durch offene Verwaltungsdaten des Liegenschaftskatasters (ALKIS) aus dem Geoportal Berlin. <3",
      x: "10",
      y: "30",
      width: "275",
      lineHeight: "1.4",
      fontSize: "9",
      fontFamily: "IBM Plex Sans Text",
      fontStyle: "italic",
      fontFill: "rgb(148, 148, 148)"
    },
    {},
    {}
  )}</g><line y1="${"30"}"${add_attribute("x1", width / 2, 0)}${add_attribute("y2", height - 80, 0)}${add_attribute("x2", width / 2, 0)} style="${"stroke:rgb(200, 200, 200);stroke-width:1"}"></line><line${add_attribute("y1", 200, 0)}${add_attribute("x1", width - 30, 0)}${add_attribute("y2", 200, 0)}${add_attribute("x2", width / 2 + 30, 0)} style="${"stroke:rgb(200, 200, 200);stroke-width:1"}"></line><line${add_attribute("y1", 250, 0)}${add_attribute("x1", width - 30, 0)}${add_attribute("y2", 250, 0)}${add_attribute("x2", width / 2 + 30, 0)} style="${"stroke:rgb(200, 200, 200);stroke-width:1"}"></line><line${add_attribute("y1", 300, 0)}${add_attribute("x1", width - 30, 0)}${add_attribute("y2", 300, 0)}${add_attribute("x2", width / 2 + 30, 0)} style="${"stroke:rgb(200, 200, 200);stroke-width:1"}"></line><rect width="${"90"}" height="${"120"}" style="${"stroke:rgb(200, 200, 200);stroke-width:1"}"${add_attribute("transform", `translate(${width - 120},${30})`, 0)} fill="${"transparent"}"></rect><text transform="${"translate(424,535.5)"}" text-anchor="${"end"}" font-family="${"IBM Plex Sans Text"}" font-size="${"12"}" fill="${"#292929"}"><tspan x="${"0"}" y="${"0"}" dy="${"1.5em"}">Data: Geoportal Berlin / ALKIS Berlin</tspan><tspan x="${"0"}" y="${"0"}" dy="${"3em"}">KiezLabor 2023</tspan><tspan x="${"0"}" y="${"0"}" dy="${"4.5em"}">kiezcolors.odis-berlin.de</tspan></text></g><g transform="${"translate(25,375)"}">${validate_component(LogoODIS, "LogoODIS").$$render($$result, { width: 130, height: 50 }, {}, {})}</g><g transform="${"translate(175,375)"}">${validate_component(LogoCityLab, "LogoCityLab").$$render($$result, { width: 120, height: 50 }, {}, {})}</g><g transform="${"translate(330,375)"}"><text transform="${"translate(60,-10)"}" text-anchor="${"end"}" font-family="${"IBM Plex Sans Text"}" font-size="${"12"}" fill="${"rgb(148, 148, 148)"}">Projekt der
    </text>${validate_component(LogoTSB, "LogoTSB").$$render($$result, { width: 120, height: 50 }, {}, {})}</g><g transform="${"translate(470,355)"}"><text transform="${"translate(90,10)"}" text-anchor="${"end"}" font-family="${"IBM Plex Sans Text"}" font-size="${"12"}" fill="${"rgb(148, 148, 148)"}">Gefördert durch
    </text>${validate_component(LogoSenatskanzlei, "LogoSenatskanzlei").$$render($$result, { width: 140, height: 100 }, {}, {})}</g><defs><style type="${"text/css"}">@font-face {
        font-family: "IBM Plex Sans Text";
        /* Add other properties here, as needed. For example: */
        /*
    font-weight: 100 900;
    font-style: normal italic;
    */
        src: url(data:application/octet-stream;base64,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);
      }

      @font-face {
        font-family: "IBM Plex Sans Bold";
        /* Add other properties here, as needed. For example: */
        /*
    font-weight: 100 900;
    font-style: normal italic;
    */
        src: url(data:application/octet-stream;base64,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);
      }</style></defs></svg>`;
});
function createFloatingActions(initOptions) {
  let referenceElement;
  let floatingElement;
  const defaultOptions = {
    autoUpdate: true
  };
  let options = initOptions;
  const getOptions = (mixin) => {
    return { ...defaultOptions, ...initOptions || {}, ...mixin || {} };
  };
  const updatePosition = (updateOptions) => {
    if (referenceElement && floatingElement) {
      options = getOptions(updateOptions);
      computePosition(referenceElement, floatingElement, options).then((v) => {
        Object.assign(floatingElement.style, {
          position: v.strategy,
          left: `${v.x}px`,
          top: `${v.y}px`
        });
        options?.onComputed && options.onComputed(v);
      });
    }
  };
  const referenceAction = (node) => {
    if ("subscribe" in node) {
      setupVirtualElementObserver(node);
      return {};
    } else {
      referenceElement = node;
      updatePosition();
    }
  };
  const contentAction = (node, contentOptions) => {
    let autoUpdateDestroy;
    floatingElement = node;
    options = getOptions(contentOptions);
    setTimeout(() => updatePosition(contentOptions), 0);
    updatePosition(contentOptions);
    const destroyAutoUpdate = () => {
      if (autoUpdateDestroy) {
        autoUpdateDestroy();
        autoUpdateDestroy = void 0;
      }
    };
    const initAutoUpdate = ({ autoUpdate: autoUpdate$1 } = options || {}) => {
      destroyAutoUpdate();
      if (autoUpdate$1 !== false) {
        return autoUpdate(referenceElement, floatingElement, () => updatePosition(options), autoUpdate$1 === true ? {} : autoUpdate$1);
      }
      return;
    };
    autoUpdateDestroy = initAutoUpdate();
    return {
      update(contentOptions2) {
        updatePosition(contentOptions2);
        autoUpdateDestroy = initAutoUpdate(contentOptions2);
      },
      destroy() {
        destroyAutoUpdate();
      }
    };
  };
  const setupVirtualElementObserver = (node) => {
    const unsubscribe = node.subscribe(($node) => {
      if (referenceElement === void 0) {
        referenceElement = $node;
        updatePosition();
      } else {
        Object.assign(referenceElement, $node);
        updatePosition();
      }
    });
    onDestroy(unsubscribe);
  };
  return [
    referenceAction,
    contentAction,
    updatePosition
  ];
}
function filter({
  loadOptions,
  filterText,
  items,
  multiple,
  value,
  itemId,
  groupBy,
  filterSelectedItems,
  itemFilter,
  convertStringItemsToObjects: convertStringItemsToObjects2,
  filterGroupedItems,
  label
}) {
  if (items && loadOptions)
    return items;
  if (!items)
    return [];
  if (items && items.length > 0 && typeof items[0] !== "object") {
    items = convertStringItemsToObjects2(items);
  }
  let filterResults = items.filter((item) => {
    let matchesFilter = itemFilter(item[label], filterText, item);
    if (matchesFilter && multiple && value?.length) {
      matchesFilter = !value.some((x) => {
        return filterSelectedItems ? x[itemId] === item[itemId] : false;
      });
    }
    return matchesFilter;
  });
  if (groupBy) {
    filterResults = filterGroupedItems(filterResults);
  }
  return filterResults;
}
async function getItems({ dispatch, loadOptions, convertStringItemsToObjects: convertStringItemsToObjects2, filterText }) {
  let res = await loadOptions(filterText).catch((err) => {
    console.warn("svelte-select loadOptions error :>> ", err);
    dispatch("error", { type: "loadOptions", details: err });
  });
  if (res && !res.cancelled) {
    if (res) {
      if (res && res.length > 0 && typeof res[0] !== "object") {
        res = convertStringItemsToObjects2(res);
      }
      dispatch("loaded", { items: res });
    } else {
      res = [];
    }
    return {
      filteredItems: res,
      loading: false,
      focused: true,
      listOpen: true
    };
  }
}
const ChevronIcon_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "svg.svelte-1ea3f3y{width:var(--chevron-icon-width, 20px);height:var(--chevron-icon-width, 20px);color:var(--chevron-icon-colour, currentColor)}",
  map: null
};
const ChevronIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<svg width="${"100%"}" height="${"100%"}" viewBox="${"0 0 20 20"}" focusable="${"false"}" aria-hidden="${"true"}" class="${"svelte-1ea3f3y"}"><path fill="${"currentColor"}" d="${"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\n          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\n          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\n          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\n          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"}"></path></svg>`;
});
const ClearIcon_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "svg.svelte-yszwet{width:var(--clear-icon-width, 20px);height:var(--clear-icon-width, 20px);color:var(--clear-icon-color, currentColor)}",
  map: null
};
const ClearIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<svg width="${"100%"}" height="${"100%"}" viewBox="${"-2 -2 50 50"}" focusable="${"false"}" aria-hidden="${"true"}" role="${"presentation"}" class="${"svelte-yszwet"}"><path fill="${"currentColor"}" d="${"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\n    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"}"></path></svg>`;
});
const LoadingIcon_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".loading.svelte-d6026t{width:var(--spinner-width, 20px);height:var(--spinner-height, 20px);color:var(--spinner-color, var(--icons-color));animation:svelte-d6026t-rotate 0.75s linear infinite;transform-origin:center center;transform:none}.circle_path.svelte-d6026t{stroke-dasharray:90;stroke-linecap:round}@keyframes svelte-d6026t-rotate{100%{transform:rotate(360deg)}}",
  map: null
};
const LoadingIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<svg class="${"loading svelte-d6026t"}" viewBox="${"25 25 50 50"}"><circle class="${"circle_path svelte-d6026t"}" cx="${"50"}" cy="${"50"}" r="${"20"}" fill="${"none"}" stroke="${"currentColor"}" stroke-width="${"5"}" stroke-miterlimit="${"10"}"></circle></svg>`;
});
const Select_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".svelte-select.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{--borderRadius:var(--border-radius);--clearSelectColor:var(--clear-select-color);--clearSelectWidth:var(--clear-select-width);--disabledBackground:var(--disabled-background);--disabledBorderColor:var(--disabled-border-color);--disabledColor:var(--disabled-color);--disabledPlaceholderColor:var(--disabled-placeholder-color);--disabledPlaceholderOpacity:var(--disabled-placeholder-opacity);--errorBackground:var(--error-background);--errorBorder:var(--error-border);--groupItemPaddingLeft:var(--group-item-padding-left);--groupTitleColor:var(--group-title-color);--groupTitleFontSize:var(--group-title-font-size);--groupTitleFontWeight:var(--group-title-font-weight);--groupTitlePadding:var(--group-title-padding);--groupTitleTextTransform:var(--group-title-text-transform);--indicatorColor:var(--chevron-color);--indicatorHeight:var(--chevron-height);--indicatorWidth:var(--chevron-width);--inputColor:var(--input-color);--inputLeft:var(--input-left);--inputLetterSpacing:var(--input-letter-spacing);--inputMargin:var(--input-margin);--inputPadding:var(--input-padding);--itemActiveBackground:var(--item-active-background);--itemColor:var(--item-color);--itemFirstBorderRadius:var(--item-first-border-radius);--itemHoverBG:var(--item-hover-bg);--itemHoverColor:var(--item-hover-color);--itemIsActiveBG:var(--item-is-active-bg);--itemIsActiveColor:var(--item-is-active-color);--itemIsNotSelectableColor:var(--item-is-not-selectable-color);--itemPadding:var(--item-padding);--listBackground:var(--list-background);--listBorder:var(--list-border);--listBorderRadius:var(--list-border-radius);--listEmptyColor:var(--list-empty-color);--listEmptyPadding:var(--list-empty-padding);--listEmptyTextAlign:var(--list-empty-text-align);--listMaxHeight:var(--list-max-height);--listPosition:var(--list-position);--listShadow:var(--list-shadow);--listZIndex:var(--list-z-index);--multiItemBG:var(--multi-item-bg);--multiItemBorderRadius:var(--multi-item-border-radius);--multiItemDisabledHoverBg:var(--multi-item-disabled-hover-bg);--multiItemDisabledHoverColor:var(--multi-item-disabled-hover-color);--multiItemHeight:var(--multi-item-height);--multiItemMargin:var(--multi-item-margin);--multiItemPadding:var(--multi-item-padding);--multiSelectInputMargin:var(--multi-select-input-margin);--multiSelectInputPadding:var(--multi-select-input-padding);--multiSelectPadding:var(--multi-select-padding);--placeholderColor:var(--placeholder-color);--placeholderOpacity:var(--placeholder-opacity);--selectedItemPadding:var(--selected-item-padding);--spinnerColor:var(--spinner-color);--spinnerHeight:var(--spinner-height);--spinnerWidth:var(--spinner-width);--internal-padding:0 0 0 16px;border:var(--border, 1px solid #d8dbdf);border-radius:var(--border-radius, 6px);min-height:var(--height, 42px);position:relative;display:flex;align-items:stretch;padding:var(--padding, var(--internal-padding));background:var(--background, #fff);margin:var(--margin, 0);width:var(--width, 100%);font-size:var(--font-size, 16px);max-height:var(--max-height)}.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{box-sizing:var(--box-sizing, border-box)}.svelte-select.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg:hover{border:var(--border-hover, 1px solid #b2b8bf)}.value-container.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{display:flex;flex:1 1 0%;flex-wrap:wrap;align-items:center;gap:5px 10px;padding:var(--value-container-padding, 5px 0);position:relative;overflow:var(--value-container-overflow, hidden);align-self:stretch}.prepend.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg,.indicators.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{display:flex;flex-shrink:0;align-items:center}.indicators.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{position:var(--indicators-position);top:var(--indicators-top);right:var(--indicators-right);bottom:var(--indicators-bottom)}input.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{position:absolute;cursor:default;border:none;color:var(--input-color, var(--item-color));padding:var(--input-padding, 0);letter-spacing:var(--input-letter-spacing, inherit);margin:var(--input-margin, 0);min-width:10px;top:0;right:0;bottom:0;left:0;background:transparent;font-size:var(--font-size, 16px)}.svelte-11n9eyg:not(.multi)>.value-container.svelte-11n9eyg>input.svelte-11n9eyg{width:100%;height:100%}input.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg::-moz-placeholder{color:var(--placeholder-color, #78848f);opacity:var(--placeholder-opacity, 1)}input.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg::placeholder{color:var(--placeholder-color, #78848f);opacity:var(--placeholder-opacity, 1)}input.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg:focus{outline:none}.svelte-select.focused.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{border:var(--border-focused, 1px solid #006fe8);border-radius:var(--border-radius-focused, var(--border-radius, 6px))}.disabled.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{background:var(--disabled-background, #ebedef);border-color:var(--disabled-border-color, #ebedef);color:var(--disabled-color, #c1c6cc)}.disabled.svelte-11n9eyg input.svelte-11n9eyg.svelte-11n9eyg::-moz-placeholder{color:var(--disabled-placeholder-color, #c1c6cc);opacity:var(--disabled-placeholder-opacity, 1)}.disabled.svelte-11n9eyg input.svelte-11n9eyg.svelte-11n9eyg::placeholder{color:var(--disabled-placeholder-color, #c1c6cc);opacity:var(--disabled-placeholder-opacity, 1)}.selected-item.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{position:relative;overflow:var(--selected-item-overflow, hidden);padding:var(--selected-item-padding, 0 20px 0 0);text-overflow:ellipsis;white-space:nowrap;color:var(--selected-item-color, inherit);font-size:var(--font-size, 16px)}.multi.svelte-11n9eyg .selected-item.svelte-11n9eyg.svelte-11n9eyg{position:absolute;line-height:var(--height, 42px);height:var(--height, 42px)}.selected-item.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg:focus{outline:none}.hide-selected-item.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{opacity:0}.icon.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{display:flex;align-items:center;justify-content:center}.clear-select.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{all:unset;display:flex;align-items:center;justify-content:center;width:var(--clear-select-width, 40px);height:var(--clear-select-height, 100%);color:var(--clear-select-color, var(--icons-color));margin:var(--clear-select-margin, 0);pointer-events:all;flex-shrink:0}.clear-select.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg:focus{outline:var(--clear-select-focus-outline, 1px solid #006fe8)}.loading.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{width:var(--loading-width, 40px);height:var(--loading-height);color:var(--loading-color, var(--icons-color));margin:var(--loading--margin, 0);flex-shrink:0}.chevron.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{width:var(--chevron-width, 40px);height:var(--chevron-height, 40px);background:var(--chevron-background, transparent);pointer-events:var(--chevron-pointer-events, none);color:var(--chevron-color, var(--icons-color));border:var(--chevron-border, 0 0 0 1px solid #d8dbdf);flex-shrink:0}.multi.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{padding:var(--multi-select-padding, var(--internal-padding))}.multi.svelte-11n9eyg input.svelte-11n9eyg.svelte-11n9eyg{padding:var(--multi-select-input-padding, 0);position:relative;margin:var(--multi-select-input-margin, 5px 0);flex:1 1 40px}.svelte-select.error.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{border:var(--error-border, 1px solid #ff2d55);background:var(--error-background, #fff)}.a11y-text.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{z-index:9999;border:0px;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0px;white-space:nowrap}.multi-item.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{background:var(--multi-item-bg, #ebedef);margin:var(--multi-item-margin, 0);outline:var(--multi-item-outline, 1px solid #ddd);border-radius:var(--multi-item-border-radius, 4px);height:var(--multi-item-height, 25px);line-height:var(--multi-item-height, 25px);display:flex;cursor:default;padding:var(--multi-item-padding, 0 5px);overflow:hidden;gap:var(--multi-item-gap, 4px);outline-offset:-1px;max-width:var(--multi-max-width, none);color:var(--multi-item-color, var(--item-color))}.multi-item.disabled.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg:hover{background:var(--multi-item-disabled-hover-bg, #ebedef);color:var(--multi-item-disabled-hover-color, #c1c6cc)}.multi-item-text.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.multi-item-clear.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{display:flex;align-items:center;justify-content:center;--clear-icon-color:var(--multi-item-clear-icon-color, #000)}.multi-item.active.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{outline:var(--multi-item-active-outline, 1px solid #006fe8)}.svelte-select-list.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{box-shadow:var(--list-shadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));border-radius:var(--list-border-radius, 4px);max-height:var(--list-max-height, 252px);overflow-y:auto;background:var(--list-background, #fff);position:var(--list-position, absolute);z-index:var(--list-z-index, 2);border:var(--list-border)}.prefloat.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{opacity:0;pointer-events:none}.list-group-title.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{color:var(--group-title-color, #8f8f8f);cursor:default;font-size:var(--group-title-font-size, 16px);font-weight:var(--group-title-font-weight, 600);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--group-title-padding, 0 20px);text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:var(--group-title-text-transform, uppercase)}.empty.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{text-align:var(--list-empty-text-align, center);padding:var(--list-empty-padding, 20px 0);color:var(--list-empty-color, #78848f)}.item.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{cursor:default;height:var(--item-height, var(--height, 42px));line-height:var(--item-line-height, var(--height, 42px));padding:var(--item-padding, 0 20px);color:var(--item-color, inherit);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;transition:var(--item-transition, all 0.2s);align-items:center;width:100%}.item.group-item.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{padding-left:var(--group-item-padding-left, 40px)}.item.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg:active{background:var(--item-active-background, #b9daff)}.item.active.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{background:var(--item-is-active-bg, #007aff);color:var(--item-is-active-color, #fff)}.item.first.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{border-radius:var(--item-first-border-radius, 4px 4px 0 0)}.item.hover.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg:not(.active){background:var(--item-hover-bg, #e7f2ff);color:var(--item-hover-color, inherit)}.item.not-selectable.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg,.item.hover.item.not-selectable.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg,.item.active.item.not-selectable.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg,.item.not-selectable.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg:active{color:var(--item-is-not-selectable-color, #999);background:transparent}.required.svelte-11n9eyg.svelte-11n9eyg.svelte-11n9eyg{opacity:0;z-index:-1;position:absolute;top:0;left:0;bottom:0;right:0}",
  map: null
};
function convertStringItemsToObjects(_items) {
  return _items.map((item, index) => {
    return { index, value: item, label: `${item}` };
  });
}
function isItemFirst(itemIndex) {
  return itemIndex === 0;
}
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasValue;
  let hideSelectedItem;
  let showClear;
  let placeholderText;
  let ariaSelection;
  let ariaContext;
  let filteredItems;
  let $$slots = compute_slots(slots);
  const dispatch = createEventDispatcher();
  let { justValue = null } = $$props;
  let { filter: filter$1 = filter } = $$props;
  let { getItems: getItems$1 = getItems } = $$props;
  let { id = null } = $$props;
  let { name = null } = $$props;
  let { container = void 0 } = $$props;
  let { input = void 0 } = $$props;
  let { multiple = false } = $$props;
  let { multiFullItemClearable = false } = $$props;
  let { disabled = false } = $$props;
  let { focused = false } = $$props;
  let { value = null } = $$props;
  let { filterText = "" } = $$props;
  let { placeholder = "Please select" } = $$props;
  let { placeholderAlwaysShow = false } = $$props;
  let { items = null } = $$props;
  let { label = "label" } = $$props;
  let { itemFilter = (label2, filterText2, option) => `${label2}`.toLowerCase().includes(filterText2.toLowerCase()) } = $$props;
  let { groupBy = void 0 } = $$props;
  let { groupFilter = (groups) => groups } = $$props;
  let { groupHeaderSelectable = false } = $$props;
  let { itemId = "value" } = $$props;
  let { loadOptions = void 0 } = $$props;
  let { containerStyles = "" } = $$props;
  let { hasError = false } = $$props;
  let { filterSelectedItems = true } = $$props;
  let { required = false } = $$props;
  let { closeListOnChange = true } = $$props;
  let { createGroupHeaderItem = (groupValue, item) => {
    return { value: groupValue, [label]: groupValue };
  } } = $$props;
  const getFilteredItems = () => {
    return filteredItems;
  };
  let { searchable = true } = $$props;
  let { inputStyles = "" } = $$props;
  let { clearable = true } = $$props;
  let { loading = false } = $$props;
  let { listOpen = false } = $$props;
  let timeout;
  let { debounce = (fn, wait = 1) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  } } = $$props;
  let { debounceWait = 300 } = $$props;
  let { hideEmptyState = false } = $$props;
  let { inputAttributes = {} } = $$props;
  let { listAutoWidth = true } = $$props;
  let { showChevron = false } = $$props;
  let { listOffset = 5 } = $$props;
  let { hoverItemIndex = 0 } = $$props;
  let { floatingConfig = {} } = $$props;
  let { class: containerClasses = "" } = $$props;
  let activeValue;
  let prev_value;
  let prev_filterText;
  function setValue() {
    if (typeof value === "string") {
      let item = (items || []).find((item2) => item2[itemId] === value);
      value = item || { [itemId]: value, label: value };
    } else if (multiple && Array.isArray(value) && value.length > 0) {
      value = value.map((item) => typeof item === "string" ? { value: item, label: item } : item);
    }
  }
  let _inputAttributes;
  function assignInputAttributes() {
    _inputAttributes = Object.assign(
      {
        autocapitalize: "none",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: false,
        tabindex: 0,
        type: "text",
        "aria-autocomplete": "list"
      },
      inputAttributes
    );
    if (id) {
      _inputAttributes["id"] = id;
    }
    if (!searchable) {
      _inputAttributes["readonly"] = true;
    }
  }
  function filterGroupedItems(_items) {
    const groupValues = [];
    const groups = {};
    _items.forEach((item) => {
      const groupValue = groupBy(item);
      if (!groupValues.includes(groupValue)) {
        groupValues.push(groupValue);
        groups[groupValue] = [];
        if (groupValue) {
          groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
            id: groupValue,
            groupHeader: true,
            selectable: groupHeaderSelectable
          }));
        }
      }
      groups[groupValue].push(Object.assign({ groupItem: !!groupValue }, item));
    });
    const sortedGroupedItems = [];
    groupFilter(groupValues).forEach((groupValue) => {
      if (groups[groupValue])
        sortedGroupedItems.push(...groups[groupValue]);
    });
    return sortedGroupedItems;
  }
  function dispatchSelectedItem() {
    if (multiple) {
      if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
        if (checkValueForDuplicates()) {
          dispatch("input", value);
        }
      }
      return;
    }
    {
      dispatch("input", value);
    }
  }
  function setupMulti() {
    if (value) {
      if (Array.isArray(value)) {
        value = [...value];
      } else {
        value = [value];
      }
    }
  }
  function setValueIndexAsHoverIndex() {
    const valueIndex = filteredItems.findIndex((i) => {
      return i[itemId] === value[itemId];
    });
    checkHoverSelectable(valueIndex, true);
  }
  function dispatchHover(i) {
    dispatch("hoverItem", i);
  }
  function checkHoverSelectable(startingIndex = 0, ignoreGroup) {
    hoverItemIndex = startingIndex < 0 ? 0 : startingIndex;
    if (!ignoreGroup && groupBy && filteredItems[hoverItemIndex] && !filteredItems[hoverItemIndex].selectable) {
      setHoverIndex(1);
    }
  }
  function setupFilterText() {
    if (!loadOptions && filterText.length === 0)
      return;
    if (loadOptions) {
      debounce(
        async function() {
          loading = true;
          let res = await getItems$1({
            dispatch,
            loadOptions,
            convertStringItemsToObjects,
            filterText
          });
          if (res) {
            loading = res.loading;
            listOpen = listOpen ? res.listOpen : filterText.length > 0 ? true : false;
            focused = listOpen && res.focused;
            items = groupBy ? filterGroupedItems(res.filteredItems) : res.filteredItems;
          } else {
            loading = false;
            focused = true;
            listOpen = true;
          }
        },
        debounceWait
      );
    } else {
      listOpen = true;
      if (multiple) {
        activeValue = void 0;
      }
    }
  }
  function handleFilterEvent(items2) {
    if (listOpen)
      dispatch("filter", items2);
  }
  function computeJustValue() {
    if (multiple)
      return value ? value.map((item) => item[itemId]) : null;
    return value ? value[itemId] : value;
  }
  function checkValueForDuplicates() {
    let noDuplicates = true;
    if (value) {
      const ids = [];
      const uniqueValues = [];
      value.forEach((val) => {
        if (!ids.includes(val[itemId])) {
          ids.push(val[itemId]);
          uniqueValues.push(val);
        } else {
          noDuplicates = false;
        }
      });
      if (!noDuplicates)
        value = uniqueValues;
    }
    return noDuplicates;
  }
  function findItem(selection) {
    let matchTo = selection ? selection[itemId] : value[itemId];
    return items.find((item) => item[itemId] === matchTo);
  }
  function updateValueDisplay(items2) {
    if (!items2 || items2.length === 0 || items2.some((item) => typeof item !== "object"))
      return;
    if (!value || (multiple ? value.some((selection) => !selection || !selection[itemId]) : !value[itemId]))
      return;
    if (Array.isArray(value)) {
      value = value.map((selection) => findItem(selection) || selection);
    } else {
      value = findItem() || value;
    }
  }
  function handleFocus(e) {
    if (focused && input === document?.activeElement)
      return;
    if (e)
      dispatch("focus", e);
    input.focus();
    focused = true;
  }
  function handleClear() {
    dispatch("clear", value);
    value = void 0;
    closeList();
    handleFocus();
  }
  function closeList() {
    filterText = "";
    listOpen = false;
  }
  let { ariaValues = (values) => {
    return `Option ${values}, selected.`;
  } } = $$props;
  let { ariaListOpen = (label2, count) => {
    return `You are currently focused on option ${label2}. There are ${count} results available.`;
  } } = $$props;
  let { ariaFocused = () => {
    return `Select is focused, type to refine list, press down to open the menu.`;
  } } = $$props;
  function handleAriaSelection(_multiple) {
    let selected = void 0;
    if (_multiple && value.length > 0) {
      selected = value.map((v) => v[label]).join(", ");
    } else {
      selected = value[label];
    }
    return ariaValues(selected);
  }
  function handleAriaContent() {
    if (!filteredItems || filteredItems.length === 0)
      return "";
    let _item = filteredItems[hoverItemIndex];
    if (listOpen && _item) {
      let count = filteredItems ? filteredItems.length : 0;
      return ariaListOpen(_item[label], count);
    } else {
      return ariaFocused();
    }
  }
  let list = null;
  onDestroy(() => {
  });
  function setHoverIndex(increment) {
    let selectableFilteredItems = filteredItems.filter((item) => !Object.hasOwn(item, "selectable") || item.selectable === true);
    if (selectableFilteredItems.length === 0) {
      return hoverItemIndex = 0;
    }
    if (increment > 0 && hoverItemIndex === filteredItems.length - 1) {
      hoverItemIndex = 0;
    } else if (increment < 0 && hoverItemIndex === 0) {
      hoverItemIndex = filteredItems.length - 1;
    } else {
      hoverItemIndex = hoverItemIndex + increment;
    }
    const hover = filteredItems[hoverItemIndex];
    if (hover && hover.selectable === false) {
      if (increment === 1 || increment === -1)
        setHoverIndex(increment);
      return;
    }
  }
  function isItemActive(item, value2, itemId2) {
    if (multiple)
      return;
    return value2 && value2[itemId2] === item[itemId2];
  }
  function setListWidth() {
    const { width } = container.getBoundingClientRect();
    list.style.width = listAutoWidth ? width + "px" : "auto";
  }
  let _floatingConfig = {
    strategy: "absolute",
    placement: "bottom-start",
    middleware: [offset(listOffset), flip(), shift()],
    autoUpdate: false
  };
  const [floatingRef, floatingContent, floatingUpdate] = createFloatingActions(_floatingConfig);
  let prefloat = true;
  function listMounted(list2, listOpen2) {
    if (!list2 || !listOpen2)
      return prefloat = true;
    setTimeout(
      () => {
        prefloat = false;
      },
      0
    );
  }
  if ($$props.justValue === void 0 && $$bindings.justValue && justValue !== void 0)
    $$bindings.justValue(justValue);
  if ($$props.filter === void 0 && $$bindings.filter && filter$1 !== void 0)
    $$bindings.filter(filter$1);
  if ($$props.getItems === void 0 && $$bindings.getItems && getItems$1 !== void 0)
    $$bindings.getItems(getItems$1);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.container === void 0 && $$bindings.container && container !== void 0)
    $$bindings.container(container);
  if ($$props.input === void 0 && $$bindings.input && input !== void 0)
    $$bindings.input(input);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.multiFullItemClearable === void 0 && $$bindings.multiFullItemClearable && multiFullItemClearable !== void 0)
    $$bindings.multiFullItemClearable(multiFullItemClearable);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.focused === void 0 && $$bindings.focused && focused !== void 0)
    $$bindings.focused(focused);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0)
    $$bindings.filterText(filterText);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.placeholderAlwaysShow === void 0 && $$bindings.placeholderAlwaysShow && placeholderAlwaysShow !== void 0)
    $$bindings.placeholderAlwaysShow(placeholderAlwaysShow);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.itemFilter === void 0 && $$bindings.itemFilter && itemFilter !== void 0)
    $$bindings.itemFilter(itemFilter);
  if ($$props.groupBy === void 0 && $$bindings.groupBy && groupBy !== void 0)
    $$bindings.groupBy(groupBy);
  if ($$props.groupFilter === void 0 && $$bindings.groupFilter && groupFilter !== void 0)
    $$bindings.groupFilter(groupFilter);
  if ($$props.groupHeaderSelectable === void 0 && $$bindings.groupHeaderSelectable && groupHeaderSelectable !== void 0)
    $$bindings.groupHeaderSelectable(groupHeaderSelectable);
  if ($$props.itemId === void 0 && $$bindings.itemId && itemId !== void 0)
    $$bindings.itemId(itemId);
  if ($$props.loadOptions === void 0 && $$bindings.loadOptions && loadOptions !== void 0)
    $$bindings.loadOptions(loadOptions);
  if ($$props.containerStyles === void 0 && $$bindings.containerStyles && containerStyles !== void 0)
    $$bindings.containerStyles(containerStyles);
  if ($$props.hasError === void 0 && $$bindings.hasError && hasError !== void 0)
    $$bindings.hasError(hasError);
  if ($$props.filterSelectedItems === void 0 && $$bindings.filterSelectedItems && filterSelectedItems !== void 0)
    $$bindings.filterSelectedItems(filterSelectedItems);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.closeListOnChange === void 0 && $$bindings.closeListOnChange && closeListOnChange !== void 0)
    $$bindings.closeListOnChange(closeListOnChange);
  if ($$props.createGroupHeaderItem === void 0 && $$bindings.createGroupHeaderItem && createGroupHeaderItem !== void 0)
    $$bindings.createGroupHeaderItem(createGroupHeaderItem);
  if ($$props.getFilteredItems === void 0 && $$bindings.getFilteredItems && getFilteredItems !== void 0)
    $$bindings.getFilteredItems(getFilteredItems);
  if ($$props.searchable === void 0 && $$bindings.searchable && searchable !== void 0)
    $$bindings.searchable(searchable);
  if ($$props.inputStyles === void 0 && $$bindings.inputStyles && inputStyles !== void 0)
    $$bindings.inputStyles(inputStyles);
  if ($$props.clearable === void 0 && $$bindings.clearable && clearable !== void 0)
    $$bindings.clearable(clearable);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.listOpen === void 0 && $$bindings.listOpen && listOpen !== void 0)
    $$bindings.listOpen(listOpen);
  if ($$props.debounce === void 0 && $$bindings.debounce && debounce !== void 0)
    $$bindings.debounce(debounce);
  if ($$props.debounceWait === void 0 && $$bindings.debounceWait && debounceWait !== void 0)
    $$bindings.debounceWait(debounceWait);
  if ($$props.hideEmptyState === void 0 && $$bindings.hideEmptyState && hideEmptyState !== void 0)
    $$bindings.hideEmptyState(hideEmptyState);
  if ($$props.inputAttributes === void 0 && $$bindings.inputAttributes && inputAttributes !== void 0)
    $$bindings.inputAttributes(inputAttributes);
  if ($$props.listAutoWidth === void 0 && $$bindings.listAutoWidth && listAutoWidth !== void 0)
    $$bindings.listAutoWidth(listAutoWidth);
  if ($$props.showChevron === void 0 && $$bindings.showChevron && showChevron !== void 0)
    $$bindings.showChevron(showChevron);
  if ($$props.listOffset === void 0 && $$bindings.listOffset && listOffset !== void 0)
    $$bindings.listOffset(listOffset);
  if ($$props.hoverItemIndex === void 0 && $$bindings.hoverItemIndex && hoverItemIndex !== void 0)
    $$bindings.hoverItemIndex(hoverItemIndex);
  if ($$props.floatingConfig === void 0 && $$bindings.floatingConfig && floatingConfig !== void 0)
    $$bindings.floatingConfig(floatingConfig);
  if ($$props.class === void 0 && $$bindings.class && containerClasses !== void 0)
    $$bindings.class(containerClasses);
  if ($$props.handleClear === void 0 && $$bindings.handleClear && handleClear !== void 0)
    $$bindings.handleClear(handleClear);
  if ($$props.ariaValues === void 0 && $$bindings.ariaValues && ariaValues !== void 0)
    $$bindings.ariaValues(ariaValues);
  if ($$props.ariaListOpen === void 0 && $$bindings.ariaListOpen && ariaListOpen !== void 0)
    $$bindings.ariaListOpen(ariaListOpen);
  if ($$props.ariaFocused === void 0 && $$bindings.ariaFocused && ariaFocused !== void 0)
    $$bindings.ariaFocused(ariaFocused);
  $$result.css.add(css$1);
  {
    if (value)
      setValue();
  }
  {
    if (inputAttributes || !searchable)
      assignInputAttributes();
  }
  {
    if (multiple)
      setupMulti();
  }
  {
    if (multiple && value && value.length > 1)
      checkValueForDuplicates();
  }
  {
    if (value)
      dispatchSelectedItem();
  }
  {
    if (!value && multiple && prev_value)
      dispatch("input", value);
  }
  {
    if (!focused && input)
      closeList();
  }
  {
    if (filterText !== prev_filterText)
      setupFilterText();
  }
  filteredItems = filter$1({
    loadOptions,
    filterText,
    items,
    multiple,
    value,
    itemId,
    groupBy,
    label,
    filterSelectedItems,
    itemFilter,
    convertStringItemsToObjects,
    filterGroupedItems
  });
  {
    if (!multiple && listOpen && value && filteredItems)
      setValueIndexAsHoverIndex();
  }
  {
    if (listOpen && multiple)
      hoverItemIndex = 0;
  }
  {
    if (filterText)
      hoverItemIndex = 0;
  }
  {
    dispatchHover(hoverItemIndex);
  }
  hasValue = multiple ? value && value.length > 0 : value;
  hideSelectedItem = hasValue && filterText.length > 0;
  showClear = hasValue && clearable && !disabled && !loading;
  placeholderText = placeholderAlwaysShow && multiple ? placeholder : multiple && value?.length === 0 ? placeholder : value ? "" : placeholder;
  ariaSelection = value ? handleAriaSelection(multiple) : "";
  ariaContext = handleAriaContent();
  {
    updateValueDisplay(items);
  }
  justValue = computeJustValue();
  {
    if (!multiple && prev_value && !value)
      dispatch("input", value);
  }
  {
    if (listOpen && filteredItems && !multiple && !value)
      checkHoverSelectable();
  }
  {
    handleFilterEvent(filteredItems);
  }
  {
    if (container && floatingConfig?.autoUpdate === void 0) {
      _floatingConfig.autoUpdate = true;
    }
  }
  {
    if (container && floatingConfig)
      floatingUpdate(Object.assign(_floatingConfig, floatingConfig));
  }
  {
    listMounted(list, listOpen);
  }
  {
    if (listOpen && container && list)
      setListWidth();
  }
  {
    if (input && listOpen && !focused)
      handleFocus();
  }
  return `

<div class="${[
    "svelte-select " + escape(containerClasses, true) + " svelte-11n9eyg",
    (multiple ? "multi" : "") + " " + (disabled ? "disabled" : "") + " " + (focused ? "focused" : "") + " " + (listOpen ? "list-open" : "") + " " + (showChevron ? "show-chevron" : "") + " " + (hasError ? "error" : "")
  ].join(" ").trim()}"${add_attribute("style", containerStyles, 0)}${add_attribute("this", container, 0)}>${listOpen ? `<div class="${["svelte-select-list svelte-11n9eyg", prefloat ? "prefloat" : ""].join(" ").trim()}"${add_attribute("this", list, 0)}>${$$slots["list-prepend"] ? `${slots["list-prepend"] ? slots["list-prepend"]({}) : ``}` : ``}
            ${$$slots.list ? `${slots.list ? slots.list({ filteredItems }) : ``}` : `${filteredItems.length > 0 ? `${each(filteredItems, (item, i) => {
    return `<div class="${"list-item svelte-11n9eyg"}" tabindex="${"-1"}"><div class="${[
      "item svelte-11n9eyg",
      (item.groupHeader ? "list-group-title" : "") + " " + (isItemActive(item, value, itemId) ? "active" : "") + " " + (isItemFirst(i) ? "first" : "") + " " + (hoverItemIndex === i ? "hover" : "") + " " + (item.groupItem ? "group-item" : "") + " " + (item?.selectable === false ? "not-selectable" : "")
    ].join(" ").trim()}">${slots.item ? slots.item({ item, index: i }) : `
                                ${escape(item?.[label])}
                            `}</div>
                    </div>`;
  })}` : `${!hideEmptyState ? `${slots.empty ? slots.empty({}) : `
                    <div class="${"empty svelte-11n9eyg"}">No options</div>
                `}` : ``}`}`}
            ${$$slots["list-append"] ? `${slots["list-append"] ? slots["list-append"]({}) : ``}` : ``}</div>` : ``}

    <span aria-live="${"polite"}" aria-atomic="${"false"}" aria-relevant="${"additions text"}" class="${"a11y-text svelte-11n9eyg"}">${focused ? `<span id="${"aria-selection"}" class="${"svelte-11n9eyg"}">${escape(ariaSelection)}</span>
            <span id="${"aria-context"}" class="${"svelte-11n9eyg"}">${escape(ariaContext)}</span>` : ``}</span>

    <div class="${"prepend svelte-11n9eyg"}">${slots.prepend ? slots.prepend({}) : ``}</div>

    <div class="${"value-container svelte-11n9eyg"}">${hasValue ? `${multiple ? `${each(value, (item, i) => {
    return `<div class="${[
      "multi-item svelte-11n9eyg",
      (activeValue === i ? "active" : "") + " " + (disabled ? "disabled" : "")
    ].join(" ").trim()}"><span class="${"multi-item-text svelte-11n9eyg"}">${slots.selection ? slots.selection({ selection: item, index: i }) : `
                                ${escape(item[label])}
                            `}</span>

                        ${!disabled && !multiFullItemClearable && ClearIcon ? `<div class="${"multi-item-clear svelte-11n9eyg"}">${slots["multi-clear-icon"] ? slots["multi-clear-icon"]({}) : `
                                    ${validate_component(ClearIcon, "ClearIcon").$$render($$result, {}, {}, {})}
                                `}
                            </div>` : ``}
                    </div>`;
  })}` : `<div class="${[
    "selected-item svelte-11n9eyg",
    hideSelectedItem ? "hide-selected-item" : ""
  ].join(" ").trim()}">${slots.selection ? slots.selection({ selection: value }) : `
                        ${escape(value[label])}
                    `}</div>`}` : ``}

        <input${spread(
    [
      { readonly: !searchable || null },
      escape_object(_inputAttributes),
      {
        placeholder: escape_attribute_value(placeholderText)
      },
      {
        style: escape_attribute_value(inputStyles)
      },
      { disabled: disabled || null }
    ],
    { classes: "svelte-11n9eyg" }
  )}${add_attribute("this", input, 0)}${add_attribute("value", filterText, 0)}></div>

    <div class="${"indicators svelte-11n9eyg"}">${loading ? `<div class="${"icon loading svelte-11n9eyg"}" aria-hidden="${"true"}">${slots["loading-icon"] ? slots["loading-icon"]({}) : `
                    ${validate_component(LoadingIcon, "LoadingIcon").$$render($$result, {}, {}, {})}
                `}</div>` : ``}

        ${showClear ? `<button class="${"icon clear-select svelte-11n9eyg"}">${slots["clear-icon"] ? slots["clear-icon"]({}) : `
                    ${validate_component(ClearIcon, "ClearIcon").$$render($$result, {}, {}, {})}
                `}</button>` : ``}

        ${showChevron ? `<div class="${"icon chevron svelte-11n9eyg"}" aria-hidden="${"true"}">${slots["chevron-icon"] ? slots["chevron-icon"]({ listOpen }) : `
                    ${validate_component(ChevronIcon, "ChevronIcon").$$render($$result, {}, {}, {})}
                `}</div>` : ``}</div>

    ${slots["input-hidden"] ? slots["input-hidden"]({ value }) : `
        <input${add_attribute("name", name, 0)} type="${"hidden"}"${add_attribute("value", value ? JSON.stringify(value) : null, 0)} class="${"svelte-11n9eyg"}">
    `}

    ${required && (!value || value.length === 0) ? `${slots.required ? slots.required({ value }) : `
            <select class="${"required svelte-11n9eyg"}" required tabindex="${"-1"}" aria-hidden="${"true"}"></select>
        `}` : ``}
</div>`;
});
function getAddress(filterText) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://nominatim.openstreetmap.org/search?viewbox=13.0648,52.7554,13.7796,52.33449&bounded=1&q=${filterText.toLowerCase()}&countrycodes=de&format=json`
    );
    xhr.send();
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.response);
        setTimeout(resolve(response), 5e3);
      } else {
        reject();
      }
    };
  });
}
let noOptionsMessage = "Keine Ergebnisse";
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_newBounds;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_newBounds = subscribe(newBounds, (value) => value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let selectedSearchResult;
  $$unsubscribe_newBounds();
  $$unsubscribe_lang();
  return `<div class="${"mb-5 pt-5"}">${validate_component(Select, "Select").$$render(
    $$result,
    {
      noOptionsMessage,
      loadOptions: getAddress,
      loadOptionsInterval: 1500,
      placeholder: $lang === "de" ? "nach einem Ort suchen" : "search for a place",
      label: "display_name",
      value: selectedSearchResult
    },
    {},
    {}
  )}</div>`;
});
const PrintAndDownload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $printBackUI, $$unsubscribe_printBackUI;
  let $dimensions, $$unsubscribe_dimensions;
  let $$unsubscribe_svg;
  let $isMobile, $$unsubscribe_isMobile;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_printBackUI = subscribe(printBackUI, (value) => $printBackUI = value);
  $$unsubscribe_dimensions = subscribe(dimensions, (value) => $dimensions = value);
  $$unsubscribe_svg = subscribe(svg, (value) => value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  $dimensions[1];
  $dimensions[0];
  $$unsubscribe_printBackUI();
  $$unsubscribe_dimensions();
  $$unsubscribe_svg();
  $$unsubscribe_isMobile();
  $$unsubscribe_lang();
  return `<button class="${["btn btn-secondary mb-8", !$isMobile ? "mt-8" : ""].join(" ").trim()}">${escape(!$printBackUI ? $lang === "en" ? "Print" : "Drucken" : $lang === "en" ? "Download" : "Herunterladen")}</button>

<br>

${$printBackUI ? `<button class="${"btn btn-sm btn-primary btn-outline mb-6"}">${escape($lang === "en" ? "Download backside" : "Rückseite herunterladen")}</button>` : ``}`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  let $printBackUI, $$unsubscribe_printBackUI;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  $$unsubscribe_printBackUI = subscribe(printBackUI, (value) => $printBackUI = value);
  $$unsubscribe_lang();
  $$unsubscribe_printBackUI();
  return `<div class="${"bottom-0 lg:absolute text-sm mr-8 text-gray-500 mb-4"}"><p>${escape($lang === "en" ? "Kiezcolors was developed by ODIS and CityLAB Berlin. ODIS and CityLAB are projects of the Technology Foundation Berlin and are funded by the Berlin Senate Chancellery. You can find the code to this project on " : "Kiezcolors wurde von ODIS und CityLAB Berlin entwickelt. ODIS und CityLAB sind Projekte der Technologiestiftung Berlin und werden von der Berliner Senatskanzlei gefördert. Den Code zum Projekt findest auf ")}
    <a class="${"font-bold"}" href="${"https://github.com/technologiestiftung/kiezcolors/"}">GitHub
    </a>
    .
  </p>

  <div style="${"text-align:center;margin-top:20px"}" class="${"flex flex-wrap sm:flex-nowrap"}"><a class="${"basis-2/4"}" style="${"padding:10px"}" href="${"https://odis-berlin.de"}"><img width="${"200"}" alt="${"odis-logo"}" src="${"./img/logo-odis-berlin.svg"}"></a>

    <a class="${"basis-2/4"}" style="${"padding:10px"}" href="${"https://citylab-berlin.org/de/start/"}"><img width="${"200"}" alt="${"citylab-logo"}" src="${"./img/logo-citylab-berlin.svg"}"></a>
    <a class="${"basis-2/4"}" style="${"padding:10px"}" href="${"https://www.technologiestiftung-berlin.de/"}"><img width="${"150"}" alt="${"technologiestiftung-logo"}" src="${"./img/logo-tsb.svg"}"></a>
    <a class="${"basis-2/4"}" style="${"padding:10px"}" href="${"https://www.berlin.de/rbmskzl/"}"><img width="${"100"}" alt="${"seninnds-logo"}" src="${"./img/B_RBm_Skzl_Logo_DE_V_PT_RGB.svg"}"></a></div>
  <div class="${"w-full text-center text-gray-400"}"><a href="${"https://www.technologiestiftung-berlin.de/impressum"}">Impressum</a>
    <input type="${"checkbox"}" class="${"checkbox checkbox-primary checkbox-xs opacity-90 fixed bottom-0 left-0"}"${add_attribute("checked", $printBackUI, 1)}></div></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.bold.svelte-hlq8ce{font-family:"IBM Plex Sans Bold"}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $screenWidth, $$unsubscribe_screenWidth;
  let $isMobile, $$unsubscribe_isMobile;
  let $lang, $$unsubscribe_lang;
  let $printBackUI, $$unsubscribe_printBackUI;
  $$unsubscribe_screenWidth = subscribe(screenWidth, (value) => $screenWidth = value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  $$unsubscribe_printBackUI = subscribe(printBackUI, (value) => $printBackUI = value);
  let innerWidth = 0;
  $$result.css.add(css);
  set_store_value(isMobile, $isMobile = innerWidth <= 1023, $isMobile);
  set_store_value(screenWidth, $screenWidth = innerWidth, $screenWidth);
  $$unsubscribe_screenWidth();
  $$unsubscribe_isMobile();
  $$unsubscribe_lang();
  $$unsubscribe_printBackUI();
  return `

${$$result.head += `<!-- HEAD_svelte-16uzuh9_START -->${$$result.title = `<title>Kiezcolors</title>`, ""}<meta name="${"description"}" content="${"A map based tool to create a postcard showing the landuse distribution in your neighborhood"}"><meta name="${"viewport"}" content="${"width=device-width, initial-scale=1.0, maximum-scale=0.8, user-scalable=0"}"><!-- HEAD_svelte-16uzuh9_END -->`, ""}

<div class="${"fixed right-4 top-4 margin-4 z-50"}"><div class="${"btn-group"}"><input type="${"radio"}" name="${"options"}" data-title="${"en"}" class="${"btn btn-sm btn-outline "}" ${$lang === "en" ? "checked" : ""}>
    <input type="${"radio"}" name="${"options"}" data-title="${"de"}" class="${"btn btn-sm btn-outline "}" ${$lang === "de" ? "checked" : ""}></div></div>

<section class="${"w-full h-screen block lg:flex"}"><div class="${[
    "lg:h-full w-full lg:w-1/3 bg-white z-10 relative p-4 lg:p-8 overflow-auto ",
    !$isMobile ? "shadow-lg" : ""
  ].join(" ").trim()}"><div class="${"bold py-4 text-5xl svelte-hlq8ce"}">Kiezcolors</div>

    <p class="${"my-4"}">${$lang === "en" ? `Create a postcard, which shows the distribution of land use in your
        neighborhood. Simply move the map from Berlin or search for a location.
        You can also change the text on the postcard.` : `Hier kannst du dir eine Postkarte erstellen, die die Verteilung der
        Flächennutzung in deiner Nachbarschaft zeigt. Verschiebe einfach die
        Karte von Berlin oder suche nach einem Ort. Den Text auf der Postkarte
        kannst du auch ändern.`}</p>

    <div class="${"w-full"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}</div>

    <span class="${"hidden lg:block"}">${validate_component(PrintAndDownload, "PrintAndDownload").$$render($$result, {}, {}, {})}
      ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</span></div>
  <div class="${"h-1/2 lg:h-full w-full bg-white flex items-center"}">${validate_component(Map, "Map").$$render($$result, {}, {}, {})}
    ${!$isMobile ? `${validate_component(PostcardFront, "PostcardFront").$$render($$result, {}, {}, {})}` : ``}</div>

  ${$isMobile ? `<div class="${"relative width-full bg-gray-100"}">${validate_component(MapKey, "MapKey").$$render($$result, {}, {}, {})}</div>` : ``}
  ${$isMobile ? `${validate_component(PostcardFront, "PostcardFront").$$render($$result, {}, {}, {})}` : ``}
  <div class="${"lg:hidden lg:w-1/3 bg-white z-10 relative m-4 overflow-auto"}">${validate_component(PrintAndDownload, "PrintAndDownload").$$render($$result, {}, {}, {})}
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></section>

${$printBackUI ? `<span class="${"p-4 hidden"}">${validate_component(PostcardBack, "PostcardBack").$$render($$result, {}, {}, {})}</span>` : ``}`;
});
export {
  Page as default
};
