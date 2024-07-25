export async function onRequestPost(context) {
    const { D1 } = context.env;
    const { username, password, email } = await context.request.json();
  
    // Hash the password (use a library in production)
    const hashedPassword = await hashPassword(password);
  
    const query = `
      INSERT INTO users (username, password, email)
      VALUES (?, ?, ?)
    `;
    const params = [username, hashedPassword, email];
  
    try {
      await D1.prepare(query).bind(...params).run();
      return new Response('User created successfully', { status: 201 });
    } catch (err) {
      return new Response('Error creating user: ' + err.message, { status: 500 });
    }
  }
  
  async function hashPassword(password) {
    // Simple hashing for demonstration, use a secure method in production
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  