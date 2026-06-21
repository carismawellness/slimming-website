import Link from 'next/link'

export default function NotFound() {
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
          fontSize: 'clamp(64px, 10vw, 120px)',
          color: '#8EB093',
          letterSpacing: '8px',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1,
        }}
      >
        404
      </h1>

      <p
        style={{
          fontFamily: "'Novecento Wide', sans-serif",
          fontSize: '13px',
          letterSpacing: '4px',
          color: '#9B8D83',
          marginTop: '12px',
          marginBottom: 0,
          textAlign: 'center',
        }}
      >
        PAGE NOT FOUND
      </p>

      <p
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: '15px',
          color: '#9B8D83',
          marginTop: '24px',
          marginBottom: 0,
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
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
        <Link
          href="/"
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
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          BACK TO HOME
        </Link>

        <Link
          href="/consultation"
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
          BOOK CONSULTATION
        </Link>
      </div>
    </main>
  )
}
