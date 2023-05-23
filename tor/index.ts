import { path } from "../deps.ts"
import parseHeader from "./parseHeader.ts"
import request2curl from "./request2curl.ts"

export interface TorOptions {
  hostname?: string
  torCommand?: string
  tmpDir? :string
}
function sleep(ms: number): Promise<void>{
  return new Promise((resolve) => {
    setTimeout(resolve,ms)
  })
}
export class Tor{
  hostname: string
  torCommand: string
  tmpDir: string
  constructor(options?: TorOptions){
    options = options ? options :  {}
    this.hostname = options.hostname ? options.hostname : "127.0.0.1:9050"
    this.tmpDir = options.tmpDir ? options.tmpDir : "./.tmp"
    if(options.torCommand){
      this.torCommand = options.torCommand
    }else{
      if(Deno.build.os === "windows"){
        // OS: windows
        this.torCommand = "tor.exe"
      }else{
        this.torCommand = "tor"
      }
    }

  }
  /**
   * Start tor proxy
   * @remarks
   * Start tor proxy. It function return promise.
   * @returns Return is void.
   */
  async start(){
    const torProcess = new Deno.Command(this.torCommand, {
      
    })
    torProcess.spawn()
    await sleep(10)
  }
  /**
   * Fetch from tor network(get method)
   * @param url Fetch url.
   * @returns 
   */
  async get(url: string): Promise<Response>{
    await Deno.mkdir(this.tmpDir, { recursive: true }) // Create tmp dir
    const tmpPath = path.join(this.tmpDir,"./"+crypto.randomUUID())
    const curl = new Deno.Command("curl", {
      args: [
        "-x",
        `socks5h://${this.hostname}`,
        "-sS",
        "-L",
        "-D",
        "-",
        "-o",
        tmpPath,
        url,
      ]
    })
    const output = await curl.output()
    const { code, stdout, stderr } = output
    if(code!==0){
      throw new Error(new TextDecoder().decode(stderr))
    }
    const data = await Deno.readFile(tmpPath)

    const headers = parseHeader(new TextDecoder().decode(stdout))

    const res = new Response(data.buffer, {
      headers: headers.headers,
      status: headers.statusCode,
    })

    return res
  }
  /**
   * fetch from tor network.
   * @param input - This defines the resource that you wish to fetch.
   * @param init - An object containing any custom settings that you want to apply to the request.
   */
  async fetch(input: URL | string | Request, init: RequestInit): Promise<Response>{
    // create request object
    let request: Request
    if(input instanceof Request){
      request = input
    }else{
      let url: URL
      if(input instanceof URL){
        url = input
      }else{
        url = new URL(input)
      }
      request = new Request(url.toString(),init)
    }

    await Deno.mkdir(this.tmpDir, { recursive: true }) // Create tmp dir
    const tmpPath = path.join(this.tmpDir,"./"+crypto.randomUUID())

    const cmd = await request2curl({
      request: request,
      proxy: `socks5h://${this.hostname}`,
      path: tmpPath,
      tmpDir: this.tmpDir,
    })
    
    const curl = new Deno.Command("curl",{
      args: cmd
    })
    const { code, stdout, stderr } = await curl.output()
    if(code!==0){
      throw new Error(new TextDecoder().decode(stderr))
    }
    const data = await Deno.readFile(tmpPath)
    // Parse header
    const headers = parseHeader(new TextDecoder().decode(stdout))
    
    return new Response(data.buffer, {
      headers: headers.headers,
      status: headers.statusCode,
    })
  }
}
