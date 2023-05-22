export default (raw: string) => {
  raw = raw.replaceAll("\r")  // delete \r
  
  console.log(JSON.stringify(raw.split("\n\n"),null,2))
}