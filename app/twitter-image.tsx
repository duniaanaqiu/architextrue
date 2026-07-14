import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #041632 0%, #1b2b48 100%)",
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
              fontSize: 72,
              fontWeight: 700,
              color: "white",
              marginBottom: 24,
              letterSpacing: "-0.02em",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            ARCHITEXTRUE
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#CCA730",
              marginBottom: 32,
              fontWeight: 600,
              letterSpacing: "0.05em",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            Bangun Hunian Impian Anda
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#E2E2E2",
              maxWidth: "800px",
              lineHeight: 1.4,
              marginBottom: 40,
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik
            dan transparan di Yogyakarta
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 20,
            }}
          >
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "#CCA730",
                color: "#4F3D00",
                fontSize: 20,
                fontWeight: 600,
                borderRadius: "8px",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
              }}
            >
              Konsultasi Gratis
            </div>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "transparent",
                color: "white",
                fontSize: 20,
                fontWeight: 600,
                borderRadius: "8px",
                border: "2px solid white",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
              }}
            >
              Lihat Portfolio
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            fontSize: 18,
            color: "#8393B5",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          @architextrue • architextrue.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}