/* index.ts - single-file Cloudflare Worker using Hono + JSX
   Phase 1: minimal, deployable skeleton with routes and placeholder content.
   - Static assets served from /assets/* via ASSETS binding
   - Optional D1 (not bound yet). Schema + Drizzle setup will be added in Phase 2.
   - Unopinionated black/white UI, fluid container, responsive layout.
*/
import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { html } from 'hono/html'

// ---- Types ----
export interface Env {
  ASSETS: Fetcher
  // Optional, add later once D1 is created & bound:
  // DB: D1Database
  SITE_NAME: string
  // Optional future bindings:
  // ANALYTICS: AnalyticsEngineDataset
}

// ---- Helpers ----
const year = () => new Date().getFullYear()

// Try to read design tokens from D1 later; for now emit defaults.
async function designTokensCSS(/* env: Env */): Promise<string> {
  // In Phase 2, read tokens from env.DB and build CSS variables here.
  return `:root{--bg:#fff;--fg:#000;--link:#000;--muted:#444;--maxw:1200px}`
}

// ---- Layout & Shared UI (JSX) ----
function Nav(props: { siteName: string; cartCount?: number }) {
  const { siteName, cartCount = 0 } = props
  return (
    <nav class="nav">
      <a class="brand" href="/">{siteName}</a>
      <div class="spacer" />
      <a href="/team">Team</a>
      <a href="/news">News</a>
      <a href="/games">Games</a>
      <a href="/shop">Shop</a>
      <a class="cart" href="/cart">Cart ({cartCount})</a>
    </nav>
  )
}

function Footer() {
  return (
    <footer class="footer">
      <div class="container">
        <p>&copy; {year()} Cloud City Sluggers</p>
        <ul class="social">
          <li><a href="#" aria-label="Twitter">Twitter</a></li>
          <li><a href="#" aria-label="Instagram">Instagram</a></li>
          <li><a href="#" aria-label="Facebook">Facebook</a></li>
        </ul>
      </div>
    </footer>
  )
}

function Layout(props: { title?: string; siteName: string; tokens: string; children?: any }) {
  const { title, siteName, tokens, children } = props
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title ? title + ' · ' : ''}{siteName}</title>
        <link rel="stylesheet" href="/assets/css/base.css" />
        <style id="design-tokens">{tokens}</style>
      </head>
      <body>
        <div class="page">
          <Nav siteName={siteName} />
          <main class="container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

// ---- Pages (Phase 1 placeholders) ----

// 1) Homepage
function HomePage() {
  return (
    <>
      <section class="hero" style="background-image:url('https://placehold.co/1600x600');">
        <div class="hero-inner">
          <h1>Welcome to the Cloud City Sluggers</h1>
          <p class="muted">Your hometown baseball team.</p>
          <a class="btn" href="/games">See Next Games</a>
        </div>
      </section>

      <section>
        <h2>Next Games</h2>
        <div class="grid">
          {[1,2,3].map(i => (
            <article class="card" key={i}>
              <img alt="" src={`https://placehold.co/600x300?text=Game+${i}`} />
              <h3>Game {i}: vs Rivals</h3>
              <p class="muted">Date: TBD · Venue: Cloud City Park</p>
              <a href="/games/1">View details</a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Recent News</h2>
        <div class="grid">
          {[1,2,3].map(i => (
            <article class="card" key={i}>
              <img alt="" src={`https://placehold.co/600x300?text=News+${i}`} />
              <h3>News Headline {i}</h3>
              <p class="muted">Subtitle · 2025-01-01</p>
              <a href="/news/sample-post">Read more</a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Sign up for our newsletter</h2>
        <form method="post" action="/newsletter">
          <div class="row">
            <input name="email" type="email" placeholder="you@example.com" required />
            <button class="btn" type="submit">Subscribe</button>
          </div>
        </form>
      </section>
    </>
  )
}

// 3) Team
function TeamPage() {
  return (
    <>
      <header class="page-header">
        <h1>Team</h1>
        <p class="muted">Meet the Cloud City Sluggers</p>
      </header>
      <section>
        <p>About the team… (editable in Admin in Phase 2)</p>
      </section>
      <section class="grid">
        {[1,2,3,4,5,6].map(i => (
          <article class="card" key={i}>
            <img alt="" src={`https://placehold.co/600x600?text=Player+${i}`} />
            <h3>Player {i}</h3>
            <p class="muted">Position · Short bio goes here.</p>
          </article>
        ))}
      </section>
    </>
  )
}

// 4) News listing
function NewsPage() {
  return (
    <>
      <header class="page-header">
        <h1>News</h1>
      </header>
      <section class="grid">
        {[1,2,3,4,5,6].map(i => (
          <article class="card" key={i}>
            <img alt="" src={`https://placehold.co/600x300?text=Post+${i}`} />
            <h3>Post Title {i}</h3>
            <a href="/news/sample-post">Open</a>
          </article>
        ))}
      </section>
    </>
  )
}

// 5) Individual News Post
function NewsPostPage() {
  return (
    <>
      <article>
        <img class="banner" alt="" src="https://placehold.co/1600x600?text=Featured+Image" />
        <h1>Big Win Last Night</h1>
        <p class="muted">Subtitle · 2025-01-01</p>
        <p>Body content… (managed in Admin in Phase 2)</p>
      </article>
    </>
  )
}

// 6) Games & Schedule
function GamesPage() {
  return (
    <>
      <header class="page-header">
        <h1>Games & Schedule</h1>
      </header>
      <section class="grid">
        {[1,2,3,4,5].map(i => (
          <article class="card" key={i}>
            <img alt="" src={`https://placehold.co/600x300?text=Game+${i}`} />
            <h3>Game {i} vs Rivals</h3>
            <p class="muted">Date: TBD</p>
            <a href={`/games/${i}`}>Open</a>
          </article>
        ))}
      </section>
    </>
  )
}

// 7) Individual Game Page (tickets table placeholder)
function GamePage(props: { id: string }) {
  const { id } = props
  return (
    <>
      <header class="page-header">
        <h1>Game {id}</h1>
        <p class="muted">Opponent: Rivals · Date: TBD · Venue: Cloud City Park</p>
      </header>

      <section>
        <h2>Tickets</h2>
        <form method="post" action={`/games/${id}/cart`}>
          <div class="row">
            <label for="section">Section</label>
            <select id="section" name="section">
              <option>101</option>
              <option>102</option>
              <option>201</option>
            </select>
            <label for="row">Row</label>
            <select id="row" name="row">
              <option>A</option><option>B</option><option>C</option>
            </select>
            <label for="seat">Seat</label>
            <select id="seat" name="seat">
              <option>1</option><option>2</option><option>3</option>
            </select>
            <button class="btn" type="submit">Add to cart</button>
          </div>
        </form>

        <table class="table">
          <thead>
            <tr><th>Section</th><th>Row</th><th>Seat</th><th>Price</th><th></th></tr>
          </thead>
          <tbody>
            {[
              {section:'101',row:'A',seat:1,price:25},
              {section:'101',row:'A',seat:2,price:25},
              {section:'102',row:'B',seat:4,price:30},
            ].map((t,i)=>(
              <tr key={i}>
                <td>{t.section}</td><td>{t.row}</td><td>{t.seat}</td><td>${t.price}</td>
                <td><a href="#" class="btn sm">Add</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

// 8) Shop
function ShopPage() {
  return (
    <>
      <header class="page-header"><h1>Shop</h1></header>
      <section class="grid">
        {[1,2,3,4,5,6].map(i => (
          <article class="card" key={i}>
            <img alt="" src={`https://placehold.co/600x600?text=Product+${i}`} />
            <h3>Product {i}</h3>
            <a href={`/shop/${i}`}>Open</a>
          </article>
        ))}
      </section>
    </>
  )
}

// 9) Product page
function ProductPage(props: { id: string }) {
  const { id } = props
  return (
    <article>
      <img class="banner" alt="" src={`https://placehold.co/1600x600?text=Product+${id}`} />
      <h1>Product {id}</h1>
      <p class="muted">$49.00</p>
      <p>Product description…</p>
      <form method="post" action={`/shop/${id}/cart`}>
        <div class="row">
          <input type="number" name="qty" min="1" value="1" />
          <button class="btn" type="submit">Add to cart</button>
        </div>
      </form>
    </article>
  )
}

// ---- App ----
const app = new Hono<{ Bindings: Env }>()

// Global renderer (wrap every route with Layout)
app.use('*', async (c, next) => {
  const tokens = await designTokensCSS()
  c.setRenderer((content) =>
    html(
      <Layout title={c.get('title')} siteName={c.env.SITE_NAME} tokens={tokens}>
        {content}
      </Layout>
    )
  )
  await next()
})

// Static assets
app.get('/assets/*', (c) => c.env.ASSETS.fetch(c.req.raw))

// Routes
app.get('/', (c) => {
  c.set('title', 'Home')
  return c.render(<HomePage />)
})

app.get('/team', (c) => {
  c.set('title', 'Team')
  return c.render(<TeamPage />)
})

app.get('/news', (c) => {
  c.set('title', 'News')
  return c.render(<NewsPage />)
})

app.get('/news/:slug', (c) => {
  c.set('title', 'News Post')
  return c.render(<NewsPostPage />)
})

app.get('/games', (c) => {
  c.set('title', 'Games & Schedule')
  return c.render(<GamesPage />)
})

app.get('/games/:id', (c) => {
  const id = c.req.param('id')
  c.set('title', `Game ${id}`)
  return c.render(<GamePage id={id} />)
})

app.get('/shop', (c) => {
  c.set('title', 'Shop')
  return c.render(<ShopPage />)
})

app.get('/shop/:id', (c) => {
  const id = c.req.param('id')
  c.set('title', `Product ${id}`)
  return c.render(<ProductPage id={id} />)
})

// Newsletter placeholder
app.post('/newsletter', async (c) => {
  // Phase 2: store in CRM (D1) + send to Queue
  return c.redirect('/', 303)
})

// 404
app.notFound((c) => {
  c.set('title', 'Not Found')
  return c.render(<section><h1>404</h1><p class="muted">Page not found.</p></section>)
})

export default app
