
const hostGet = "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";

export async function getAllTracks() {
  const res = await fetch(hostGet,{
    method: "GET"})
  const data = await res.json()

  if(!res.ok) {
    throw new Error("Словил ошибку на сервере");
  }

  return data.data;
}
