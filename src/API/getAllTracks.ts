import {fetchWithAuth} from "@/utilities/fetchWithAuth";
import {CatalogueDataType, TrackType} from "@/types/track";

const hostGet = "https://webdev-music-003b5b991590.herokuapp.com/catalog";

export async function getAllTracks(): Promise<TrackType[]> {
  const res = await fetch(`${hostGet}/track/all/`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error("Словил ошибку на сервере");
  }

  return data.data;
}

export async function likeTrack({
                                  trackId,
                                  access,
                                  refresh,
                                }: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    `${hostGet}/track/${trackId}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );

  return res.json();
}

export async function dislikeTrack({
                                     trackId,
                                     access,
                                     refresh,
                                   }: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    `${hostGet}/track/${trackId}/favorite/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );

  return res.json();
}

export const fetchFavoriteTracks = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${hostGet}/track/favorite/all/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch favorite tracks");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching favorite tracks:", error);
    throw error;
  }
};


export async function fetchCatalogue(id: string): Promise<CatalogueDataType> {
  const res = await fetch(`${hostGet}/selection/${id}`);
  const data = await res.json()

  if (!res.ok) {
    throw new Error("Словил ошибку на сервере");
  }

  return data.data;
}

