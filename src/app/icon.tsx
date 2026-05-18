import { ImageResponse } from 'next/og';

// Image generation metadata parameters
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // Replicating the black square, rounded corners, slate border, and white "PP" text
      <div
        style={{
          fontSize: 14,
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 900,
          borderRadius: '6px',
          border: '2px solid #1e293b', // Matches border-slate-800
          fontFamily: 'sans-serif',
          letterSpacing: '-0.05em',
        }}
      >
        PP
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}