export function mapBaseToImgUrl(base64String: string) {
  const binaryString = atob(base64String)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  const blob = new Blob([bytes], { type: 'image/png' })
  const imageUrl = URL.createObjectURL(blob)
  return imageUrl
}
