<script>
  import Map from "$lib/components/map/Map.svelte";
  import MapKey from "$lib/components/map/MapKey.svelte";

  import PostcardFront from "$lib/components/postcard/PostcardFront.svelte";
  import PostcardBack from "$lib/components/postcard/PostcardBack.svelte";
  import Search from "$lib/components/search/Search.svelte";
  import PrintAndDownload from "$lib/components/PrintAndDownload.svelte";
  import Footer from "$lib/components/Footer.svelte";

  import {
    dimensions,
    lang,
    showBack,
    isMobile,
    screenWidth,
    printBackUI,
  } from "$lib/stores.js";

  let innerWidth = 0;
  let innerHeight = 0;

  $: $isMobile = innerWidth <= 1023;
  $: $screenWidth = innerWidth;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

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

<section class="w-full h-screen block lg:flex">
  <div
    class="lg:h-full w-full lg:w-1/3 bg-white z-10 relative p-4 lg:p-8 overflow-auto "
    class:shadow-lg={!$isMobile}
  >
    <div class="bold py-4 text-5xl">Kiezcolors</div>

    <p class="my-4">
      {#if $lang === "en"}
        Create a postcard, which shows the distribution of land use in your
        neighborhood. Simply move the map from Berlin or search for a location.
        You can also change the text on the postcard.
      {:else}
        Hier kannst du dir eine Postkarte erstellen, die die Verteilung der
        Flächennutzung in deiner Nachbarschaft zeigt. Verschiebe einfach die
        Karte von Berlin oder suche nach einem Ort. Den Text auf der Postkarte
        kannst du auch ändern.
      {/if}
    </p>

    <div class="w-full"><Search /></div>

    <span class="hidden lg:block">
      <PrintAndDownload />
      <Footer />
    </span>
  </div>
  <div class="h-1/2 lg:h-full w-full bg-white flex items-center">
    <Map />
    {#if !$isMobile}
      <PostcardFront />
    {/if}
  </div>

  {#if $isMobile}
    <div class="relative width-full bg-gray-100">
      <MapKey />
    </div>
  {/if}
  {#if $isMobile}
    <PostcardFront />
  {/if}
  <div class="lg:hidden lg:w-1/3 bg-white z-10 relative m-4 overflow-auto">
    <PrintAndDownload />
    <Footer />
  </div>
</section>

{#if $printBackUI}
  <span class="p-4 hidden">
    <PostcardBack />
  </span>
{/if}

<style>
  .bold {
    font-family: "IBM Plex Sans Bold";
  }
</style>
