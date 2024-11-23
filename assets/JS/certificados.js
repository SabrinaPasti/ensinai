new Splide('.splide-certificados', {
    type: 'slide',
    perPage: 3,
    perMove: 1,
    start: 1,
    pagination: false,
    gap: '2.2rem',
    breakpoints: {
      800: {
        perPage: 2,
      },
      600: {
        perPage: 1,
      }
    }
}).mount();

