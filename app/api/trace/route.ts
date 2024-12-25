import { NextResponse } from 'next/server'

async function traceRedirects(initialUrl: string) {
  const maxRedirects = 10;
  let currentUrl = initialUrl;
  const hops = [];

  try {
    for (let i = 0; i < maxRedirects; i++) {
      const response = await fetch(currentUrl, {
        method: 'GET',
        redirect: 'manual',
      });

      const statusCode = response.status;
      hops.push({ url: currentUrl, statusCode });

      if (statusCode >= 300 && statusCode < 400) {
        const redirectUrl = response.headers.get('location');
        if (!redirectUrl) {
          throw new Error("Redirection without a Location header.");
        }

        currentUrl = new URL(redirectUrl, currentUrl).toString();
      } else {
        break;
      }
    }
  } catch (error) {
    console.error(`Error during redirection tracing: ${error}`);
  }

  return {
    hops,
    finalUrl: currentUrl,
  };
}

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const result = await traceRedirects(url);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

