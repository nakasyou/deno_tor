import { path } from "../deps.ts"

export interface Request2curlOptions {
  proxy: string
  path: string
  request: Request
  tmpDir: string
}
export default async function request2curl(data: Request2curlOptions){
  const result = [
    "-x", data.proxy,
    "-sS",
    "-L",
    "-D",
    "-",
    "-o", data.path, // Save file path
    "-X", data.request.method // Request method
  ]
  for(const [key,value] of data.request.headers.entries()){
    result.push("-H")
    result.push(`${key}:${value}`)
  }
  if(data.request.body){
    const bodyTmpPath = path.join(data.tmpDir,"./"+crypto.randomUUID())
    const bodyUint8Array = new Uint8Array(await new Response(data.request.body).arrayBuffer())
    await Deno.writeFile(bodyTmpPath,bodyUint8Array)
    result.push("--data-binary")
    result.push("@"+bodyTmpPath)
  }
  result.push(data.request.url)
  return result
}
