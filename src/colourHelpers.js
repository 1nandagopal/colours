import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colours: {},
  };
  for (let level of levels) {
    newPalette.colours[level] = [];
  }
  for (let colour of starterPalette.colours) {
    let scale = getScale(colour.colour, 10).reverse();
    for (let i in scale) {
      newPalette.colours[levels[i]].push({
        name: `${colour.name} ${levels[i]}`,
        id: colour.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }
  return newPalette;
}
function getRange(hexcolour) {
  const end = "#fff";
  return [chroma(hexcolour).darken(1.4).hex(), hexcolour, end];
}

function getScale(hexcolour, numberOfcolours) {
  return chroma.scale(getRange(hexcolour)).mode("lab").colors(numberOfcolours);
}

export { generatePalette };
