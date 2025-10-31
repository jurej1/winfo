export default (chainId: number) => {
  switch (chainId) {
    case 1:
      return "0x1111111254EEB25477B68fb85Ed929f73A960582";
    case 56:
      return "0x1111111254EEB25477B68fb85Ed929f73A960582";
    default:
      throw new Error(`Network ${chainId} is not supported`);
  }
};
