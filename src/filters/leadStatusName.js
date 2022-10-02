export default function (id) {
  let textStatus = "";
  switch (id) {
    case 1:
      textStatus = "Новый";
      break;
    case 2:
      textStatus = "Просмотрен";
      break;
    case 3:
      textStatus = "Обработан";
      break;
    case 4:
      textStatus = "Удален";
      break;
  }
  return textStatus;
}
