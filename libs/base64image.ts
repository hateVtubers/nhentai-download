export const getBase64 = async (url: string) => {
  const buffers = await fetch(url).then((res) =>
    res.arrayBuffer()
  )
  /* const buffers = await arrayBuffer() */ // ilegal operation why? I like destructuring :(
  const base64 = Buffer.from(buffers).toString('base64')

  return {
    base64,
  }
}
