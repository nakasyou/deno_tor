import { path } from "../deps.ts"

export interface TorOptions {
  hostname?: string
  torCommand?: string
  tmpDir? :string
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
  async start(){
    const torProcess = new Deno.Command(this.torCommand, {
      
    })
    torProcess.spawn()
  }
  async get(url: string): Response{
    await Deno.mkdir(this.tmpDir, { recursive: true }) // Create tmp dir
    const tmpPath = path.join(this.tmpDir,"./"+crypto.randomUUID())
    const curl = new Deno.Command("curl", {
      args: [
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
    const stdout = output.stderr
    console.log(output.code)
    //const data = await Deno.readFile(tmpPath)

    
    const res = new Response(stdout.buffer)
    return res
  }
}