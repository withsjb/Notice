import React from 'react';

const CarouselItem = ({ title, subtitle, images }) => {
  return (
    <div className="carousel-item active">
      <div className="carousel-title">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <div className="row">
        {images.map((img, index) => (
          <div className="col-md-3" key={index}>
            <div className="thumbnail">
              <img className="d-block w-100" src={img.src} alt={img.alt} />
            </div>
            <div className="caption">
              <h4>{img.captionTitle}</h4>
              <p>{img.captionText}</p>
              <a className="btn btn-mini" href="#">&raquo; Read More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const slides = [
    {
      title: '오늘의 추천 건강요리',
      subtitle: '건강은 과학이다!',
      images: [
        { src: 'https://via.placeholder.com/360x240?text=Slide+1', alt: 'First slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        // 나머지 이미지들
        { src: 'https://via.placeholder.com/360x240?text=Slide+1', alt: 'Second slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        { src: 'https://via.placeholder.com/360x240?text=Slide+1', alt: 'Third slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        { src: 'https://via.placeholder.com/360x240?text=Slide+1', alt: 'Fourth slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
      ]
    },
    {
      title: '오늘의 추천 고기 요리',
      subtitle: '오늘 하루도 든든하게 한 접시 어떠세요?',
      images: [
        { src: 'https://via.placeholder.com/360x240?text=Slide+2', alt: 'First slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        // 나머지 이미지들
        { src: 'https://via.placeholder.com/360x240?text=Slide+2', alt: 'Second slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        { src: 'https://via.placeholder.com/360x240?text=Slide+1', alt: 'Third slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        { src: 'https://via.placeholder.com/360x240?text=Slide+2', alt: 'Fourth slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
      ]
    },
    {
      title: '추천요리3번',
      subtitle: '대충 부제목',
      images: [
        { src: 'https://via.placeholder.com/360x240?text=Slide+3', alt: 'First slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        // 나머지 이미지들
        { src: 'https://via.placeholder.com/360x240?text=Slide+3', alt: 'Second slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        { src: 'https://via.placeholder.com/360x240?text=Slide+1', alt: 'Third slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
        { src: 'https://via.placeholder.com/360x240?text=Slide+1', alt: 'Fourth slide', captionTitle: 'Praesent commodo', captionText: 'Nullam Condimentum Nibh Etiam Sem' },
      ]
    }
  ];

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="5000">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            title={slide.title}
            subtitle={slide.subtitle}
            images={slide.images}
          />
        ))}
      </div>
      <div className="control-box">
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
      </div>
      <div className="control-box">
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default App;
