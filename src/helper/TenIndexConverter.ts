export const toNumberTens = (index: string): number => {
  switch (index) {
    case "zero":
      return 0;
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      // If the index is not one of the expected values, return a default value
      console.error(`Unexpected index value: ${index}`);
      // You can return a default value or throw an error with a more specific message
      // return -1; // or any default value
      throw new Error(`Unexpected index value: ${index}`);
  }
};
