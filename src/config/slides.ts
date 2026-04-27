export interface SlideConfig {
  id: string;
  beforeImage: string;
  afterImage: string;
  caption: string;
}

export const slides: SlideConfig[] = [
  {
    id: "barmina",
    beforeImage: "/assets/slides/slide1-before.webp",
    afterImage: "/assets/slides/slide1-after.webp",
    caption: "Чистота — это моё боброе дело!",
  },
  {
    id: "sinicyna",
    beforeImage: "/assets/slides/slide2-before.webp",
    afterImage: "/assets/slides/slide2-after.webp",
    caption: "Бобёр за чистоту — зуб даю!",
  },
  {
    id: "bossert",
    beforeImage: "/assets/slides/slide3-before.webp",
    afterImage: "/assets/slides/slide3-after.webp",
    caption: "Бобёр не просто грызёт — он чистоту бережёт!",
  },
  {
    id: "lebedeva",
    beforeImage: "/assets/slides/slide4-before.webp",
    afterImage: "/assets/slides/slide4-after.webp",
    caption: "Чистота по-бобровски — всё сгрыз лишнее!",
  },
  {
    id: "smolyaninova",
    beforeImage: "/assets/slides/slide5-before.webp",
    afterImage: "/assets/slides/slide5-after.webp",
    caption: "Там, где трудится бобёр — исчезает сразу сор!",
  },
  {
    id: "gizatullin",
    beforeImage: "/assets/slides/slide6-before.webp",
    afterImage: "/assets/slides/slide6-after.webp",
    caption: "Обобрено!",
  },
  {
    id: "li",
    beforeImage: "/assets/slides/slide7-before.webp",
    afterImage: "/assets/slides/slide7-after.webp",
    caption: "Чистота — дело боброе :)",
  },
  {
    id: "belonosov",
    beforeImage: "/assets/slides/slide8-before.webp",
    afterImage: "/assets/slides/slide8-after.webp",
    caption: "Будет чисто до утра, если в деле два бобра!",
  },
  {
    id: "pravkin",
    beforeImage: "/assets/slides/slide9-before.webp",
    afterImage: "/assets/slides/slide9-after.webp",
    caption: "Полный бобрядок :)",
  },
  {
    id: "basistiy",
    beforeImage: "/assets/slides/slide10-before.webp",
    afterImage: "/assets/slides/slide10-after.webp",
    caption: "Грызём беспорядок на корню!",
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
