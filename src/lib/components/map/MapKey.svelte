<script>
  import { categories, dimensions, lang } from "$lib/stores.js";
</script>

<div class="z-50 fixed bottom-4 pointer-events-auto flex ml-2">
  {#each Object.values(categories) as { color, name, name_en }, i}
    <div class="flex align-middle">
      <div
        class="w-4 h-4 rounded-full ml-2"
        style={`background-color:${color}`}
      />
      <p class="align-middle leading-4 ml-1">
        {$lang === "de" ? name : name_en}
      </p>
    </div>

    <!-- 
    <div
      class="badge gap-2 text-white mx-1 border-none"
      style={`background-color:${color}`}
    >
      {$lang === "de" ? name : name_en}
    </div> -->
  {/each}
</div>
