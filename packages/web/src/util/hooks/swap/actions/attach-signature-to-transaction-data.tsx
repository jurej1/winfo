import { concat, Hex, numberToHex, size } from "viem";

export const attachSignatureToTransactionData = (
  signature: Hex,
  transactionData: Hex,
) => {
  const signatureLengthInHex = numberToHex(size(signature), {
    signed: false,
    size: 32,
  });

  const sigLengthHex = signatureLengthInHex as Hex;
  const sig = signature as Hex;

  return concat([transactionData, sigLengthHex, sig]);
};
