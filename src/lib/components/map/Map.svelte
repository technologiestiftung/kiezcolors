<script>
  import "maplibre-gl/dist/maplibre-gl.css";
  import maplibregl from "maplibre-gl";
  import { onMount } from "svelte";
  import mapStyle from "./mapStyle.js";

  import Geocoder from "./Gecoder.svelte";

  import drawCanvasCirlce from "$lib/assets/drawCanvasCirlce";
  import getMaxCircleRadius from "$lib/assets/getMaxCircleRadius";
  import getLanduseSizes from "$lib/assets/getLanduseSizes";
  import getCircleGeom from "$lib/assets/getCircleGeom";
  import checkCirleFits from "$lib/assets/checkCirleFits";

  import {
    areaSizes,
    landuses,
    circleRadius,
    dimensions,
    totalSize,
    mapCenter,
    showBasemap,
    locationText,
    useLocationAsText,
    textVis,
    newBounds,
  } from "$lib/stores.js";

  let map;

  function setShowBasemap(show) {
    if (!map) return;

    map.setLayoutProperty("osm", "visibility", !show ? "none" : "visible");
  }

  function setBounds(b) {
    if (!b || !map) return;
    console.log(b);
    map.setCenter(b);
  }

  $: setShowBasemap($showBasemap);

  $: drawAndCount(map, $useLocationAsText);

  $: setBounds($newBounds);

  const drawAndCount = function (map) {
    if (!map || !map.getLayer("landuse")) return;
    const mC = map.getCenter().toArray();
    $mapCenter = [mC[0].toFixed(4), mC[1].toFixed(4)];

    const canvas = document.getElementById("myCanvas");

    let carCountingEnabled = map.getZoom() >= 10;
    $circleRadius = getMaxCircleRadius(map);

    let circleGeom = getCircleGeom(map, {
      radius: $circleRadius,
      steps: 30,
    });

    let circleFits = checkCirleFits(map, circleGeom);
    if (!circleFits || !carCountingEnabled) {
      const { width, height } = map.getContainer().getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // intersectsGrid = circleIntersectsGrid(map, circleGeom);

    const { sizes, sumSizes } = getLanduseSizes(map, circleGeom);
    $areaSizes = sizes;
    $totalSize = sumSizes;
    $locationText = "Lat " + $mapCenter[1] + " N, Lng " + $mapCenter[0] + " E";
    if ($useLocationAsText) {
      $textVis = $locationText;
    }
    drawCanvasCirlce(map, canvas, $circleRadius);
  };

  onMount(() => {
    map = new maplibregl.Map({
      container: "map", // container id
      style: mapStyle(window.location.origin + window.location.pathname),
      maxBounds: [
        [13.046434258466917, 52.30190843622876],
        [13.820874468731887, 52.69894396430871],
      ],
      dragRotate: false,
      attributionControl: false,
      // bounds: [13.3682291, 52.4827923, 13.4914434, 52.5310256],
      hash: true,
      minZoom: 10,
      center: [13.3915, 52.49899],
      zoom: 13,
    });

    map.on("load", function () {
      drawAndCount(map);

      map.on("moveend", function (e) {
        drawAndCount(map);
      });

      map.on("zoomend", function (e) {
        drawAndCount(map);
      });
    });
  });
</script>

<div id="map" class="border-2 w-fit">
  <Geocoder />

  <button
    class="rounded-full absolute right-2 top-14 h-10 w-10 text-center cursor-pointer text-xl leading-7 hover:bg-gray-300 z-40 bg-white"
    on:click={() => map.zoomIn()}
    on:keypress={() => map.zoomIn()}
  >
    +
  </button>
  <button
    class="rounded-full absolute right-2 top-24 mt-2 h-10 w-10 text-center cursor-pointer text-xl leading-7 hover:bg-gray-300 z-40 bg-white"
    on:click={() => map.zoomOut()}
    on:keypress={() => map.zoomOut()}
  >
    -
  </button>

  <div class="absolute right-2 bottom-8 z-50 ">Radius: {$circleRadius}m</div>

  <div class="absolute right-2 bottom-2 z-50 ">
    {#if $showBasemap}
      &copy;
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.openstreetmap.org/copyright"
      >
        OpenStreetMap
      </a>
      contributors &copy; |
    {/if}

    Geoportal Berlin / ALKIS Berlin
  </div>
  <label class="absolute right-2 bottom-14 z-50">
    <input type="checkbox" bind:checked={$showBasemap} class="mt-4" />
    Show Basemap
  </label>

  <canvas id="myCanvas" class="absolute" />
</div>

<style>
  #map {
    width: 444px;
    height: 630px;
  }

  #myCanvas {
    z-index: 10;
    pointer-events: none;
  }
</style>
