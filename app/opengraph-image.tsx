import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#041632",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "white",
              marginBottom: 30,
              letterSpacing: "-0.02em",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            ARCHITEXTRUE
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#FFD700",
              marginBottom: 40,
              fontWeight: 600,
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            Jasa Bangun Rumah Mewah di Yogyakarta
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#E2E2E2",
              maxWidth: "800px",
              lineHeight: 1.4,
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik
            dan transparan
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            fontSize: 20,
            color: "#8393B5",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          architextrue.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}