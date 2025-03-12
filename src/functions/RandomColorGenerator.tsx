function RandomColorGenerator() {
  let color = "#000000";
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  color = "#" + randomColor;

  return color;
}
export default RandomColorGenerator;
