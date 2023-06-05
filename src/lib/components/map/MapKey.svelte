<script>
  import { categories, dimensions, lang, isMobile } from "$lib/stores.js";
</script>

<div
  class="z-50 absolute pointer-events-auto inline-block mx-2"
  style={$isMobile ? "" : "max-width:calc(100% - 250px)"}
  class:relative={$isMobile}
  class:bottom-4={!$isMobile}
  class:my-8={$isMobile}
>
  {#each Object.values(categories) as { color, name, name_en }, i}
    <div class="inline-block align-middle">
      <div
        class="w-4 h-4 rounded-full ml-2 inline-block"
        style={`background-color:${color}`}
      />
      <p class="align-middle leading-4 ml-1 inline-block mb-2">
        {$lang === "de" ? name : name_en}
      </p>
    </div>
  {/each}
</div>
