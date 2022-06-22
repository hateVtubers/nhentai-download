export const getBase64 = async (url: string) => {
  const buffers = await fetch(url).then((res) => res.arrayBuffer())

  const buffer = Buffer.from(buffers)
  const base64 = buffer.toString('base64')

  return {
    base64,
  }
}
