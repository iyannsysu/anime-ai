const apiUrl = 'https://api.sansekai.my.id/api/anime/latest';
const listContainer = document.getElementById('anime-list');

async function getAnime() {
    try {
        // Fetch dengan header sesuai request CURL Anda
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // PENTING: Kita perlu cek struktur datanya di Console
        console.log("Data dari API:", result);

        // Biasanya API menyimpan list di dalam properti seperti 'data', 'results', atau langsung array.
        // Kita coba deteksi otomatis:
        let animeArray = [];
        
        if (Array.isArray(result)) {
            animeArray = result;
        } else if (result.data && Array.isArray(result.data)) {
            animeArray = result.data;
        } else if (result.results && Array.isArray(result.results)) {
            animeArray = result.results;
        } else {
            // Jika format beda, kita ambil paksa properti pertama yang berupa array
            const keys = Object.keys(result);
            for(let key of keys) {
                if (Array.isArray(result[key])) {
                    animeArray = result[key];
                    break;
                }
            }
        }

        displayAnime(animeArray);

    } catch (error) {
        console.error('Gagal mengambil data:', error);
        listContainer.innerHTML = `
            <div style="text-align:center; width:100%; grid-column: 1/-1;">
                <h3>Gagal memuat data 😢</h3>
                <p>Cek Console (F12) untuk detail error.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
}

function displayAnime(animeList) {
    listContainer.innerHTML = ''; // Hapus loading

    if (animeList.length === 0) {
        listContainer.innerHTML = '<p>Tidak ada data anime ditemukan.</p>';
        return;
    }

    animeList.forEach(anime => {
        // Penyesuaian nama properti (title, thumbnail, dll)
        // Gunakan Fallback ( || ) jika nama key di API berbeda
        const title = anime.title || anime.name || 'Judul tidak tersedia';
        const image = anime.thumbnail || anime.image || anime.img || 'https://via.placeholder.com/200x300?text=No+Image';
        const episode = anime.episode || anime.ep || '???';
        const link = anime.link || '#';

        const card = document.createElement('div');
        card.classList.add('card');

        // Saat gambar diklik, buka link (jika ada)
        card.innerHTML = `
            <a href="${link}" target="_blank" style="text-decoration:none; color:inherit;">
                <img src="${image}" alt="${title}" loading="lazy">
                <div class="card-content">
                    <h3>${title}</h3>
                    <span class="episode-tag">${episode}</span>
                </div>
            </a>
        `;

        listContainer.appendChild(card);
    });
}

// Jalankan
getAnime();
