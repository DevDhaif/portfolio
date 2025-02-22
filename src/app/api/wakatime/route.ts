import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

interface WakatimeResponse {
    data: {
        text: string;
        total_seconds: number;
        daily_average: number;
        range: {
            start: string;
            end: string;
        };
    };
}

export async function GET() {
    try {
        const response = await fetch(
            'https://wakatime.com/api/v1/users/@DevDhaif/all_time_since_today',
            {
                headers: {
                    'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_WAKATIME_API_KEY || '').toString('base64')}`,
                },
                next: {
                    revalidate: 3600
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Wakatime API responded with status: ${response.status}`);
        }

        const data: WakatimeResponse = await response.json();

        return NextResponse.json({
            data: {
                total_seconds: data.data.total_seconds,
                formatted_time: data.data.text,
                daily_average: data.data.daily_average,
                range: data.data.range
            }
        });

    } catch (error) {
        console.error('Error fetching Wakatime data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Wakatime data' },
            { status: 500 }
        );
    }
}

export async function HEAD() {
    return new Response(null, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}