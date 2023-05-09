<!-- WrappedText.svelte -->
<script>
  export let text = "";
  export let x = 0;
  export let y = 0;
  export let width = 0;
  export let lineHeight = 1.2;
  export let fontSize = 16;
  export let fontFamily = "Arial";
  export let fontStyle = "";
  export let fontFill = "#292929";

  import { onMount, afterUpdate } from "svelte";

  let lines = [];
  let canvas;
  let context;

  const wrapText = () => {
    lines = [];

    context.font = `${fontSize}px ${fontFamily}`;
    const textBlocks = text.split("$");
    textBlocks.forEach((block, blockIdx) => {
      const words = block.split(" ");
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const newLine = `${currentLine} ${word}`;
        const lineWidth = context.measureText(newLine).width;

        if (lineWidth > width) {
          lines.push({
            text: currentLine,
            extraSpace: blockIdx > 0 && i === 1,
          });
          currentLine = word;
        } else {
          currentLine = newLine;
        }
      }

      lines.push({
        text: currentLine,
        extraSpace: blockIdx > 0 && words.length === 1,
      });
      if (blockIdx < textBlocks.length - 1) {
        lines.push({ text: "", extraSpace: false }); // Add an extra empty line after each block
      }
    });
  };

  onMount(() => {
    context = canvas.getContext("2d");
    wrapText();
  });

  afterUpdate(() => {
    wrapText();
  });
</script>

<text
  {x}
  {y}
  font-size={fontSize}
  font-family={fontFamily}
  font-style={fontStyle}
  fill={fontFill}
>
  {#each lines as line, i}
    <tspan
      {x}
      dy={i === 0 ? 0 : (line.extraSpace ? 2 : 1) * lineHeight * fontSize}
      >{line.text}</tspan
    >
  {/each}
</text>
<canvas bind:this={canvas} style="display: none;" />
