import { writable, readable } from "svelte/store";

export let areaSizes = writable();
export let circleRadius = writable();
export let dimensions = writable([210 * 3, 148 * 3]);
export let svg = writable();
export let svgBack = writable();
export let totalSize = writable(0);
export let mapCenter = writable();
export let showBasemap = writable(false);
export let locationText = writable();
export let useLocationAsText = writable(false);
export let lang = writable("de");
export let newBounds = writable();

export let textVis = writable("Kiezcolors Text");

export let landuses = {
  AX_FlaecheBesondererFunktionalerPraegung: {
    category: "other",
    info: "Schulen, Museum",
    name: "Besondere funktionale Prägung",
    name_en: "Special functional characterization",
  },
  AX_IndustrieUndGewerbeflaeche: {
    category: "industry",
    info: "",
    name: "Industrie, Gewerbe",
    name_en: "Industry, commerce",
  },
  AX_FlaecheGemischterNutzung: {
    category: "other",
    info: "",
    name: "Gemischte Nutzung",
    name_en: "Mixed use",
  },
  AX_Heide: {
    category: "nature",
    info: "",
    name: "Heide",
    name_en: "Heath",
  },
  AX_Gehoelz: {
    category: "nature",
    info: "",
    name: "Gehölz",
    name_en: "Grove",
  },
  AX_Moor: {
    category: "nature",
    info: "",
    name: "Moor",
    name_en: "Moor",
  },
  AX_Sumpf: {
    category: "nature",
    info: "",
    name: "Sumpf",
    name_en: "Swamp",
  },
  AX_Wald: {
    category: "nature",
    info: "",
    name: "Wald",
    name_en: "Forest",
  },
  AX_Friedhof: {
    category: "nature",
    info: "",
    name: "Friedhof",
    name_en: "Cemetery",
  },
  AX_UnlandVegetationsloseFlaeche: {
    category: "nature",
    info: "",
    name: "Unland, Vegetationslose Fläche",
    name_en: "Wasteland, area without vegetation",
  },
  AX_Landwirtschaft: {
    category: "nature",
    info: "",
    name: "Landwirtschaft",
    name_en: "Farming",
  },
  AX_Fliessgewaesser: {
    category: "water",
    info: "",
    name: "Fliessgewässer",
    name_en: "Watercourse",
  },
  AX_Hafenbecken: {
    category: "water",
    info: "",
    name: "Hafenbecken",
    name_en: "Port basin",
  },
  AX_StehendesGewaesser: {
    category: "water",
    info: "",
    name: "Stehendes Gewässer",
    name_en: "Stagnant water",
  },
  AX_SportFreizeitUndErholungsflaeche: {
    category: "leisure",
    info: "",
    name: "Sport, Freizeit, Erholungsfläche",
    name_en: "Sports, leisure, recreational area",
  },
  AX_Platz: {
    category: "street",
    info: "",
    name: "Platz",
    name_en: "Square",
  },
  AX_Strassenverkehr: {
    category: "street",
    info: "",
    name: "Straßenverkehr",
    name_en: "Street traffic",
  },
  AX_Weg: {
    category: "street",
    info: "",
    name: "Weg",
    name_en: "Path",
  },
  AX_Wohnbauflaeche: {
    category: "living",
    info: "",
    name: "Wohnbau",
    name_en: "Residential",
  },
  AX_Halde: {
    category: "trash",
    info: "",
    name: "Halde",
    name_en: "Dump",
  },
  AX_Flugverkehr: {
    category: "transport",
    info: "",
    name: "Flugverkehr",
    name_en: "Air traffic",
  },
  AX_TagebauGrubeSteinbruch: {
    category: "industry",
    info: "",
    name: "Tagebau, Grube, Steinbruch",
    name_en: "Open pit, mine, quarry",
  },
  AX_Schiffsverkehr: {
    category: "transport",
    info: "",
    name: "Schiffsverkehr",
    name_en: "Shipping traffic",
  },
  AX_Bahnverkehr: {
    category: "transport",
    info: "",
    name: "Bahnverkehr",
    name_en: "Rail transport",
  },
};

export let categories = {
  street: { color: "#292929", name: "street" },
  living: { color: "#cf4b56", name: "living" },
  trash: { color: "#89775c", name: "trash" },
  transport: { color: "#4d5759", name: "transport" },
  other: { color: "#9c6a74", name: "other" },
  water: { color: "#277da1", name: "water" },
  nature: { color: "#53935c", name: "nature" },
  industry: { color: "#f9c74f", name: "industry" },
  leisure: { color: "#a4ba72", name: "leisure" },
};
