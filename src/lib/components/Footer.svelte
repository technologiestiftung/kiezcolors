<script>
  import { lang, printBackUI } from "$lib/stores.js";
</script>

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
