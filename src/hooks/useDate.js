export default function useDate() {
  function convertTimestampToDate(timestampAsNumber = new Date().getTime()) {
    const timestamp = new Date(timestampAsNumber)
    const weekday = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(timestamp)
    const day = timestamp.getUTCDate()
    const month = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(timestamp)
    const year = timestamp.getFullYear()
    const date = `${weekday}, ${day} ${month} ${year}`
    return date
  }
  return {
    convertTimestampToDate,
  }
}
