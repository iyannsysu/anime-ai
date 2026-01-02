const apiURL = "https://api.sansekai.my.id/api/anime/latest";
const animeList = document.getElementById("anime-list");

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const animeData = data.data; // biasanya API pakai data.data

    animeData.forEach(anime => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${anime.thumbnail}" alt="${anime.title}">
        <div class="content">
          <h4>${anime.title}</h4>
          <p>Episode: ${anime.episode}</p>
          <a href="${anime.link}" target="_blank">Lihat Anime</a>
        </div>
      `;

      animeList.appendChild(card);
    });
  })
  .catch(err => {
    animeList.innerHTML = "<p>Gagal mengambil data anime 😥</p>";
    console.error(err);
  });
