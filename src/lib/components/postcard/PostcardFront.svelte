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
  } from "$lib/stores.js";

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

  $: dataUpdated($areaSizes, $textVis);

  function redraw(data) {
    if ($svg) {
      $svg.remove();
    }
    // if (!svg) {

    // svg = d3.select(vis);
    $svg = d3
      .select(visWrapper)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("xmlns", "http://www.w3.org/2000/svg");

    // var defs = $svg.append('svg:defs');

    const rect = $svg.append("rect");
    rect
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#fff"); // f9f9f9

    // defs
    // 	.append('svg:pattern')
    // 	.attr('id', 'circles-1')
    // 	.attr('width', 10)
    // 	.attr('height', 10)
    // 	.attr('patternUnits', 'userSpaceOnUse')
    // 	.append('svg:image')
    // 	.attr(
    // 		'xlink:href',
    // 		'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzMnLz4KPC9zdmc+'
    // 	)
    // 	.attr('width', 10)
    // 	.attr('height', 10)
    // 	.attr('x', 0)
    // 	.attr('y', 0);

    const texture = textures.lines().thicker();

    let treemap = d3
      .treemap()
      .tile(d3.treemapBinary)

      // .tile(d3.treemapSquarify)
      // .tile(d3.treemapResquarify)
      .size([width, height - 120])
      .round(true)
      // .paddingInner(6);
      .paddingOuter(4);

    // }

    const root = d3.hierarchy(data);
    treemap(root.sum(sumByCount));

    // if (cell) {
    // 	cell.exit().remove();
    // }

    let cell = $svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
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
      });
    // .attr('fill', function (d) {
    // 	return d.data.color; // color(d.parent.data.id);
    // });
    // .style('fill', textureTwo.url());
    // .attr('fill', function (d) {
    // 	const textureTwo = textures.lines().size(8).strokeWidth(4).stroke(d.data.color);
    // 	$svg.call(textureTwo);
    // 	return textureTwo.url(); // color(d.parent.data.id);
    // });

    $svg
      .selectAll("text")
      .data([$textVis])
      .enter()
      // .selectAll('tspan')
      // .data(function (d) {
      // 	return d.split(/(?=[A-Z][^A-Z])/g);
      // })
      // .enter()
      .append("text")
      .attr("transform", "translate(" + width / 2 + "," + height * 0.91 + ")")
      .attr("text-anchor", "middle")
      // .attr('x', 4)
      // .attr('y', function (d, i) {
      // 	return 13 + i * 10;
      // })
      .attr("font-family", "IBM Plex Sans Bold")
      .attr("font-size", 30)
      .attr("fill", "#292929")
      .text(function (d) {
        return d;
      })
      .attr("contenteditable", true);

    $svg
      .append("text")
      .attr("transform", "translate(" + width / 2 + "," + height * 0.95 + ")")
      .attr("text-anchor", "middle")
      .attr("font-family", "IBM Plex Sans Bold")
      .attr("font-size", 10)
      .attr("fill", "#2f2fa2")
      .text("Viele Grüße vom CityLAB Kiezlabor");

    // mySVG += '<g transform=translate('+a4With/2+','+a4Height*0.87+
    // 			') text-anchor=middle><text id="img-title" fill=white font-size=25px font-family=Arial>TEXT</text></g>'

    cell
      .append("text")
      // .attr('clip-path', function (d) {
      // 	return 'url(#clip-' + d.data.id + ')';
      // })
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
        // return (Math.round(d.data.size * 10) / 10).toString() + " %";
      })
      .attr("fill", function (d) {
        if (d.data.color) {
          if (d.data.name === "street" || d.data.name === "transport") {
            return chroma(d.data.color).brighten(1).hex();
          } else {
            return chroma(d.data.color).darken(1).hex();
          }
        }
      });

    // cell
    // 	.transition()
    // 	.duration(750)
    // 	.attr('transform', function (d) {
    // 		console.log(d);

    // 		return 'translate(' + d.x0 + ',' + d.y0 + ')';
    // 	})
    // 	.select('rect')
    // 	.attr('width', function (d) {
    // 		return d.x1 - d.x0;
    // 	})
    // 	.attr('height', function (d) {
    // 		return d.y1 - d.y0;
    // 	});

    // cell.exit().remove();

    // if (svg) {
    // 	// treemap(data);
    // 	treemap(root.sum(sumByCount));

    // 	cell
    // 		.transition()
    // 		.duration(750)
    // 		.attr('transform', function (d) {
    // 			return 'translate(' + d.x0 + ',' + d.y0 + ')';
    // 		})
    // 		.select('rect')
    // 		.attr('width', function (d) {
    // 			return d.x1 - d.x0;
    // 		})
    // 		.attr('height', function (d) {
    // 			return d.y1 - d.y0;
    // 		});

    // 	return;
    // 	// }
    // }

    // cell.each(function (p) {
    // 	console.log('dd', p);

    // 	console.log(d3.select(this).select('rect'));

    // 	// d3.select(this)
    // 	//     .selectAll("li")
    // 	//     .text(function (d, i) {
    // 	//         return "child are edited.";
    // 	//     });
    // });

    // cell
    // 	.append('clipPath')
    // 	.attr('id', function (d) {
    // 		return 'clip-' + d.data.id;
    // 	})
    // 	.append('use')
    // 	.attr('xlink:href', function (d) {
    // 		return '#' + d.data.id;
    // 	});

    // cell
    // 	.append('text')
    // 	// .attr('clip-path', function (d) {
    // 	// 	return 'url(#clip-' + d.data.id + ')';
    // 	// })
    // 	.selectAll('tspan')
    // 	.data(function (d) {
    // 		return d.data.name.split(/(?=[A-Z][^A-Z])/g);
    // 	})
    // 	.enter()
    // 	.append('tspan')
    // 	.attr('x', 4)
    // 	.attr('y', function (d, i) {
    // 		return 13 + i * 10;
    // 	})
    // 	.text(function (d) {
    // 		return d;
    // 	});

    // cell.append('title').text(function (d) {
    // 	return d.data.id + '\n' + format(d.value);
    // });

    // d3.selectAll('input')
    // 	.data([sumBySize, sumByCount], function (d) {
    // 		return d ? d.name : this.value;
    // 	})
    // 	.on('change', changed);

    // var timeout = d3.timeout(function () {
    // 	d3.select('input[value="sumByCount"]').property('checked', true).dispatch('change');
    // }, 2000);

    // function changed(sum) {
    // 	timeout.stop();

    // 	treemap(root.sum(sum));

    // 	cell
    // 		.transition()
    // 		.duration(750)
    // 		.attr('transform', function (d) {
    // 			return 'translate(' + d.x0 + ',' + d.y0 + ')';
    // 		})
    // 		.select('rect')
    // 		.attr('width', function (d) {
    // 			return d.x1 - d.x0;
    // 		})
    // 		.attr('height', function (d) {
    // 			return d.y1 - d.y0;
    // 		});
    // }

    // setTimeout(() => {
    // 	// treemap(dataTwo);
    // 	treemap(root.sum(sumByCount));

    // 	cell
    // 		.transition()
    // 		.duration(750)
    // 		.attr('transform', function (d) {
    // 			return 'translate(' + d.x0 + ',' + d.y0 + ')';
    // 		})
    // 		.select('rect')
    // 		.attr('width', function (d) {
    // 			return d.x1 - d.x0;
    // 		})
    // 		.attr('height', function (d) {
    // 			return d.y1 - d.y0;
    // 		});
    // 	// }
    // }, 2000);

    function sumByCount(d) {
      return d.size;
    }

    // function sumBySize(d) {
    // 	return d.size * Math.random();
    // }
  }
</script>

<div class="absolute border right-14 top-24 z-40 drop-shadow-xl">
  <main class="w-fit" bind:this={visWrapper} />

  <input
    type="text"
    bind:value={$textVis}
    placeholder={$lang === "de" ? "Dein Text hier" : "Your text here"}
    class="input  w-full text-center absolute bottom-10 text-[30px] bold"
  />
</div>

<style>
  .bold {
    font-family: "IBM Plex Sans Bold";
  }
</style>
