"use client";

import { useNftCollectionMetadata } from "@/util/hooks/useNftCollectionMetadata";
import { Button } from "./ui/button";
import { Address } from "viem";

type Props = {
  address: Address;
};

export function NftCollectionMetadata({ address }: Props) {
  const {
    data: metadata,
    isLoading,
    error,
    isError,
  } = useNftCollectionMetadata("0xbd3531da5cf5857e7cfaa92426877b022e612cf8");

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (!metadata) return <div>Metadata is undefined</div>;

  return (
    <div className="relative h-96">
      <img
        src={metadata.collection_banner_image}
        className="h-full w-full rounded-xl object-fill"
        alt="Collection Banner Image"
      />

      <div className="absolute inset-0 flex flex-col rounded-xl bg-black/50 p-4">
        <InfoBox
          logo={metadata.collection_logo}
          name={metadata.name}
          verified={metadata.verified_collection}
          collectionAddress={metadata.token_address}
          discordUrl={metadata.discord_url}
          projectUrl={metadata.project_url}
          twitterUsername={metadata.twitter_username}
          created={metadata.created_date}
        />

        <Description text={metadata.description} />
      </div>
    </div>
  );
}

function Description({ text }: { text: string }) {
  return (
    <div className="flex w-full">
      <h4 className="line-clamp-3 text-white italic">{text}</h4>
    </div>
  );
}

function InfoBox({
  logo,
  name,
  verified,
  collectionAddress,
  discordUrl,
  projectUrl,
  twitterUsername,
  created,
}: {
  logo: string;
  name: string;
  verified: boolean;
  collectionAddress: string;
  discordUrl: string | null;
  projectUrl: string | null;
  twitterUsername: string | null;
  created: string;
}) {
  return (
    <div className="flex h-full items-center justify-start gap-x-4 pl-20">
      <div className="flex gap-x-4">
        <img
          className="h-50 w-50 rounded-xl object-fill"
          src={logo}
          alt="Collection Logo"
        />

        <div className="flex flex-col justify-center gap-y-2 pb-1 text-white">
          {/* TITLE and Badge */}
          <div className="flex gap-x-2">
            <h1 className="text-4xl font-bold">{name}</h1>

            {verified && (
              <img
                src="/badge.svg"
                alt="Verified Collection"
                height={30}
                width={30}
              />
            )}
          </div>

          {/* Token address */}
          <div className="flex flex-col font-bold">
            <h6 className="text-xs">Address:</h6>
            <h6>{collectionAddress}</h6>
          </div>

          {/* Social Button */}
          <div className="flex flex-row gap-x-2">
            {/* Discord */}
            {discordUrl && (
              <Button
                key={"Discord"}
                className="cursor-pointer"
                onClick={() => {
                  window.open(discordUrl, "_blank");
                }}
              >
                Discord
              </Button>
            )}
            {/* Project */}
            {projectUrl && (
              <Button
                key={"Project"}
                className="cursor-pointer"
                onClick={() => {
                  window.open(projectUrl, "_blank");
                }}
              >
                Project
              </Button>
            )}
            {/* Twitter */}
            {twitterUsername && (
              <Button
                key={"Twitter"}
                className="cursor-pointer"
                onClick={() => {
                  window.open(`https://x.com/${twitterUsername}`, "_blank");
                }}
              >
                Twitter
              </Button>
            )}
          </div>
          <Button className="w-min">Createad: {created}</Button>
        </div>
      </div>
    </div>
  );
}
