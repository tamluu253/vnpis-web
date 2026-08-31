export function GET() {
  return new Response('google-site-verification: googlefd3afa8a73f86c45.html', {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
