const URL = "https://api-game-gold.vercel.app/players/";

async function Get() {
  const req = await fetch(URL, { method: "GET" });
  const data = await req.json();

  return data;
}

async function Post(body) {
  const req = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await req.json();

  return data;
}

async function Put(id, body) {
  const req = await fetch(URL + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await req.json();

  return data;
}

async function Delete(id) {
  const req = await fetch(URL + id, {
    method: "DELETE",
  });
  const data = await req.json();

  return data;
}

export { Get, Post, Put, Delete };

