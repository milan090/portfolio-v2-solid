// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          
          {/* Basic Meta Tags */}
          <title>Milan's Portfolio</title>
          <meta name="description" content="Milan's portfolio showcasing innovative web development projects, full-stack applications, and robust software solutions. Experienced in React, TypeScript, Rust, and modern web technologies." />
          <meta name="keywords" content="Milan, portfolio, full stack developer, web developer, React, TypeScript, JavaScript, Rust, frontend, backend, software engineer" />
          <meta name="author" content="Milan" />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="en" />
          
          {/* Open Graph Meta Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Milan's Portfolio - Full Stack Developer" />
          <meta property="og:description" content="I am Milan, Senior Software Engineer from Kerala. I build things I find interesting." />
          <meta property="og:url" content="https://milan-portfolio.com" />
          <meta property="og:site_name" content="Milan's Portfolio" />
          <meta property="og:locale" content="en_US" />
          {/* TODO: add og image */}
          {/* <meta property="og:image" content="/og-image.jpg" /> */}
          <meta property="og:image:alt" content="Milan's Portfolio - Full Stack Developer" />
          {/* <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" /> */}
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Milan's Portfolio - Full Stack Developer" />
          <meta name="twitter:description" content="Explore Milan's portfolio featuring innovative web development projects, full-stack applications, and robust software solutions." />
          <meta name="twitter:image" content="/og-image.jpg" />
          <meta name="twitter:image:alt" content="Milan's Portfolio - Full Stack Developer" />
          <meta name="twitter:creator" content="@itsmilan090" />
          <meta name="twitter:site" content="@itsmilan090" />
          
          {/* Additional Meta Tags */}
          <meta name="theme-color" content="#000000" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Milan's Portfolio" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://milan-portfolio.com" />
          
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Structured Data (JSON-LD) */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Milan",
              "jobTitle": "Software Developer",
              "description": "Full Stack Developer specializing in modern web technologies, React, TypeScript, Rust, and robust software solutions.",
              "url": "https://milan-portfolio.com",
              "sameAs": [
                "https://github.com/milan090",
                "https://linkedin.com/in/milan090",
                "https://twitter.com/itsmilan090"
              ],
              "knowsAbout": [
                "Rust",
                "React",
                "Vue",
                "TypeScript",
                "JavaScript",
                "Frontend Development",
                "Backend Development"
              ],
              "workLocation": {
                "@type": "Place",
                "name": "Kerala, India"
              }
            })}
          </script>
          
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
