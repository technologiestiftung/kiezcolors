<script>
  import { svg, dimensions, lang, printBackUI, isMobile } from "$lib/stores.js";
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

<button
  on:click={() => {
    downloadSVG($svg);
  }}
  class="btn btn-secondary mb-8"
  class:mt-8={!$isMobile}>{$lang === "en" ? "Print" : "Drucken"}</button
>

<br />

{#if $printBackUI}
  <button
    on:click={() => {
      downloadSVGback();
    }}
    class="btn btn-sm btn-primary btn-outline mb-6"
    >{$lang === "en" ? "Print backside" : "Rückseite Drucken"}</button
  >
{/if}

<div class="bottom-0 lg:absolute text-sm mr-8 text-gray-500 mb-4">
  <p>
    {$lang === "en"
      ? "Kiezcolors was developed by ODIS and CityLAB Berlin. ODIS and CityLAB are projects of the Technology Foundation Berlin and are funded by the Berlin Senate Chancellery."
      : "Kiezcolors wurde von ODIS und CityLAB Berlin entwickelt. ODIS und CityLAB sind Projekte der Technologiestiftung Berlin und werden von der Berliner Senatskanzlei gefördert."}
  </p>

  <div
    style="text-align:center;margin-top:20px"
    class="flex flex-wrap sm:flex-nowrap"
  >
    <a class="basis-2/4" style="padding:10px" href="https://odis-berlin.de">
      <img width="200" alt="odis-logo" src="./img/logo-odis-berlin.svg" />
    </a>

    <a
      class="basis-2/4"
      style="padding:10px"
      href="https://citylab-berlin.org/de/start/"
    >
      <img
        width="200"
        alt="citylab-logo"
        src="./img/logo-citylab-berlin.svg"
      /></a
    >
    <a
      class="basis-2/4"
      style="padding:10px"
      href="https://www.technologiestiftung-berlin.de/"
      ><img
        width="150"
        alt="technologiestiftung-logo"
        src="./img/logo-tsb.svg"
      /></a
    >
    <a
      class="basis-2/4"
      style="padding:10px"
      href="https://www.berlin.de/rbmskzl/"
      ><img
        width="100"
        alt="seninnds-logo"
        src="./img/B_RBm_Skzl_Logo_DE_V_PT_RGB.svg"
      /></a
    >
  </div>
  <div class="w-full text-center text-gray-400">
    <a href="https://www.technologiestiftung-berlin.de/impressum">Impressum</a>
    <input
      bind:checked={$printBackUI}
      type="checkbox"
      class="checkbox checkbox-primary checkbox-xs opacity-90 fixed bottom-0 left-0"
    />
  </div>
</div>
