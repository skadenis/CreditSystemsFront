export default function (id) {
  let textStatus = "";
  switch (id) {
    case 1:
      textStatus = "Дифференцированный";
      break;
    case 2:
      textStatus = "Аннуитетный";
      break;
  }
  return textStatus;
}
