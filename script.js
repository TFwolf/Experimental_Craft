  const channels = [
      { id: 'UCA13xSMV2Tq3T5qrUQJ1GRg', name: 'Channel 1', tag: 'ExperimentalCraft,EC+-shorts+-live' },
      { id: 'UCV7RZRpGiPba0lkeqw0bfqw', name: 'Channel 2', tag: 'EC+-shorts+-live' }
    ];

    const apiKey = 'AIzaSyDPXPKzbAWuXaXMjq-DQwsIC6JrXemr1DE'; // replace with your YouTube API key
  
    function displayVideos(channelId, channelName, tag, maxResults, elementId) {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&key=${apiKey}&maxResults=${maxResults}&type=video&q=${tag}&order=date`)
          .then(response => response.json())
          .then(data => {
              const videos = data.items;
              const channelVideos = document.getElementById(elementId);
              
              for (let i = 0; i < videos.length; i++) {
                  const video = videos[i];
                  const videoId = video.id.videoId;
                  const title = video.snippet.title;
                  const publishedTime = getElapsedTime(video.snippet.publishedAt);
                  
                  function getElapsedTime(publishedAt) {
                const elapsedTime = Date.now() - new Date(publishedAt).getTime();
                const minutes = Math.floor(elapsedTime / 60000);
                
                if (minutes < 60) {
                    return `${minutes}min`;
                } else if (minutes < 1440) {
                    return `${Math.floor(minutes / 60)}h`;
                } else if (minutes < 43200) {
                    return `${Math.floor(minutes / 1440)}j`;
                } else if (minutes < 525600) {
                    return `${Math.floor(minutes / 43200)}mo`;
                } else {
                    return `${Math.floor(minutes / 525600)}ans`;
                }
            }
                
                let views = 'Indisponible';
                let likes = 'Indisponible';
                let comments = 'Indisponible';
                
                if (video.statistics) {
                    views = video.statistics.viewCount.toLocaleString();
                    likes = video.statistics.likeCount.toLocaleString();
                    comments = video.statistics.commentCount.toLocaleString();
                }
                
                const videoHtml = `
                <div class="video">
                    <iframe src="https://www.youtube.com/embed/${videoId}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div>
                        <h2>${title}</h2>
                        <p>Vues: <b>${views}</b> | Likes: <b>${likes}</b> | Commenttaires: <b>${comments}</b></p>
                        <p>Publier <b>il-y-à ${publishedTime}</b></p>
                    </div>
                </div>
                `;
            
            channelVideos.innerHTML += videoHtml;
        }
    })
    .catch(error => console.error(error));
}

function openTab(evt, tabName) {
    const tabs = document.getElementsByClassName('tab');
    const tabLinks = document.getElementsByClassName('tab-link');
    
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(' active', '');
    }
    
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

for (let i = 0; i < channels.length; i++) {
    const channel = channels[i];
    const elementId = `channel${i + 1}-videos`;
    displayVideos(channel.id, channel.name, channel.tag, 20, elementId);
}
