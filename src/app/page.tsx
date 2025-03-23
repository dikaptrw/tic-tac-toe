import GameContainer from "./components/GameContainer";

export default function Home() {
  return (
    <div className="h-[calc(100dvh-env(safe-area-inset-bottom))] flex items-center justify-center bg-black">
      <GameContainer />
    </div>
  );
}
