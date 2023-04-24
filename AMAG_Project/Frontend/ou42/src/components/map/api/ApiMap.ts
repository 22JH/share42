export const GetMarkers = async () => {
  const response = await fetch('http://localhost:3001/markers')
  const data = await response.json()
  return data
}

export const GetMarkerInfo = async () => {
  const response = await fetch('http://localhost:3001/items')
  const data = await response.json()
  return data
}