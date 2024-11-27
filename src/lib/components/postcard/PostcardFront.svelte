<!-- NOTES
https://bl.ocks.org/mbostock/4063582
https://medium.com/codex/getting-started-with-svelte-and-d3-js-ea915d2c2c2c
https://github.com/d3/d3-hierarchy
https://observablehq.com/@d3/treemap
 -->
<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import textures from "textures";
  import chroma from "chroma-js";
  import {
    areaSizes,
    landuses,
    categories,
    dimensions,
    svg,
    textVis,
    useLocationAsText,
    lang,
    isMobile,
    screenWidth,
  } from "$lib/stores.js";

  let treemap;
  function sumByCount(d) {
    return d.size;
  }
  const width = $dimensions[1],
    height = $dimensions[0];

  let visWrapper;

  function dataUpdated(size) {
    if (!size) return;
    const treeChildren = [];
    Object.keys(categories).forEach((keyCategories) => {
      const child = {};
      child.name = categories[keyCategories].name;
      child.children = [];

      if (!size[keyCategories]) {
        return;
      }
      // ignore small parts
      if (Math.round(size[keyCategories].p) < 1) {
        return;
      } else {
      }
      child.children.push({
        name: keyCategories,
        size: size[keyCategories]?.p || 0,
        color: categories[keyCategories].color,
      });

      treeChildren.push(child);
    });

    const data = {
      children: treeChildren,
    };
    redraw(data);
  }

  $: dataUpdated($areaSizes);
  $: updateText($textVis);

  function updateText(newText) {
    if (!$svg) {
      return;
    }

    $svg
      .selectAll(".title-text")
      .data([newText])
      .text(function (d) {
        return d;
      });
  }

  function redraw(data) {
    if ($svg) {
      $svg.remove();
      // updateData(data);
      // return;
    }
    // if (!svg) {

    const t = d3.transition().duration(1000);

    // svg = d3.select(vis);
    $svg = d3
      .select(visWrapper)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("class", "inline " + ($isMobile ? "border" : ""));

    const rect = $svg.append("rect");
    rect
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#fff"); // f9f9f9

    treemap = d3
      .treemap()
      .tile(d3.treemapBinary)
      .size([width, height - 120])
      .round(true)
      .paddingOuter(4);

    const root = d3.hierarchy(data);
    treemap(root.sum(sumByCount));

    let cell = $svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      });

    $svg
      .selectAll(".title-text")
      .data([$textVis])
      .enter()
      .append("text")
      .attr("class", "title-text")
      .attr("transform", "translate(" + width / 2 + "," + height * 0.91 + ")")
      .attr("text-anchor", "middle")
      .attr("font-family", "IBM Plex Sans Bold")
      .attr("font-size", 30)
      .attr("fill", "#292929")
      .text(function (d) {
        return d;
      });

    cell
      .append("rect")
      .attr("id", function (d) {
        // return d.data.id;
      })
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .attr("fill", function (d) {
        return d.data.color; // color(d.parent.data.id);
      })
      .style("opacity", 0)
      .transition(t)
      .style("opacity", 1);

    cell
      .append("text")
      .attr("x", function (d) {
        return d.x1 - d.x0 - 5;
      })
      .attr("y", function (d) {
        return d.y1 - d.y0 - 10;
      })
      .attr("text-anchor", "end")
      .attr("font-family", "IBM Plex Sans Text")
      .attr("font-size", 12)
      .text(function (d) {
        const w = d.x1 - d.x0;
        const h = d.y1 - d.y0;
        if (w < 30 || h < 30) return;
        return Math.round(d.data.size).toString() + "%";
      })
      .attr("fill", function (d) {
        if (d.data.color) {
          if (d.data.name === "street" || d.data.name === "transport") {
            return chroma(d.data.color).brighten(1).hex();
          } else {
            return chroma(d.data.color).darken(1).hex();
          }
        }
      })
      .style("opacity", 0)
      .transition(t)
      .style("opacity", 1);

    $svg
      .append("text")
      .attr("transform", "translate(" + width / 2 + "," + height * 0.95 + ")")
      .attr("text-anchor", "middle")
      .attr("font-family", "IBM Plex Sans Bold")
      .attr("font-size", 10)
      .attr("fill", "#2f2fa2")
      .text("Viele Grüße vom CityLAB");
  }

  function updateData(newData) {
    const root = d3.hierarchy(newData);
    treemap(root.sum(sumByCount));

    const cells = $svg.selectAll("g").data(root.leaves());

    // Exit old elements not present in the new data
    cells.exit().transition().duration(1000).style("opacity", 0).remove();

    // Update existing elements
    cells
      .transition()
      .duration(1000)
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      });

    cells
      .select("rect")
      .transition()
      .duration(1000)
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .attr("fill", function (d) {
        return d.data.color;
      });

    // Enter new elements present in the new data
    const newCells = cells
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      });

    newCells
      .append("rect")
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .attr("fill", function (d) {
        return d.data.color;
      })
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  }

  //  style={$screenWidth <= 444 ? `transform:scale(${$screenWidth / 444})` : ""}
  //  padding-left: ${
  // (444 / $screenWidth) * 50
  //   }px
</script>

<div
  class={$isMobile
    ? "mx-4 pt-10 text-center"
    : "absolute border right-16 z-40 drop-shadow-xl"}
  style={$screenWidth <= 500
    ? `transform-origin: top left; transform:scale(${
        ($screenWidth - 50) / 444
      }); height: ${(630 * ($screenWidth - 0)) / 444}px;`
    : ""}
>
  <main class="w-full text-center" bind:this={visWrapper} />

  <input
    type="text"
    bind:value={$textVis}
    placeholder={$lang === "de" ? "Dein Text hier" : "Your text here"}
    class="input text-center absolute bottom-10 text-[30px] bold"
    style={$isMobile ? `position: relative; bottom: 90px;  width:440px` : ""}
    class:w-full={$screenWidth <= 444 ? `` : "w-full"}
  />
</div>

<style>
  .bold {
    font-family: "IBM Plex Sans Bold";
  }
</style>
