import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

export const type = "website";
export const title = "Tic-Tac-Toe - Play Tic-Tac-Toe online for free";
export const url = "http://tic-tac-toe.dikaptrw.com";
export const description = `Play Tic-Tac-Toe online for free—no sign-up required. Challenge the computer and aim for your highest score.`;
export const imageUrl = `/tic-tac-toe.webp`;
export const imageType = "image/webp";
export const imageWidth = "1200";
export const imageHeight = "630";
export const twitterSite = "@dikaptrw";
export const twitterCard = "summary_large_image";

interface CustomMetadata extends Metadata {
  openGraph: {
    type?: string;
    width?: string | number;
    height?: string | number;
  } & OpenGraph;
  twitter: {
    url: string | URL;
    card?: "summary_large_image" | "summary" | "player" | "app" | undefined;
  } & Twitter;
}

export const getGlobalMetadata = (meta?: CustomMetadata): Metadata => {
  return {
    ...meta,
    metadataBase: new URL(url),
    title: meta?.title ?? title,
    description: meta?.description ?? description,
    keywords: [
      "portfolio",
      "website",
      "web",
      "developer",
      "front-end",
      "front",
      "end",
      "dika",
      "putra",
    ],
    openGraph: {
      url: meta?.openGraph.url ?? url,
      type: type,
      images: [
        {
          url: meta?.openGraph?.url ?? imageUrl,
          type: meta?.openGraph?.type ?? imageType,
          width: meta?.openGraph?.width ?? imageWidth,
          height: meta?.openGraph?.height ?? imageHeight,
        },
      ],
    },
    twitter: {
      card: meta?.twitter?.card ?? twitterCard,
      site: meta?.twitter?.site ?? twitterSite,
      title: meta?.twitter?.title ?? title,
      description: meta?.twitter?.description ?? description,
      images: [
        {
          url: meta?.twitter?.url ?? imageUrl,
        },
      ],
    },
    robots: {
      follow: process.env.NEXT_PUBLIC_ENV === "production" ? true : false,
      index: process.env.NEXT_PUBLIC_ENV === "production" ? true : false,
    },
  };
};
