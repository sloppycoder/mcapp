const palette = {
  // cornflower blue
  primary: '#1273AC',
  // Very dark grayish
  secondary: '#6D6D72',
  white: '#fff',
  play: '#83e5c0',
  pause: '#fce25a',
  stop: '#ff0000'
};

const styles = Object.keys(palette).reduce((accumulator, name) => {
  let colorValue = palette[name];
  let capitalizedColorName = `${name.substr(0, 1).toUpperCase()}${name.substr(
    1
  )}`;
  accumulator[name] = { color: colorValue };
  accumulator[`bg${capitalizedColorName}`] = { backgroundColor: colorValue };
  accumulator[`br${capitalizedColorName}`] = { borderColor: colorValue };
  accumulator[`brt${capitalizedColorName}`] = { borderTopColor: colorValue };
  accumulator[`brr${capitalizedColorName}`] = { borderRightColor: colorValue };
  accumulator[`brb${capitalizedColorName}`] = { borderBottomColor: colorValue };
  accumulator[`brl${capitalizedColorName}`] = { borderLeftColor: colorValue };
  accumulator[`out${capitalizedColorName}`] = { outlineColor: colorValue };
  return accumulator;
}, {});

export default { palette, styles };
