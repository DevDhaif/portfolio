export async function GET() {
    return new Response("This route currently does nothing.", { status: 200 });
}

export async function POST() {
    return new Response("POST endpoint is currently disabled.", { status: 200 });
}