# Embedding the Range Challenge on a CMS page (no double scroll)

The app auto-detects when it's inside an iframe and:

1. Sets `<html data-embedded>` and flattens its internal scroll regions, so the
   whole app renders as **one flowing column** (no inner scrollbar).
2. Posts its full height to the parent page on load, on resize, and on any DOM
   change (`{ type: "resize", height: <px> }`).

You just need the parent CMS page to (a) give the iframe `scrolling="no"` and
100% width, and (b) listen for that message and set the iframe height. That makes
the iframe exactly as tall as its content, so only the CMS page scrolls — never a
nested scrollbar.

## Paste into the CMS page (plain HTML — works in any CMS custom-HTML block)

```html
<iframe id="gag-range"
        src="https://YOUR-DEPLOYMENT-URL/index.html"
        title="GrabAGun Range Challenge"
        scrolling="no"
        style="width:100%;border:0;display:block;overflow:hidden"
        allow="clipboard-write"></iframe>

<script>
  (function () {
    var f = document.getElementById('gag-range');
    window.addEventListener('message', function (e) {
      var d = e.data;
      if (d && d.type === 'resize' && typeof d.height === 'number') {
        f.style.height = d.height + 'px';
      }
    });
    // Ask the app for its height once it's listening (covers late loads).
    f.addEventListener('load', function () {
      try { f.contentWindow.postMessage({ type: 'requestHeight' }, '*'); } catch (e) {}
    });
  })();
</script>
```

## React / Next.js host (Vercel)

If the parent IS a React/Next app, drop the listener in a component instead of
the inline script above — the iframe itself still needs `scrolling="no"`:

```jsx
import { useEffect, useRef } from 'react';

export default function RangeChallenge() {
  const ref = useRef(null);
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (d && d.type === 'resize' && typeof d.height === 'number' && ref.current) {
        ref.current.style.height = d.height + 'px';
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  return (
    <iframe
      ref={ref}
      src="https://YOUR-DEPLOYMENT-URL/index.html"
      title="GrabAGun Range Challenge"
      scrolling="no"
      style={{ width: '100%', border: 0, display: 'block', overflow: 'hidden' }}
      allow="clipboard-write"
    />
  );
}
```

> The `useEffect` height-poster from your note lives **inside** the embedded app
> (already added to `index.html`), not in the host. The host only needs the
> **listener** above. Don't put both halves on the same side.

## Notes
- Replace `https://YOUR-DEPLOYMENT-URL/` with your deployed origin (the host that
  serves `index.html`).
- Keep `scrolling="no"` — it's what removes the iframe's own scrollbar.
- The app re-posts height on any layout change (cartridge swap, accordion, the
  game starting, results modal), so the iframe always tracks content.
