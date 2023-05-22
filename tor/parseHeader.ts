export default (raw: string) => {
  raw = raw.replaceAll("\r","")  // delete \r
  
  const datas = raw.split("\n\n")

  const headerAData = (datas.at(-1) === "" ? datas.at(-2) : datas.at(-1))
  const headerData = (headerAData? headerAData : "").split("\n")
  const statusCode = parseInt(headerData[0].split(" ")[1])  // Get status code
  
  const headers = Object.fromEntries(headerData.slice(1).map(header=>{
    const headerSplit = header.split(":")
    return [headerSplit[0],headerSplit.slice(1).join(":")]
  }))

  return {
    headers: new Headers(headers),
    statusCode,
  }
}
