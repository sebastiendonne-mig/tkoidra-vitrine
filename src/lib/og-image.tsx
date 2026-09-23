import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

// Police statique embarquée (aucune police n'existait dans le dépôt avant ce lot) :
// Satori (moteur de rendu d'ImageResponse) n'a pas accès aux polices système et ne
// supporte pas le format woff2, d'où un .woff classique. Source : @fontsource/inter,
// repackaging du fichier statique Inter SemiBold, licence OFL — même famille que
// le poids "600" documenté par Next.js pour ImageResponse. Sous-ensemble "all"
// (unicode complet) pour couvrir les caractères accentués français (é, à…).
let interSemiBold: Buffer | null = null;

async function loadFont() {
  if (!interSemiBold) {
    interSemiBold = await readFile(
      join(process.cwd(), "assets/fonts/Inter-SemiBold.woff")
    );
  }
  return interSemiBold;
}

export async function renderOgImage(jobTitle: string) {
  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#020617",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#2dd4bf",
            marginBottom: 40,
          }}
        >
          TKoidra
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            color: "#f1f5f9",
            marginBottom: 24,
          }}
        >
          Sébastien Donné
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 600,
            color: "#94a3b8",
          }}
        >
          {jobTitle}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
