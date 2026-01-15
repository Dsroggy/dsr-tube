const API_KEY = "AIzaSyCSVGqVx0qX_BNpLElS9XY-7VrQnHxGIAg";
const videosDiv = document.getElementById("videos");
const searchInput = document.getElementById("searchInput");

async function loadVideos(query = "trending") {
  if (!videosDiv) return;

  videosDiv.innerHTML = "Loading...";

  const url =
    `https://www.googleapis.com/youtube/v3/search?` +
    `part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  videosDiv.innerHTML = "";

  if (!data.items) {
    videosDiv.innerHTML = "API Error / Limit Reached";
    return;
  }

  data.items.forEach(item => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <img src="${item.snippet.thumbnails.medium.url}">
      <div class="video-info">
        <h3>${item.snippet.title}</h3>
        <p>${item.snippet.channelTitle}</p>
      </div>
    `;

    card.onclick = () => {
      location.href = `watch.html?v=${item.id.videoId}`;
    };

    videosDiv.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      loadVideos(searchInput.value);
    }
  });
}

loadVideos();
