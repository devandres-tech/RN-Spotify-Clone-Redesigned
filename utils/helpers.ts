export const setHeaders = (accessToken: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${accessToken}`,
})

export const trimText = (text: string, maxLength: number) => {
  return text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text.trim()
}

export const secondsToHHMMSS = (seconds: number) => {
  seconds = Number(seconds)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor((seconds % 3600) % 60)
  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : ''
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:'
  const secs = s > 0 ? (s < 10 ? `0${s}` : s) : '00'
  return `${hrs}${mins}${secs}`
}

// fisher yates algorithm
export const shuffle = (arrayItems: {}[]) => {
  let i = arrayItems.length,
    randIndex,
    temp
  while (--i > 0) {
    randIndex = Math.floor(Math.random() * (i + 1))
    temp = arrayItems[randIndex]
    arrayItems[randIndex] = arrayItems[i]
    arrayItems[i] = temp
  }
  return [...arrayItems]
}
