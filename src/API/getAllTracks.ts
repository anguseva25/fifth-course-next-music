const hostGet = "https://skypro-music-api.skyeng.tech/catalog/track/all";

export async function getAllTracks() {
  const res = await fetch(hostGet,{
    method: "GET"})

if(!res.ok) {
  throw new Error("Словил ошибку на сервере");
}

const data = await res.json();
return data;
}
