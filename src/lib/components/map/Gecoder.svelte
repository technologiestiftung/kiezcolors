<script>
  import { newBounds, textVis } from "$lib/stores.js";

  let searchText = "";
  let searchResults = undefined;
  let selectedIndex = undefined;

  async function search(event) {
    if (event.keyCode === 13 && (selectedIndex || selectedIndex === 0)) {
      selectResult(
        searchResults[selectedIndex].value,
        searchResults[selectedIndex].label
      );
      return;
    }

    if (event.keyCode === 13 || event.target.getAttribute("id") === "submit") {
      let geocoderQuery = `https://nominatim.openstreetmap.org/search.php?viewbox=13.0648,52.7554,13.7796,52.33449&bounded=1&q=${searchText}&format=json&limit=5`;

      // get the data
      let fetchResults = await fetch(geocoderQuery)
        .then((r) => r.json())
        .catch((error) => {
          return;
        });

      let results = [];

      fetchResults.forEach((result, i) => {
        results.push({
          value: [Number(result.lon), Number(result.lat)],
          label: result.display_name,
        });
      });

      searchResults = results;
      searchText = "";
      selectedIndex = 0;
      return;
    }

    if (event.keyCode === 38 || event.keyCode === 40) {
      const searchResultsLength = searchResults.length;
      if (event.keyCode === 38) {
        selectedIndex =
          (selectedIndex - 1 + searchResultsLength) % searchResultsLength;
      }
      if (event.keyCode === 40) {
        selectedIndex = (selectedIndex + 1) % searchResultsLength;
      }
      return;
    }

    clearResults();
  }

  function selectResult(value, label) {
    clearResults();
    $newBounds = value;
    $textVis = label;
  }

  function clearResults() {
    searchResults = undefined;
    selectedIndex = undefined;
  }

  function killEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }
</script>

<svelte:window on:click={clearResults} />

<div
  class="absolute z-50 top-2 bg-white "
  style="transform:translate(2%); width:96%"
>
  <div
    class="demo-icon icon-search absolute text-xl right-4 mt-1 cursor-pointer top-2"
    on:click={search}
    on:keydown={search}
  >
    <svg
      id="submit"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class=""
      viewBox="0 0 16 16"
    >
      <path
        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
      />
    </svg>
  </div>

  <input
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    placeholder="search..."
    bind:value={searchText}
    on:keydown={search}
    on:click={killEvent}
    class=" h-10 w-full px-4 focus:border-white"
  />

  <div class="listContainerWrapper z-50 w-full left-0 top-12">
    {#if searchResults}
      <div class="listContainer">
        {#each searchResults as result, i}
          <div
            class="listItem hover:bg-secondary hover:text-white cursor-pointer z-50"
            class:bg-secondary={i === selectedIndex}
            class:text-white={i === selectedIndex}
            title={result.label}
            on:click={() => selectResult(result.value, result.label)}
            on:keydown={() => selectResult(result.value, result.label)}
          >
            <div
              class="item p-4 overflow-hidden whitespace-nowrap text-ellipsis h-12"
            >
              {result.label}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
</style>
