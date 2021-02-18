import { sequenceOrientationEnum } from "../enums/sequenceOrientationEnum";

const winningCombinations = [
  { sequence: [1, 2, 3], orientation: sequenceOrientationEnum.horizontal },
  { sequence: [4, 5, 6], orientation: sequenceOrientationEnum.horizontal },
  { sequence: [7, 8, 9], orientation: sequenceOrientationEnum.horizontal },
  { sequence: [1, 4, 7], orientation: sequenceOrientationEnum.vertical },
  { sequence: [2, 5, 8], orientation: sequenceOrientationEnum.vertical },
  { sequence: [3, 6, 9], orientation: sequenceOrientationEnum.vertical },
  { sequence: [1, 5, 9], orientation: sequenceOrientationEnum.diagonal },
  { sequence: [3, 5, 7], orientation: sequenceOrientationEnum.diagonal },
];

Object.freeze(winningCombinations);

export { winningCombinations };
