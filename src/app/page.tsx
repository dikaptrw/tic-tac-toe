import { Metadata } from "next";
import GameContainer from "./components/GameContainer";
import { getGlobalMetadata } from "./utils/metadata";

export const metadata: Metadata = {
  ...getGlobalMetadata(),
};

export default function Home() {
  return (
    <div className="h-[calc(100dvh-env(safe-area-inset-bottom))] flex items-center justify-center bg-black">
      <GameContainer />
    </div>
  );
}
