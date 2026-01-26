export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    // Only allow POST requests
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const AIRTABLE_WEBHOOK_URL = process.env.AIRTABLE_WEBHOOK_URL;

    if (!AIRTABLE_WEBHOOK_URL) {
        console.error('AIRTABLE_WEBHOOK_URL is not configured');
        return new Response(JSON.stringify({ error: 'Server configuration error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Forward to Airtable webhook
        const airtableResponse = await fetch(AIRTABLE_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: body.name,
                email: body.email,
                message: body.message,
                submittedAt: body.submittedAt || new Date().toISOString(),
            }),
        });

        if (!airtableResponse.ok) {
            const errorText = await airtableResponse.text();
            console.error('Airtable error:', errorText);
            return new Response(JSON.stringify({ error: 'Failed to submit to Airtable' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, message: 'Form submitted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
