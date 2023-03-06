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

  const width = $dimensions[1],
    height = $dimensions[0];

  const btnClasses =
    "border px-2 py-1 mr-2 hover:pointer-cursor hover:bg-gray-100";

  var Base64 = {
    // private property

    _keyStr:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding

    encode: function (input) {
      var output = "";

      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;

      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {
        chr1 = input.charCodeAt(i++);

        chr2 = input.charCodeAt(i++);

        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;

        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);

        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);

        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output =
          output +
          this._keyStr.charAt(enc1) +
          this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) +
          this._keyStr.charAt(enc4);
      }

      return output;
    },

    // public method for decoding

    decode: function (input) {
      var output = "";

      var chr1, chr2, chr3;

      var enc1, enc2, enc3, enc4;

      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));

        enc2 = this._keyStr.indexOf(input.charAt(i++));

        enc3 = this._keyStr.indexOf(input.charAt(i++));

        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);

        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);

        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }

        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }

      output = Base64._utf8_decode(output);

      return output;
    },

    // private method for UTF-8 encoding

    _utf8_encode: function (string) {
      string = string.replace(/\r\n/g, "\n");

      var utftext = "";

      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);

          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);

          utftext += String.fromCharCode(((c >> 6) & 63) | 128);

          utftext += String.fromCharCode((c & 63) | 128);
        }
      }

      return utftext;
    },

    // private method for UTF-8 decoding

    _utf8_decode: function (utftext) {
      var string = "";

      var i = 0;

      var c = (c1 = c2 = 0);

      while (i < utftext.length) {
        c = utftext.charCodeAt(i);

        if (c < 128) {
          string += String.fromCharCode(c);

          i++;
        } else if (c > 191 && c < 224) {
          c2 = utftext.charCodeAt(i + 1);

          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));

          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);

          c3 = utftext.charCodeAt(i + 2);

          string += String.fromCharCode(
            ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
          );

          i += 3;
        }
      }

      return string;
    },
  };

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

    // var s = new XMLSerializer().serializeToString(svg.node());
    // var b64 = Base64.encode(svg.node());
    // var encodedData = window.btoa(s);

    var b64 = Base64.encode(svg.node().outerHTML);

    var file_path = "data:image/svg+xml;base64,\n" + b64;
    var a = document.createElement("A");
    a.href = file_path;
    a.download = "postcard.svg";
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

    var b64 = Base64.encode(svg.node().outerHTML);

    var image = new Image();
    image.src = "data:image/svg+xml;base64," + b64;
    image.onload = function () {
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);
      var file_path = canvas.toDataURL("image/png");
      var a = document.createElement("A");
      a.href = file_path;
      a.download = "postcard.png";
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

<p id="intro-text" class="flex mt-4 flex-wrap justify-evenly px-10">
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

<style>
  #nav {
    width: 444px;
    height: 630px;
  }

  #intro-text {
    font-family: "IBM Plex Mono";
  }
</style>
