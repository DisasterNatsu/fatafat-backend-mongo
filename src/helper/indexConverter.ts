export const toNumber = (index: string): number => {
  switch (index) {
    case "one":
      return 0;
    case "two":
      return 1;
    case "three":
      return 2;
    case "four":
      return 3;
    case "five":
      return 4;
    case "six":
      return 5;
    case "seven":
      return 6;
    case "eight":
      return 7;
    default:
      // If the index is not one of the expected values, return a default value
      console.error(`Unexpected index value: ${index}`);
      // You can return a default value or throw an error with a more specific message
      // return -1; // or any default value
      throw new Error(`Unexpected index value: ${index}`);
  }
};
