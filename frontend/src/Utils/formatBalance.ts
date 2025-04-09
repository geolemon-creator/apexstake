export const formatBalance = (value: number): string => {
  const [intPart, decimalPart] = value.toString().split('.');

  if (!decimalPart || /^0+$/.test(decimalPart)) {
    return intPart;
  }

  return `${intPart}.${decimalPart.slice(0, 2)}`;
};
