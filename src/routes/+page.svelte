<script>
  import Map from "$lib/components/map/Map.svelte";

  import PostcardFront from "$lib/components/postcard/PostcardFront.svelte";
  import PostcardBack from "$lib/components/postcard/PostcardBack.svelte";
  import LogoSenatskanzlei from "$lib/components/logos/LogoSenatskanzlei.svelte";

  // import Geocoder from "$lib/components/map/Gecoder.svelte";

  import Search from "$lib/components/search/Search.svelte";

  import {
    svg,
    svgBack,
    dimensions,
    textVis,
    showBasemap,
    useLocationAsText,
    lang,
    showBack,
    printBackUI,
  } from "$lib/stores.js";
  import font from "$lib/assets/font";
  import { encode } from "$lib/assets/base64";

  const width = $dimensions[1],
    height = $dimensions[0];

  function printSVG(base64EncodedSVG) {
    // Convert base64 to ArrayBuffer
    function base64ToArrayBuffer(base64) {
      const binaryString = atob(base64.split(",")[1]);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }

    // Convert the base64 data URL to a Blob
    const svgData = base64ToArrayBuffer(base64EncodedSVG);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

    // Create a FileReader to read the Blob as a text
    const reader = new FileReader();
    reader.readAsText(blob);
    reader.onloadend = function () {
      // Create a temporary div element to hold the decoded SVG
      const tempDiv = document.createElement("div");
      tempDiv.style.display = "none";
      tempDiv.innerHTML = reader.result;
      document.body.appendChild(tempDiv);

      // Retrieve the SVG element from the temporary div
      const svgElement = tempDiv.querySelector("svg");

      // Create a new window to display the SVG for printing
      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        "<!DOCTYPE html><html><head><title>Print SVG</title></head><body>"
      );
      printWindow.document.write("</body></html>");
      printWindow.document.close();

      // Append the SVG element to the new window
      printWindow.document.body.appendChild(svgElement);

      // Call the print function
      printWindow.print();

      // Close the new window after printing
      printWindow.close();

      // Remove the temporary div from the document
      document.body.removeChild(tempDiv);
    };
  }

  function downloadSVG(svg) {
    var b64;
    console.log(svg);
    if (svg._groups) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      const style = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "style"
      );
      style.type = "text/css";
      // prettier-ignore
      style.innerHTML = font('Outfit');
      defs.appendChild(style);
      svg.node().appendChild(defs);

      b64 = encode(svg.node().outerHTML);
    } else {
      b64 = encode(svg.outerHTML);
    }

    var file_path = "data:image/svg+xml;base64,\n" + b64;

    printSVG(file_path);
    // var a = document.createElement("A");
    // a.href = file_path;
    // a.download = "ODIS-postcard.svg";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);

    // async function go() {
    //   const base64Image = b64; // Remove the "data:image/*;base64," prefix

    //   try {
    //     // Send the base64 image to the API
    //     const response = await fetch("http://localhost:3000/print", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ image: base64Image }),
    //     });

    //     if (response.ok) {
    //       const result = await response.json();
    //       alert(result.message);
    //     } else {
    //       throw new Error("Failed to send image to API.");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     alert("An error occurred while sending the image to the API.");
    //   }
    // }
    // go();
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

  function downloadSVGback() {
    const svgBack = document.getElementById("postcardBack");
    downloadSVG(svgBack);
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

<div class="fixed right-4 top-4 margin-4 z-50">
  <div class="btn-group">
    <input
      type="radio"
      name="options"
      data-title="en"
      class="btn btn-sm btn-outline "
      checked={$lang === "en"}
      on:click={() => {
        $lang = "en";
      }}
    />
    <input
      type="radio"
      name="options"
      data-title="de"
      class="btn btn-sm btn-outline "
      checked={$lang === "de"}
      on:click={() => {
        $lang = "de";
      }}
    />
  </div>
</div>

<section class="w-screen h-screen bg-primary flex">
  <div class="h-full w-1/3 bg-white shadow-lg z-10 relative p-8 overflow-auto">
    <div class="bold py-4 text-5xl">Kiezcolors</div>
    <p class="my-4">
      {#if $lang === "en"}
        Create a postcard, which shows the distribution of land use in your
        neighborhood. Simply move the map from Berlin or search for a location.
        You can also change the text on the postcard.
      {:else}
        Hier kannst du dir eine Postkarte erstellen, die die Verteilung der
        Flächennutzung in deiner Nachbarschaft zeigt. Verschiebe einfach die
        Karte von Berlin oder suche nach einen Ort. Den Text auf der Postkarte
        kannst du auch ändern.
      {/if}
    </p>

    <div class="w-full"><Search /></div>

    <button
      on:click={() => {
        downloadSVG($svg);
      }}
      class="btn btn-secondary mt-8"
      >{$lang === "en" ? "Print" : "Drucken"}</button
    >

    <br />

    {#if $printBackUI}
      <button
        on:click={() => {
          downloadSVGback();
        }}
        class="btn btn-sm btn-primary mt-12 btn-outline"
        >{$lang === "en" ? "Print backside" : "Rückseite Drucken"}</button
      >
    {/if}

    <div class="bottom-0 absolute text-sm mr-8 text-gray-500 mb-4">
      <!-- <div class="form-control w-fit p-2 mt-6">
        <label class="cursor-pointer label">
          <input
            bind:checked={$useLocationAsText}
            type="checkbox"
            class="checkbox checkbox-primary"
          />
          <span class="label-text ml-2"
            >{$lang === "de"
              ? "Standort als Text verwenden"
              : "use location as Text"}</span
          >
        </label>
      </div>  -->

      <!-- <div class="form-control w-fit p-2 mt-6">
        <label class="cursor-pointer label">
          <input
            bind:checked={$showBack}
            type="checkbox"
            class="checkbox checkbox-primary"
          />
          <span class="label-text ml-2">showBack (for debugging)</span>
        </label>
      </div> -->

      <p>
        {$lang === "en"
          ? "Kiezcolors was developed by ODIS and CityLAB Berlin. ODIS is a project by the Technologiestiftung Berlin and is funded by the Berlin Senate Department for the Interior, Digitization and Sports."
          : "Kiezcolors wurde von ODIS und CityLAB Berlin entwickelt. ODIS ist ein Projekt der Technologiestiftung Berlin und wird von der Berliner Senatsverwaltung für Inneres, Digitalisierung und Sport gefördert."}
      </p>

      <div style="text-align:center;margin-top:20px" class="flex">
        <a style="margin:10px" href="https://odis-berlin.de">
          <img width="200" alt="odis-logo" src="./img/logo-odis-berlin.svg" />
        </a>

        <a style="margin:10px" href="https://citylab-berlin.org/de/start/">
          <img width="200" alt="citylab-logo" src="./img/kiezlabor.svg" /></a
        >
        <a style="margin:10px" href="https://www.technologiestiftung-berlin.de/"
          ><img
            width="150"
            alt="technologiestiftung-logo"
            src="./img/logo-technologiestiftung-berlin-de.svg"
          /></a
        >
        <a style="margin:10px" href="https://www.berlin.de/rbmskzl/"
          ><img
            width="100"
            alt="seninnds-logo"
            src="./img/B_RBm_Skzl_Logo_DE_V_PT_RGB.svg"
          /></a
        >
      </div>
      <div class="w-full text-center text-gray-400">
        <a href="https://www.technologiestiftung-berlin.de/impressum"
          >Impressum</a
        >
        <input
          bind:checked={$printBackUI}
          type="checkbox"
          class="checkbox checkbox-primary checkbox-xs opacity-90 fixed bottom-0 left-0"
        />
      </div>
    </div>
  </div>
  <div class="h-full w-full bg-secondary flex items-center">
    <Map />
    <PostcardFront />
  </div>
</section>

<!-- {#if $showBack} -->
<span class="bg-primary p-4 hidden">
  <PostcardBack />
</span>

<!-- {/if} -->
<style>
  .bold {
    font-family: "IBM Plex Sans Bold";
  }
</style>
