import { Tor } from "./mod.ts"

const tor = new Tor()

const res = tor.get("")
console.log(res)