export default (raw: string) => {
  raw = raw.replaceAll("\r")  // delete \r
  
  console.log(raw.split("\n\n"))
}