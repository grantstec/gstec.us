export async function onRequestGet(context) {
    const { bhdb } = context.env;
    const username = context.request.url.searchParams.get('username'); // Correctly get the username from query params
  
    const query = `
      SELECT user_deadline_date, user_deadline_info FROM ${username}_user
    `;
  
    try {
      const results = await bhdb.prepare(query).all();
      return new Response(JSON.stringify(results), { status: 200 });
    } catch (err) {
      return new Response('Error fetching deadlines: ' + err.message, { status: 500 });
    }
}