const getRandomLightColor = () => {
  const letters = "BCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

export default getRandomLightColor;
