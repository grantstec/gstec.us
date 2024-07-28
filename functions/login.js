export async function onRequestPost(context) {
  const { bhdb } = context.env;
  const { username, password } = await context.request.json();

  const query = `
    SELECT * FROM users WHERE username = ?
  `;
  const params = [username];

  try {
    const result = await bhdb.prepare(query).bind(...params).first();
    if (result && await checkPassword(password, result.password)) {
      // Save the username to local storage
      localStorage.setItem('username', username);
    } else {
      return new Response('Invalid credentials', { status: 401 });
    }
  } catch (err) {
    return new Response('Error logging in: ' + err.message, { status: 500 });
  }
}

async function checkPassword(password, hashedPassword) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === hashedPassword;
}
