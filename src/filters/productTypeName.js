export default function (id) {
  let textStatus = "";
  switch (id) {
    case 1:
      textStatus = "Другое";
      break;
    case 2:
      textStatus = "Потребительский кредит";
      break;
    case 3:
      textStatus = "На рефинансирование";
      break;
    case 4:
      textStatus = "На автомобиль";
      break;
    case 5:
      textStatus = "На покупку квартиры";
      break;
    case 6:
      textStatus = "На строительство жилья";
      break;
  }
  return textStatus;
}
