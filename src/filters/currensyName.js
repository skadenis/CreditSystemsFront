export default function (id) {
  let textStatus = "";
  switch (id) {
    case 1:
      textStatus = "BYN";
      break;
    case 2:
      textStatus = "USD";
      break;
    case 3:
      textStatus = "EUR";
      break;
  }
  return textStatus;
}
