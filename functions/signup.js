export async function onRequestPost(context) {
    const { bhdb } = context.env;
    const { username, password, email } = await context.request.json();
  
    console.log('Received data:', { username, password, email });
  
    const hashedPassword = await hashPassword(password);
  
    console.log('Hashed password:', hashedPassword);
  
    const query = `
      INSERT INTO users (username, password, email)
      VALUES (?, ?, ?)
    `;
    const params = [username, hashedPassword, email];
  
    try {
      console.log('Preparing to insert user');
      await bhdb.prepare(query).bind(...params).run();
      console.log('User created successfully');
      return new Response('User created successfully', { status: 201 });
    } catch (err) {
      console.error('Error creating user:', err);
      return new Response('Error creating user: ' + err.message, { status: 500 });
    }
  }
  
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  