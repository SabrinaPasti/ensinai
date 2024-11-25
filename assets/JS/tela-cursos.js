new Splide('.slide__aulas.splide', {
    type: 'slide',
    perPage: 3,
    perMove: 1,
    pagination: false,
    gap: '1.3rem',
    breakpoints: {
      1100: {
        perPage: 2,
      },
      600: {
        perPage: 1,
      }
    }
}).mount();

