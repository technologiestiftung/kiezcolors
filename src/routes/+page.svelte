<script>
  import Map from "$lib/components/map/Map.svelte";
  import Tree from "$lib/components/tree/Tree.svelte";
  import Text from "$lib/components/text/Text.svelte";
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
</svelte:head>

<div class="flex mt-4 flex-wrap justify-evenly text-4xl">Kiezcolors</div>
<!-- <div class="flex mt-4 flex-wrap justify-evenly text">Berlin</div> -->

<p class="ibm flex mt-4 flex-wrap justify-evenly px-10">
  Move the map of Berlin to create a postcard showing the landuse distribution
  in your neighborhood.
</p>
<section class="flex m-4 mt-0 flex-wrap justify-evenly">
  <span class=" m-2"
    ><span class="text-center w-full inline-block my-4">Map</span><Map /></span
  >
  <span class="m-2"
    ><span class="text-center w-full inline-block my-4">Postcard front</span
    ><Tree /></span
  >
  <span class=" m-2"
    ><span class="text-center w-full inline-block my-4">Postcard back</span
    ><Text /></span
  >

  <div class="m-2" id="nav">
    <span class="text-center w-full inline-block my-4">Edit & Download</span>
    <span class="border p-4 inline-block w-full">
      <input
        type="text"
        class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-secondary focus:border-secondary block w-full p-2.5"
        bind:value={$textVis}
      />
      <label class="">
        <input type="checkbox" bind:checked={$useLocationAsText} class="mt-4" />
        use location as Text
      </label>
      <div class="mt-2 w-full">
        <span class="mr-2">Language</span>
        <label>
          <input type="radio" bind:group={$lang} value={"de"} />
          DE
        </label>
        <label>
          <input type="radio" bind:group={$lang} value={"en"} />
          EN
        </label>
      </div>

      <div class="mt-4 mb-2">Download</div>
      <span class="mr-4">
        <span class="w-10 inline-block">SVG</span>
        <button
          class={btnClasses}
          on:click={() => {
            downloadSVG($svg);
          }}>Front</button
        >
        <button
          class={btnClasses}
          on:click={() => {
            downloadSVG($svgBack);
          }}>Back</button
        >
      </span>

      <span class="w-10 inline-block">PNG</span>
      <button
        class={btnClasses}
        on:click={() => {
          downloadPNG($svg);
        }}>Front</button
      >
      <button
        class={btnClasses}
        on:click={() => {
          downloadPNG($svgBack);
        }}>Back</button
      >

      <!-- </div> -->
    </span>
  </div>
</section>

<footer class="flex mt-4 flex-wrap justify-evenly p-10 pt-20">
  <p>
    Kiezcolors was developed by ODIS and CityLAB Berlin. ODIS is a project by
    the Technologiestiftung Berlin and is funded by the Berlin Senate Department
    for the Interior, Digitization and Sports.
  </p>

  <div style="text-align:center;margin-top:20px" class="flex">
    <a style="margin:10px" href="https://odis-berlin.de">
      <img
        width="200"
        src="https://logos.citylab-berlin.org/logo-odis-berlin.svg"
      />
    </a>
    <a style="margin:10px" href="https://www.technologiestiftung-berlin.de/"
      ><img
        width="150"
        src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg"
      /></a
    >
    <a style="margin:10px" href="https://www.berlin.de/sen/inneres/"
      ><img
        width="100"
        src="https://logos.citylab-berlin.org/logo-berlin-seninnds-de.svg"
      /></a
    >
    <a style="margin:10px" href="https://citylab-berlin.org/de/start/">
      <img
        width="200"
        src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg"
      /></a
    >
  </div>
</footer>

<style>
  #nav {
    width: 444px;
    /* height: 630px; */
  }

  .ibm {
    font-family: "IBM Plex Mono";
  }
</style>
