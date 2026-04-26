export interface SlideConfig {
  id: string;
  beforeImage: string;
  afterImage: string;
  caption: string;
}

export const slides: SlideConfig[] = [
  {
    id: "slide-1",
    beforeImage: "/assets/slides/slide1-before.jpg",
    afterImage: "/assets/slides/slide1-after.jpg",
    caption: "Чистота — это моё боброе дело!",
  },
  {
    id: "slide-3",
    beforeImage: "/assets/slides/slide3-before.jpg",
    afterImage: "/assets/slides/slide3-after.jpg",
    caption: "Грызём беспорядок на корню!",
  },
  {
    id: "slide-4",
    beforeImage: "/assets/slides/slide4-before.jpg",
    afterImage: "/assets/slides/slide4-after.jpg",
    caption: "Бобры не терпят бардак!",
  },
  {
    id: "slide-5",
    beforeImage: "/assets/slides/slide5-before.jpg",
    afterImage: "/assets/slides/slide5-after.jpg",
    caption: "Порядок — наша плотина!",
  },
];

export const titleSlide = {
  heading: "ПОЛНЫЙ\nПОРЯДОК!",
  subheading: "Будет чисто до утра, если в деле {два} 13 бобра",
  buttonText: "Погнали",
};

export const endSlide = {
  heading: "НУ ВОТ\nИ ЧУДНО!",
  subheading: "Спасибо за чистоту!",
  buttonText: "Давай еще раз",
};
