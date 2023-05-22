import { Tor } from "./mod.ts"

const tor = new Tor()

const res = await tor.fetch("https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion", {
  method: "post",
  body: "Hello!"
})
console.log(res)
console.log(res.text())
//console.log(await res.text())