# deno_tor
Tor🧅 request for Deno🦕
## How to use it
```ts
import { Tor } from "https://deno.land/x/onion/mod.ts" // Import

const tor: Tor = new Tor()

await tor.start() // Start tor

const res: Response = await tor.get("https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion") // BBC Website on darkweb
```
