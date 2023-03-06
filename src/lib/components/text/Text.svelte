<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import textures from "textures";
  import {
    areaSizes,
    landuses,
    categories,
    dimensions,
    totalSize,
    circleRadius,
    svgBack,
    mapCenter,
    locationText,
    lang,
  } from "$lib/stores.js";

  let visWrapper;
  const width = $dimensions[1],
    height = $dimensions[0];

  $: redraw($areaSizes, $lang);

  function redraw() {
    if ($svgBack) {
      $svgBack.remove();
    }
    if (!$areaSizes) return;
    $svgBack = d3
      .select(visWrapper)
      .append("svg")
      .attr("encoding", "UTF-8")
      .attr("version", "1.0")
      .attr("width", width)
      .attr("height", height)
      .attr("xmlns", "http://www.w3.org/2000/svg");

    // var defs = $svg.append('svg:defs');

    const rect = $svgBack.append("rect");
    rect
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f9f9f9");

    let sizeKeys = JSON.parse(JSON.stringify($areaSizes));
    sizeKeys = Object.keys($areaSizes).filter((key) => {
      if (Math.round($areaSizes[key].p) < 1) {
        return false;
      } else {
        return key;
      }
    });
    sizeKeys = sizeKeys.sort(function compareFn(a, b) {
      return $areaSizes[b].p - $areaSizes[a].p;
    });

    const textGroup = $svgBack.append("g");

    let xPositionRect = 20;
    textGroup
      .selectAll(".rect-legend")
      .data(...[sizeKeys])
      .enter()
      .append("rect")
      .attr("classs", "rect-legend")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", function (d, i) {
        return categories[landuses[d].category].color;
      })
      .attr("transform", function (d, i) {
        if (i != 0) {
          xPositionRect += 24;
        }
        return "translate(" + 20 + "," + xPositionRect + ")";
      });

    let xPositionText = 12;
    textGroup
      .selectAll(".text-legend")
      .data(sizeKeys)
      .enter()
      .append("text")
      .attr("classs", "text-legend")
      .attr("transform", function (d, i) {
        xPositionText += 24;
        return "translate(" + 45 + "," + xPositionText + ")";
      })
      .attr("text-anchor", "start")
      .attr("font-family", "Outfit")
      .attr("font-size", 14)
      .attr("fill", "#292929")
      .html(function (key) {
        return (
          Math.round($areaSizes[key].p) +
          "% " +
          ($lang === "en" ? landuses[key].name_en : landuses[key].name)
        );
      });

    const textLocation =
      $circleRadius +
      "m " +
      ($lang === "en" ? "around " : "um ") +
      $locationText;
    const textData = "Data: Geoportal Berlin / ALKIS Berlin";
    const textMaptime = "Maptime Berlin / Open Data Day 2023";
    const textUrl = "kiezcolors.odis-berlin.de";

    let dy = 0;
    $svgBack
      .append("text")
      .attr(
        "transform",
        "translate(" + (width - 20) + "," + height * 0.85 + ")"
      )
      .attr("text-anchor", "end")
      .attr("font-family", "Outfit")
      .attr("font-size", 12)
      .attr("fill", "#292929")
      .selectAll(".rect-legend")
      .data([textLocation, textData, textMaptime, textUrl])
      .enter()
      .append("tspan")
      .attr("x", 0)
      .attr("y", 0)
      .attr("dy", function () {
        dy = dy + 1.5;
        return dy + "em";
      })
      .text(function (d) {
        return d;
      });
  }
</script>

<div class="w-fit" bind:this={visWrapper} />
