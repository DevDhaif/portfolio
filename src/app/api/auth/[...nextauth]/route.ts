



export async function GET(req: Request) {
    return new Response("This route currently does nothing.", { status: 200 });
}

export async function POST(req: Request) {
    return new Response("POST endpoint is currently disabled.", { status: 200 });
}