import React, { useState } from 'react';

const videos = [
  {
    id: 'growBusiness-vid',
    src: 'https://www.youtube.com/embed/ZV7fxqdmEiI',
    caption: 'Grow Your Business'
  },
  {
    id: 'timothys-vid',
    src: 'https://www.youtube.com/embed/7WaHKkz1OwA',
    caption: "Timothy's Restaurant"
  },
  {
    id: 'watermark-vid',
    src: 'https://www.youtube.com/embed/AR6oP5flxdQ',
    caption: 'Watermark Brewing Compa...'
  },
  {
    id: 'taborHill-vid',
    src: 'https://www.youtube.com/embed/eGC9kolY0Bg',
    caption: 'The Inside Scoop on Three...'
  },
  {
    id: 'gravityBrew-vid',
    src: 'https://www.youtube.com/embed/i98Np2Rzdas',
    caption: 'Final Gravity Brewing'
  }
];

const App = () => {
  const [mainVideoSrc, setMainVideoSrc] = useState(videos[0].src);

  const changeVideo = (src) => {
    setMainVideoSrc(src);
  };

  return (
    <div style={{ width: '90%', margin: '50px auto', textAlign: 'center' }}>
      <div className="youtuberoom">
        <h2 className="youtext">
          <i className="fa-brands fa-youtube"></i> 화제의 영상
        </h2>
        
        <div className="youtube-carousel-wrap">
          <div className="youtube-carousel-main">
            <iframe
              id="main-youtube-video"
              src={mainVideoSrc}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="main-video"
            ></iframe>
          </div>
          <div className="youtube-carousel-gallery" data-simplebar>
            {videos.map((video) => (
              <div
                key={video.id}
                className="youtube-control"
                data-source={video.src}
                onClick={() => changeVideo(video.src)}
              >
                <p className="youtube-caption">{video.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
