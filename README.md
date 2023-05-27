# deno_tor
Tor🧅 request for Deno🦕
## How to use it
### Start
```ts
import { Tor } from "https://deno.land/x/onion/mod.ts" // Import

const tor: Tor = new Tor()

await tor.start() // Start tor
```
### Fetch api
```ts
const res: Response = await tor.fetch("https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion", {
  method: "GET",
  // and other fetch options..
}) // BBC Website on darkweb
```
> **Warning**
> The `tor.fetch` API is not parfect as [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/fetch).
### GET API (Deprecated)
```ts
const res: Response = await tor.get("https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion") // BBC Website on darkweb
```
### Use ky
```ts
import ky from "https://esm.sh/ky"

const text = await ky('https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion', {
  fetch: tor.fetch,
}).text();
```

