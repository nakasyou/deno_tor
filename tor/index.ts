export interface TorOptions {
  hostname?: string
  torCommand?: string
}
export class Tor{
  hostname: string
  torCommand: string
  constructor(options?: TorOptions){
    options = options ? options :  {}
    this.hostname = options.hostname ? options.hostname : "127.0.0.1:9050"
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
    const curl = new Deno.Command("curl", {
      args: [
        "https://google.com"
      ]
    })
    const res = new Response(curl)
    return res
  }
}