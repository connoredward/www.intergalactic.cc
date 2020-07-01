// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"></meta>
          <link rel="apple-touch-icon" sizes="180x180" href="../static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="../static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="../static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="../static/favicon/site.webmanifest"></link>


          <meta name="title" content="INTERGALACTIC STUDIOS" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.intergalacticstudios.com/" />
          <meta property="og:title" content="INTERGALACTIC STUDIOS" />
          {/* <meta property="og:description" content="" /> */}
          <meta property="og:image" content="https://www.intergalacticstudios.com/static/social_preview.jpeg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.intergalacticstudios.com/" />
          <meta property="twitter:title" content="INTERGALACTIC STUDIOS" />
          {/* <meta property="twitter:description" content="" /> */}
          <meta property="twitter:image" content="https://www.intergalacticstudios.com/static/social_preview.jpeg"></meta>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}