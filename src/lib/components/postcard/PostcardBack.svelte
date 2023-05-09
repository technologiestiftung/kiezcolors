<script>
  import { categories, dimensions } from "$lib/stores.js";
  import LogoKiezlab from "$lib/components/logos/LogoKiezlab.svelte";
  import LogoODIS from "$lib/components/logos/LogoODIS.svelte";
  import LogoTSB from "$lib/components/logos/LogoTSB.svelte";
  import LogoSenatskanzlei from "$lib/components/logos/LogoSenatskanzlei.svelte";

  import MulitlineText from "./MulitlineText.svelte";
  const width = $dimensions[0],
    height = $dimensions[1];
</script>

<svg
  encoding="UTF-8"
  version="1.0"
  {width}
  {height}
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="0" y="0" {width} {height} fill="#f9f9f9" />

  <g>
    <g transform="translate(15,5)">
      <MulitlineText
        text="Wie viel Platz brauchen wir eigentlich, um zu wohnen, uns fortzubewegen und mal tief durchzuatmen?$Eine gerechte Nutzung der Fläche in Städten kann dazu beitragen, dass wir glücklicher und gesünder leben. Besuche kiezcolors.odis-berlin.de und entdecke die Verteilung in deinem Kiez,"
        x="10"
        y="30"
        width="275"
        lineHeight="1.4"
        fontSize="11"
        fontFamily="IBM Plex Sans Text"
        fill="#292929"
      />
    </g>

    <g transform="translate(15,107)">
      <MulitlineText
        text="Mit herzlichen Grüßen aus dem Kiezlabor!"
        x="10"
        y="30"
        width="275"
        lineHeight="1.4"
        fontSize="11"
        fontFamily="IBM Plex Sans Text"
        fill="#292929"
      />
    </g>

    <g transform="translate(15,170)">
      {#each Object.values(categories) as { color, name, name_en }, i}
        <rect
          classs="rect-legend"
          width="10"
          height="10"
          fill={color}
          transform={`translate(10,${10 + i * 14})`}
        />
        <text
          classs="text-legend"
          transform={`translate(25,${19 + i * 14})`}
          text-anchor="start"
          font-family="IBM Plex Sans Text"
          font-size="11"
          fill="#292929">{name} ({name_en})</text
        >
      {/each}
    </g>

    <g transform="translate(15,310)">
      <MulitlineText
        text="Du siehst die Flächenverteilung in einem 1000 Meter Radius.
        Möglich gemacht durch offene Verwaltungsdaten des Liegenschaftskatasters (ALKIS) aus dem Geoportal Berlin. <3"
        x="10"
        y="30"
        width="275"
        lineHeight="1.4"
        fontSize="9"
        fontFamily="IBM Plex Sans Text"
        fontStyle="italic"
        fontFill="#666"
      />
    </g>

    <line
      y1="30"
      x1={width / 2}
      y2={height - 30}
      x2={width / 2}
      style="stroke:#292929;stroke-width:1"
    />

    <line
      y1={200}
      x1={width - 30}
      y2={200}
      x2={width / 2 + 30}
      style="stroke:#292929;stroke-width:1"
    />

    <line
      y1={250}
      x1={width - 30}
      y2={250}
      x2={width / 2 + 30}
      style="stroke:#292929;stroke-width:1"
    />

    <line
      y1={300}
      x1={width - 30}
      y2={300}
      x2={width / 2 + 30}
      style="stroke:#292929;stroke-width:1"
    />

    <rect
      width="90"
      height="120"
      style="stroke:#292929;stroke-width:1"
      transform={`translate(${width - 120},${30})`}
      fill="transparent"
    />

    <text
      transform="translate(424,535.5)"
      text-anchor="end"
      font-family="IBM Plex Sans Text"
      font-size="12"
      fill="#292929"
      ><tspan x="0" y="0" dy="1.5em"
        >Data: Geoportal Berlin / ALKIS Berlin</tspan
      ><tspan x="0" y="0" dy="3em">KiezLabor 2023</tspan><tspan
        x="0"
        y="0"
        dy="4.5em">kiezcolors.odis-berlin.de</tspan
      >
    </text>
  </g>
  <g transform="translate(25,375)">
    <!-- <text font-size="12" fill="#292929">Ein Projekt von</text> -->
    <LogoODIS width={130} height={50} />
  </g>
  <g transform="translate(175,375)">
    <!-- <text font-size="12" fill="#292929">mit</text> -->
    <LogoKiezlab width={120} height={50} />
  </g>
  <g transform="translate(340,375)">
    <!-- <text font-size="12" fill="#292929">unterstützt von</text> -->

    <LogoTSB width={120} height={50} />
  </g>
  <g transform="translate(500,370)">
    <!-- <text font-size="12" fill="#292929">gefördert von</text> -->

    <LogoSenatskanzlei width={120} height={50} />
  </g>
</svg>
