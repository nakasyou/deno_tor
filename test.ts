import { Tor } from "./mod.ts"

const tor = new Tor()

const res = await tor.get("http://google.com")
console.log(res)
//console.log(await res.text())