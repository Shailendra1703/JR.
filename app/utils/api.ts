export async function trackUrl(url: string) {
  // This is a mock function. Replace with actual API call later.
  return {
    hops: [
      { url: 'https://bit.ly/nc_twitch', statusCode: 301 },
      { url: 'https://www.twitch.tv/networkchuck', statusCode: 200 }
    ],
    finalUrl: 'https://www.twitch.tv/networkchuck'
  }
}

