import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resource } from "sst";

const UPLOAD_EXPIRATION_SECONDS = 300;

export const getPresignedUrlForWallet = (wallet: string) => {
  const s3client = new S3Client();

  const command = new PutObjectCommand({
    Bucket: Resource.ImagesBucket.name,
    Key: wallet,
  });

  return getSignedUrl(s3client, command, {
    expiresIn: UPLOAD_EXPIRATION_SECONDS,
  });
};
