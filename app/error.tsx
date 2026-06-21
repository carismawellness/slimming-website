'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '60px 24px',
        background: '#FCFCFA',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '2px',
          background: '#8EB093',
          marginBottom: '32px',
        }}
      />

      <h1
        style={{
          fontFamily: "'Trajan Pro', serif",
          fontSize: 'clamp(24px, 4vw, 40px)',
          color: '#1a1a1a',
          letterSpacing: '4px',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        SOMETHING WENT WRONG
      </h1>

      <p
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: '15px',
          color: '#9B8D83',
          marginTop: '24px',
          marginBottom: 0,
          maxWidth: '480px',
          textAlign: 'center',
        }}
      >
        An unexpected error occurred. Please try again or contact us if the problem persists.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '40px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          onClick={reset}
          className="cta-glow"
          style={{
            display: 'inline-block',
            color: '#FFFFFF',
            border: 'none',
            padding: '14px 32px',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          TRY AGAIN
        </button>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            backgroundColor: 'transparent',
            color: '#8EB093',
            border: '1px solid #8EB093',
            padding: '14px 32px',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          GO HOME
        </Link>
      </div>
    </main>
  )
}
