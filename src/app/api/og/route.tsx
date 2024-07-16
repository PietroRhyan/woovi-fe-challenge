import { ImageResponse } from 'next/og'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#F5F5F5',
          fontSize: 60,
          letterSpacing: -2,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#03D69D',
            fontWeight: 700,
          }}
        >
          Woovi
        </div>
        <div
          style={{
            color: '#131313',
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: -1,
          }}
        >
          Venda ao infinito
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
