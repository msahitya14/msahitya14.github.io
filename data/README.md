# Editing site content (no rebuild needed)

The site reads everything in this `data/` folder at runtime in the browser, so
changing content here = **edit + commit + push this repo**. No `npm run build`,
no touching the `portfolio` source repo.

## Add a photo
1. Drop the image file into `../photos/` (e.g. `photos/sunset.jpeg`).
2. Add an object to `photos.json`:
   ```json
   {
     "id": 2,
     "url": "/photos/sunset.jpeg",
     "thumb": "/photos/sunset.jpeg",
     "category": "Nature",
     "caption": "Sunset over the bay.",
     "camera": "Canon EOS 760D",
     "lens": "18-135mm f/5.6",
     "settings": "1/500s · f/8 · ISO 100",
     "span": 1
   }
   ```
   - `category` drives the filter buttons (a new one appears automatically).
   - `span`: `2` = tall tile, `1` = normal.
3. Commit & push. Done.

## Add a blog post
Two flavors, both via `posts.json`:

**A Medium / external link** — just one entry, no body file:
```json
{
  "type": "medium",
  "date": "Jul 2026",
  "url": "https://medium.com/@you/your-post",
  "title": "Your Title",
  "excerpt": "One-line summary.",
  "tags": ["Tag1", "Tag2"],
  "readTime": "6 min"
}
```

**A post hosted here** — entry + a matching HTML body file:
1. Add to `posts.json`:
   ```json
   {
     "type": "native",
     "date": "Jul 2026",
     "fullDate": "July 4, 2026",
     "slug": "my-new-post",
     "title": "My New Post",
     "excerpt": "One-line summary shown in the list.",
     "tags": ["Tag1", "Tag2"],
     "readTime": "5 min"
   }
   ```
   - `date` shows in the blog list, `fullDate` on the article page.
   - `slug` is the URL: `/blog/my-new-post`.
2. Create `posts/my-new-post.html` with the article body — plain HTML using
   `<p>`, `<h2>`, `<pre><code>`, `<blockquote>`, `<strong>`, etc. (see the
   existing files for the exact tags that are styled).
3. Commit & push. The post is live and its URL works directly thanks to the
   SPA fallback (`404.html`) — no rebuild.

## When DO you need to rebuild?
Only when you change the site's *design or code* in the `portfolio` repo. Then
run `./build.sh` there — it rebuilds the app shell and copies it here while
leaving this `data/` folder and `photos/` untouched.
