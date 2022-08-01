export const formatDate = (date: string) => {
  const arrayOfValues = date.split('-');
  const day = arrayOfValues[0];
  const month = Number(arrayOfValues[1]);
  const year = arrayOfValues[2];

  switch (month) {
    case 1:
      return `${day} January ${year}`;
    case 2:
      return `${day} February ${year}`;
    case 3:
      return `${day} March ${year}`;
    case 4:
      return `${day} April ${year}`;
    case 5:
      return `${day} May ${year}`;
    case 6:
      return `${day} June ${year}`;
    case 7:
      return `${day} July ${year}`;
    case 8:
      return `${day} August ${year}`;
    case 9:
      return `${day} September ${year}`;
    case 10:
      return `${day} October ${year}`;
    case 11:
      return `${day} November ${year}`;
    case 12:
      return `${day} December ${year}`;
    default:
      return `${day} NULL ${year}`;
  }
};

export const dateDiffers = (oldDate: string, newDate: string) => {
  const oldDateArr = oldDate.split('-');
  const newDateArr = newDate.split('-');

  return (
    oldDateArr[0] !== newDateArr[0] ||
    oldDateArr[1] !== newDateArr[1] ||
    oldDateArr[2] !== newDateArr[2]
  );
};
