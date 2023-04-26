<script>
  import { newBounds, textVis, lang } from "$lib/stores.js";

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
    // $textVis = label;
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

<div class="absolute z-50 top-2 " style="transform:translate(2%); width:96%">
  <div class="form-control">
    <div class="input-group">
      <input
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        placeholder={$lang === "de" ? "suche..." : "search..."}
        bind:value={searchText}
        on:keydown={search}
        on:click={killEvent}
        class="input input-bordered input-primary w-full px-4"
      />
      <button
        class="btn btn-square btn-primary"
        on:click={search}
        on:keydown={search}
        id="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          /></svg
        >
      </button>
    </div>
  </div>

  <div class="listContainerWrapper z-50 w-full left-0 mt-2 bg-white rounded">
    {#if searchResults}
      <div class="listContainer rounded">
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
