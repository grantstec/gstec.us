export async function onRequestGet(context) {
    const { bhdb } = context.env;
    const { searchParams } = new URL(context.request.url);
    const username = searchParams.get('username');

    if (!username) {
        return new Response('Username is required', { status: 400 });
    }

    const query = `
      SELECT user_deadline_date, user_deadline_info FROM deadline_data WHERE username = ?
    `;
    const params = [username];

    try {
      const results = await bhdb.prepare(query).bind(...params).all();
      return new Response(JSON.stringify(results), { status: 200 });
    } catch (err) {
      return new Response('Error fetching deadlines: ' + err.message, { status: 500 });
    }
}