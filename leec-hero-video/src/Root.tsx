import { Composition } from "remotion";
import { LeecHeroVideo } from "./leec-hero-video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LeecHeroVideo"
      component={LeecHeroVideo}
      durationInFrames={1000}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};