/* eslint-disable @typescript-eslint/no-explicit-any */
export const shuffleArray = (array: any[]): any[] => {
  const copyArray = array.slice();
  let randomIndex: number;
  let randomItem: unknown;

  for (let i = copyArray.length - 1; i > 0; i -= 1) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    randomItem = copyArray[i];

    copyArray[i] = copyArray[randomIndex];
    copyArray[randomIndex] = randomItem;
  }

  return copyArray;
};
