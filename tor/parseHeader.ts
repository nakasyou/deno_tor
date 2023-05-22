export default (raw: string) => {
  raw = raw.replaceAll("\r","")  // delete \r
  
  const datas = raw.split("\n\n")

  const headerData: Array<string> = (datas.at(-1) === "" ? datas.at(-2) : datas.at(-1)).split("\n")

  const statusCode = parseInt(headerData[0].split(" ")[1])

  console.log(statusCode)
  
}