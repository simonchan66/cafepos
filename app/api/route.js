export async function GET(request) {
  const data = {
    message: 'Hello from the API!, this is 1st API route by Simon Chan',
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}