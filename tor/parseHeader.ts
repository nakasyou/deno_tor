export default (raw: string) => {
  raw = raw.replaceAll("\r","")  // delete \r
  
  const datas = raw.split("\n\n")

  const headerData = datas.at(-1) === "" ? datas.at(-2) : datas.at(-1)
  console.log(headerData)
}