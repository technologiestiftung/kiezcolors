<script>
  // https://github.com/rob-balfre/svelte-select/tree/feature/v5
  import Select from "svelte-select";

  import loadOptions from "./requestAddress.js";
  import { newBounds, lang } from "$lib/stores.js";

  let noOptionsMessage = "Keine Ergebnisse";

  let selectedSearchResult;

  function handleSelect(event) {
    const placeCoordinates = [event.detail.lon, event.detail.lat];
    $newBounds = placeCoordinates;

    selectedSearchResult = JSON.parse(JSON.stringify(event.detail));
  }

  function handelClear() {
    selectedSearchResult = null;
  }
</script>

<div class="mb-5 pt-5">
  <Select
    {noOptionsMessage}
    {loadOptions}
    loadOptionsInterval={1500}
    placeholder={$lang === "de"
      ? "nach einem Ort suchen"
      : "search for a place"}
    on:select={handleSelect}
    on:clear={handelClear}
    label="display_name"
    value={selectedSearchResult}
  />
</div>

<!-- value={selectedSearchResult}  -->
