<script>
  import "maplibre-gl/dist/maplibre-gl.css";
  import maplibregl from "maplibre-gl";
  import { onMount } from "svelte";
  import mapStyle from "./mapStyle.js";
  import MapKey from "$lib/components/map/MapKey.svelte";

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
    // if (!map.loaded()) {
    //   setTimeout(() => {
    //     drawAndCount(map);
    //   }, 1000);
    // }
    const mC = map.getCenter().toArray();
    $mapCenter = [mC[0].toFixed(3), mC[1].toFixed(3)];

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

    const { sizes, sumSizes } = getLanduseSizes(map, circleGeom, landuses);
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
        setTimeout(() => {
          drawAndCount(map);
        }, 100);
      });

      map.on("zoomend", function (e) {
        setTimeout(() => {
          drawAndCount(map);
        }, 100);
      });
    });
  });
</script>

<div id="map" class="w-screen h-screen !absolute left-0 z-0">
  <canvas id="myCanvas" class="absolute" />
</div>

<div class="relative w-full h-full pointer-events-none">
  <MapKey />
  <button
    class="btn btn-primary drop-shadow-xl text-2xl btn-circle absolute left-4 top-4  leading-7 z-40 pointer-events-auto "
    on:click={() => map.zoomIn()}
    on:keypress={() => map.zoomIn()}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="currentColor"
      class="bi bi-plus"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
      />
    </svg>
  </button>
  <button
    class="btn btn-primary drop-shadow-xl text-2xl btn-circle absolute left-4 top-10 mt-8   leading-7 z-40 pointer-events-auto"
    on:click={() => map.zoomOut()}
    on:keypress={() => map.zoomOut()}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="currentColor"
      class="bi bi-dash"
      viewBox="0 0 16 16"
    >
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
    </svg>
  </button>

  <div class="absolute right-2 bottom-8 z-50 text-md">
    Radius: {$circleRadius}m
  </div>

  <div class="absolute right-2 bottom-2 z-50 text-md">
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

  <div
    class="absolute right-0 bottom-12 z-50 form-control w-fit pointer-events-auto"
  >
    <label class="cursor-pointer label">
      <span class="mx-2 text-md">Basemap</span>
      <input
        type="checkbox"
        bind:checked={$showBasemap}
        class="toggle toggle-primary"
      />
    </label>
  </div>
</div>

<style>
  #myCanvas {
    z-index: 10;
    pointer-events: none;
  }
</style>
