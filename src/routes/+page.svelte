<script>
  import Map from "$lib/components/map/Map.svelte";
  import PostcardFront from "$lib/components/postcard/PostcardFront.svelte";
  import PostcardBack from "$lib/components/postcard/PostcardBack.svelte";
  import {
    svg,
    svgBack,
    dimensions,
    textVis,
    showBasemap,
    useLocationAsText,
    lang,
  } from "$lib/stores.js";
  import font from "$lib/assets/font";
  import { encode } from "$lib/assets/base64";

  const width = $dimensions[1],
    height = $dimensions[0];

  const btnClasses =
    "border px-2 py-1 mr-2 hover:pointer-cursor hover:bg-gray-100";

  function downloadSVG(svg) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const style = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style"
    );
    style.type = "text/css";
    // prettier-ignore
    style.innerHTML = font('Outfit');
    defs.appendChild(style);
    svg.node().appendChild(defs);

    var b64 = encode(svg.node().outerHTML);

    var file_path = "data:image/svg+xml;base64,\n" + b64;
    var a = document.createElement("A");
    a.href = file_path;
    a.download = "ODIS-postcard.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadPNG(svg) {
    //PNG Download
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const style = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style"
    );
    style.type = "text/css";
    // prettier-ignore
    style.innerHTML = font('Outfit');
    defs.appendChild(style);
    svg.node().appendChild(defs);

    var s = new XMLSerializer().serializeToString(svg.node());
    var encodedData = window.btoa(s);

    var b64 = encode(svg.node().outerHTML);

    var image = new Image();
    image.src = "data:image/svg+xml;base64," + b64;
    image.onload = function () {
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);
      var file_path = canvas.toDataURL("image/png");
      var a = document.createElement("A");
      a.href = file_path;
      a.download = "ODIS-postcard.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  }
</script>

<svelte:head>
  <title>Kiezcolors</title>
  <meta
    name="description"
    content="A map based tool to create a postcard showing the landuse distribution in your neighborhood"
  />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=0.8, user-scalable=0"
  />
</svelte:head>

<div class="fixed right-4 top-4 margin-4">
  <div class="btn-group">
    <input
      type="radio"
      name="options"
      data-title="en"
      class="btn btn-xs btn-outline "
      checked={$lang === "en"}
      on:click={() => {
        $lang = "en";
      }}
    />
    <input
      type="radio"
      name="options"
      data-title="de"
      class="btn btn-xs btn-outline "
      checked={$lang === "de"}
      on:click={() => {
        $lang = "de";
      }}
    />
  </div>
</div>

<div class="bold flex mt-8 flex-wrap justify-evenly text-4xl">Kiezcolors</div>

<p class=" flex mt-4 flex-wrap justify-evenly px-6 md:px-10">
  {#if $lang === "en"}
    Move the map of Berlin to create a postcard showing the landuse distribution
    in your neighborhood.
  {:else}
    Verschiebe die Karte von Berlin, um eine Postkarte zu erstellen, die die
    Verteilung der Flächennutzung in Deiner Nachbarschaft zeigt.
  {/if}
</p>

<section class="flex m-4 mt-0 flex-wrap justify-evenly">
  <span class=" m-2 drop-shadow-md"
    ><span class="text-center w-full inline-block my-4"
      >{$lang === "en" ? "Map" : "Karte"}</span
    ><Map /></span
  >
  <span class="m-2 drop-shadow-md"
    ><span class="text-center w-full inline-block my-4"
      >{$lang === "en" ? "Your postcard" : "Deine Postkarte"}</span
    ><PostcardFront /></span
  >

  <!-- <span class=" m-2">
    <span class="text-center w-full inline-block my-4"
      >{$lang === "en" ? "Postcard back" : "Postkarte hinten"}
    </span>
    <PostcardBack />
  </span> -->
</section>

<footer class="flex mt-4 flex-wrap justify-evenly p-6 md:p-10 pt-20">
  <p>
    {$lang === "en"
      ? "Kiezcolors was developed by ODIS and CityLAB Berlin. ODIS is a project by the Technologiestiftung Berlin and is funded by the Berlin Senate Department for the Interior, Digitization and Sports."
      : "Kiezcolors wurde von ODIS und CityLAB Berlin entwickelt. ODIS ist ein Projekt der Technologiestiftung Berlin und wird von der Berliner Senatsverwaltung für Inneres, Digitalisierung und Sport gefördert."}
  </p>

  <div style="text-align:center;margin-top:20px" class="flex">
    <a style="margin:10px" href="https://odis-berlin.de">
      <img width="200" alt="odis-logo" src="./img/logo-odis-berlin.svg" />
    </a>
    <a style="margin:10px" href="https://www.technologiestiftung-berlin.de/"
      ><img
        width="150"
        alt="technologiestiftung-logo"
        src="./img/logo-technologiestiftung-berlin-de.svg"
      /></a
    >
    <a style="margin:10px" href="https://www.berlin.de/sen/inneres/"
      ><img
        width="100"
        alt="seninnds-logo"
        src="./img/logo-berlin-seninnds-de.svg"
      /></a
    >
    <a style="margin:10px" href="https://citylab-berlin.org/de/start/">
      <img
        width="200"
        alt="citylab-logo"
        src="./img/logo-citylab-berlin.svg"
      /></a
    >
  </div>
  <div class="w-full text-center text-gray-400">
    <a href="https://www.technologiestiftung-berlin.de/impressum">Impressum</a>
  </div>
</footer>

<style>
  #nav {
    width: 444px;
    /* height: 630px; */
  }

  .bold {
    font-family: "IBM Plex Sans Bold";
  }
</style>
