export async function onRequestPost(context) {
    const { bhdb } = context.env;
    const { username, deadlines } = await context.request.json();

    if (!username || !deadlines || !Array.isArray(deadlines)) {
        return new Response('Invalid data', { status: 400 });
    }

    const query = `
      INSERT INTO deadline_data (username, user_deadline_date, user_deadline_info)
      VALUES (?, ?, ?)
    `;

    try {
        for (const deadline of deadlines) {
            const { date, info } = deadline;
            const params = [username, date, info];
            await bhdb.prepare(query).bind(...params).run();
        }
        return new Response('Deadlines saved successfully', { status: 201 });
    } catch (err) {
        console.error('Error saving deadlines:', err);
        return new Response('Error saving deadlines: ' + err.message, { status: 500 });
    }
}