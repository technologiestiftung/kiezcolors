<script>
  // https://github.com/rob-balfre/svelte-select/tree/feature/v5
  import Select from "svelte-select";
  import Icon from "./Icon.svelte";

  import loadOptions from "./requestAddress.js";
  import { newBounds, textVis, lang } from "$lib/stores.js";

  let noOptionsMessage = "Keine Ergebnisse";

  let searchMarker;
  let selectedSearchResult;

  const optionIdentifier = "markerId";
  const getOptionLabel = (option) => option.display_name;
  const getSelectionLabel = (option) => option.display_name;
  const groupBy = function (item) {
    return item.group;
  };

  function handleSelect(event) {
    selectedSearchResult = JSON.parse(JSON.stringify(event.detail));
    const placeCoordinates = [event.detail.lon, event.detail.lat];
    $newBounds = placeCoordinates;
  }

  function handelClear() {
    if (searchMarker) searchMarker.remove();
    selectedSearchResult = null;
  }
</script>

<div class="mb-5 pt-5">
  <Select
    {Icon}
    {noOptionsMessage}
    {loadOptions}
    {optionIdentifier}
    {getSelectionLabel}
    {getOptionLabel}
    loadOptionsInterval={500}
    value={selectedSearchResult}
    {groupBy}
    placeholder="Adresse / Akteur:in finden"
    on:select={handleSelect}
    on:clear={handelClear}
  />
</div>

<style lang="scss">
  @import "../../../styles/variables.scss";

  :global(.clearSelect) {
    cursor: pointer !important;
  }
  :global(.place-marker) {
    border-radius: 20px;
    opacity: 0.5;
    width: 20px;
    height: 20px;
    border: 3px solid #e40422;
  }

  :global(.svelte-select) {
    color: $color-greendark !important;
    height: 50px !important;
  }

  :global(.svelte-select.focused) {
    border-color: $color-greendark !important;
  }

  :global(.svelte-select input) {
    padding: 0 10px 0 40px !important;
  }
  :global(.svelte-select svg) {
    opacity: 0.5 !important;
    margin-right: 10px !important;
  }
</style>
