import { AbsoluteFill, Sequence, Img, interpolate, spring, useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import { ScaleDownFade } from "@/components/remocn/scale-down-fade";
import { ShortSlideRight } from "@/components/remocn/short-slide-right";
import { KineticCenterBuild } from "@/components/remocn/kinetic-center-build";
import { LineByLineSlide } from "@/components/remocn/line-by-line-slide";
import { StaggeredFadeUp } from "@/components/remocn/staggered-fade-up";
import { ShaderSwirl } from "@/components/remocn/shader-swirl";
import { ShaderSimplexNoise } from "@/components/remocn/shader-simplex-noise";
import { ShaderColorPanels } from "@/components/remocn/shader-color-panels";
import { ShaderMeshGradient } from "@/components/remocn/shader-mesh-gradient";
import { ShaderVoronoi } from "@/components/remocn/shader-voronoi";
import { ShaderMetaballs } from "@/components/remocn/shader-metaballs";
import { ShaderGodRays } from "@/components/remocn/shader-god-rays";
import { ShaderSmokeRing } from "@/components/remocn/shader-smoke-ring";
import { SoftBlurIn } from "@/components/remocn/soft-blur-in";

const ACCENT = "#2E86AB";
const BG = "#0A1628";
const FG = "#F5F2EB";
const MUTED = "rgba(245,242,235,0.55)";

const PHOTOS = {
  labEntrance: staticFile("/photos/lab-entrance.jpg"),
  labInterior: staticFile("/photos/lab-interior.jpg"),
  researchCollab: staticFile("/photos/research-collab.jpg"),
  microscopeResearch: staticFile("/photos/microscope-research.jpg"),
  microscopeStudent: staticFile("/photos/microscope-student.jpg"),
  teamPhoto: staticFile("/photos/team-photo.jpg"),
};

const FEATURES = [
  { name: "Non-Destructive Testing", img: PHOTOS.microscopeResearch },
  { name: "Power Electronics", img: PHOTOS.labInterior },
  { name: "RF Energy Harvesting", img: PHOTOS.researchCollab },
  { name: "Microbial Fuel Cells", img: PHOTOS.microscopeStudent },
  { name: "IoT & Smart Sensors", img: PHOTOS.labEntrance },
  { name: "AI & Smart Systems", img: PHOTOS.teamPhoto },
];

const FEATURE_SHADERS: (typeof ShaderColorPanels)[] = [];

function PhotoBackground({ src, children, darken = 0.5 }: { src: string; children: React.ReactNode; darken?: number }) {
  return (
    <AbsoluteFill>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${BG}CC, ${BG}${Math.round(darken * 255).toString(16).padStart(2, "0")})`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
}

function RadialScrim() {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, transparent 30%, ${BG}CC 100%)`,
      }}
    />
  );
}

// Scene 1: Pain
function PainScene() {
  return (
    <AbsoluteFill>
      <PhotoBackground src={PHOTOS.labEntrance} darken={0.7}>
        <RadialScrim />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 20 }}>
          <Sequence from={0} durationInFrames={50} layout="none">
            <ScaleDownFade
              text="Engineering in Africa"
              fontSize={80}
              color={FG}
              fontWeight={700}
              speed={1}
            />
          </Sequence>
          <Sequence from={40} durationInFrames={50} layout="none">
            <ScaleDownFade
              text="deserves world-class visibility"
              fontSize={72}
              color={MUTED}
              fontWeight={500}
              speed={1}
            />
          </Sequence>
        </AbsoluteFill>
      </PhotoBackground>
    </AbsoluteFill>
  );
}

// Scene 2: Reveal
function RevealScene() {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 100], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <ShaderSwirl
        speed={0.5}
        colors={["#2E86AB", "#1B3A5C", "#0A1628"]}
        colorBack={BG} bandCount={6} scale={progress}
      />
      <RadialScrim />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <StaggeredFadeUp
          text="Meet LEEC" fontSize={120} color={FG} fontWeight={800} speed={1.2}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

// Scene 3: Tagline
function TaglineScene() {
  return (
    <AbsoluteFill>
      <PhotoBackground src={PHOTOS.labInterior} darken={0.6}>
        <RadialScrim />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 40 }}>
          <ShortSlideRight
            text="Laboratory of Electrical Engineering and Computing"
            fontSize={72} color={FG} fontWeight={700} speed={1} distance={40}
          />
        </AbsoluteFill>
      </PhotoBackground>
    </AbsoluteFill>
  );
}

// Scene 4: Positioning
function PositioningScene() {
  return (
    <AbsoluteFill>
      <PhotoBackground src={PHOTOS.researchCollab} darken={0.6}>
        <RadialScrim />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 40 }}>
          <KineticCenterBuild
            text="African ingenuity meets French engineering excellence"
            fontSize={64} color={ACCENT} fontWeight={600} speed={1}
          />
        </AbsoluteFill>
      </PhotoBackground>
    </AbsoluteFill>
  );
}

// Scene 5: Montage
function MontageScene() {
  return (
    <AbsoluteFill>
      {FEATURES.map((feature, i) => {
        const startFrame = i * 50;
        return (
          <Sequence key={i} from={startFrame} durationInFrames={50} layout="none">
            <AbsoluteFill>
              <PhotoBackground src={feature.img} darken={0.55}>
                <ShaderSimplexNoise
                  speed={0.1} colorBack={BG} colors={["#1B3A5C", "#2E86AB"]} opacity={0.15}
                />
                <RadialScrim />
              </PhotoBackground>
              <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
                <ScaleDownFade
                  text={feature.name} fontSize={72} color={FG} fontWeight={700} speed={1.2}
                />
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}

// Scene 6: Value Claims - with LEEC logo
function ValueScene() {
  const claimsText = [
    "Research Excellence — pushing the boundaries of engineering science",
    "International Collaboration — partnered with INSA Lyon & French Embassy",
    "Student Innovation — training the next generation of African engineers",
  ].join("\n");

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoSpring = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <AbsoluteFill>
      <PhotoBackground src={PHOTOS.teamPhoto} darken={0.6}>
        <RadialScrim />
        <AbsoluteFill style={{ padding: 60, paddingTop: 40 }}>
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 30,
              opacity: logoSpring,
              transform: `scale(${logoSpring})`,
            }}
          >
            <Img
              src={staticFile("/photos/team-photo.jpg")}
              style={{
                width: 80, height: 80, borderRadius: "50%",
                border: `3px solid ${ACCENT}`, objectFit: "cover",
              }}
            />
          </AbsoluteFill>
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 60 }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <LineByLineSlide
                text={claimsText} fontSize={36} color={FG} fontWeight={500} speed={1.2}
              />
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </PhotoBackground>
    </AbsoluteFill>
  );
}

// Scene 7: CTA
function CtaScene() {
  return (
    <AbsoluteFill>
      <PhotoBackground src={PHOTOS.labEntrance} darken={0.7}>
        <ShaderSimplexNoise
          speed={0.15} colorBack={BG} colors={["#1B3A5C", "#2E86AB"]} opacity={0.25}
        />
        <RadialScrim />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 40 }}>
          <Sequence from={0} durationInFrames={40} layout="none">
            <ScaleDownFade text="Visit us today" fontSize={80} color={FG} fontWeight={700} speed={1} />
          </Sequence>
          <Sequence from={25} durationInFrames={55} layout="none">
            <div style={{
              padding: "16px 40px", borderRadius: 12,
              background: `${ACCENT}22`, border: `2px solid ${ACCENT}`,
            }}>
              <StaggeredFadeUp text="leec.ubuea.cm" fontSize={48} color={ACCENT} fontWeight={600} speed={1.2} />
            </div>
          </Sequence>
        </AbsoluteFill>
      </PhotoBackground>
    </AbsoluteFill>
  );
}

// Scene 8: Outro
function OutroScene() {
  return (
    <AbsoluteFill>
      <PhotoBackground src={PHOTOS.microscopeResearch} darken={0.65}>
        <RadialScrim />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 20 }}>
          <Sequence from={10} durationInFrames={70} layout="none">
            <StaggeredFadeUp text="LEEC" fontSize={140} color={FG} fontWeight={800} speed={1} />
          </Sequence>
          <Sequence from={40} durationInFrames={60} layout="none">
            <ShortSlideRight text="Advancing African Engineering" fontSize={36} color={ACCENT} fontWeight={500} speed={1} />
          </Sequence>
        </AbsoluteFill>
      </PhotoBackground>
    </AbsoluteFill>
  );
}

export function LeecHeroVideo() {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Sequence from={0} durationInFrames={90}><PainScene /></Sequence>
      <Sequence from={80} durationInFrames={120}><RevealScene /></Sequence>
      <Sequence from={190} durationInFrames={100}><TaglineScene /></Sequence>
      <Sequence from={280} durationInFrames={100}><PositioningScene /></Sequence>
      <Sequence from={370} durationInFrames={300}><MontageScene /></Sequence>
      <Sequence from={660} durationInFrames={150}><ValueScene /></Sequence>
      <Sequence from={800} durationInFrames={90}><CtaScene /></Sequence>
      <Sequence from={880} durationInFrames={120}><OutroScene /></Sequence>
    </AbsoluteFill>
  );
}