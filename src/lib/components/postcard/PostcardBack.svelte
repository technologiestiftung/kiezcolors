<script>
  import { categories, dimensions } from "$lib/stores.js";
  import LogoCityLab from "$lib/components/logos/LogoCityLab.svelte";
  import LogoODIS from "$lib/components/logos/LogoODIS.svelte";
  import LogoTSB from "$lib/components/logos/LogoTSB.svelte";

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
    <!-- <text
      transform="translate(100,20)"
      text-anchor="end"
      font-family="IBM Plex Sans Text"
      font-size="14"
      fill="#292929"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ea
      exercitationem quibusdam deserunt veniam ipsum dignissimos numquam maxime
      rem, optio molestias consectetur in cupiditate magni minus velit
      asperiores impedit. Quisquam?
    </text> -->

    {#each Object.values(categories) as { color, name, name_en }, i}
      <rect
        classs="rect-legend"
        width="20"
        height="20"
        fill={color}
        transform={`translate(20,${20 + i * 24})`}
      />
      <text
        classs="text-legend"
        transform={`translate(45,${36 + i * 24})`}
        text-anchor="start"
        font-family="IBM Plex Sans Text"
        font-size="14"
        fill="#292929">{name} / {name_en}</text
      >
    {/each}

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
      transform={`translate(${width - 110},${20})`}
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
  <g transform="translate(10,370)">
    <LogoCityLab width={150} height={50} />
  </g>
  <g transform="translate(150,370)">
    <LogoODIS width={150} height={50} />
  </g>
  <g transform="translate(300,370)">
    <LogoTSB width={150} height={50} />
  </g>
</svg>
