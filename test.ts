import { Tor } from "./mod.ts"

const tor = new Tor()

const res = await tor.fetch("http://google.com", {
  method: "post",
  body: "Hello!"
})
console.log(res)
//console.log(await res.text())