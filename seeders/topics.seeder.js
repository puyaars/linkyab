import { Seeder } from "mongoose-data-seed";
import { Topic as Model } from "../src/models";

const data = [
  {
    title: "سرگرمی",
    description: "جک و ویدیو های خنده دار",
    pic:
      "/assets/fun.png",
  },
  {
    title: "اخبار",
    description: "آخرین رویداد ها را دنبال کنید",
    pic: "/assets/news.png",
  },
  {
    title: "گفت وگو",
    description: "ارتباط برقرار کنید و دوستان تازه پیدا کنید",
    pic: "/assets/chat.jpg",
  },
  {
    title: "مد و فشن",
    description: "بروز نرین لباس ها رو ببینید و بخرید",
    pic: "/assets/fashion.jpg",
  },
  {
    title: "ورزش و سلامت",
    description: "سلامت و تندرست باشید",
    pic: "/assets/sport.jpeg",
  },
  {
    title: "مسافرت",
    description: "از اماکن جدید لذت ببرید",
    pic: "/assets/travel.jpg",
  },
  {
    title: "آموزش",
    description: "متفاوت بیاندیشید",
    pic: "/assets/education.jpg",
  },
  {
    title: "اقتصاد",
    description: "سرمایه گذاری های جدید را پیدا کنید",
    pic: "/assets/business.jpg",
  },
  {
    title: "سبک زندگی",
    description: "راحت زندگی کنید",
    pic: "/assets/lifestyle.jpg",
  },
  {
    title: "موزیک",
    description: "ترانه خودتون رو پیدا کنید",
    pic: "/assets/music.jpg",
  },
  {
    title: "تبلیغات",
    description: "برند خودتون رو به همه معرفی کنید",
    pic: "/assets/advertisement.jpg",
  },
  {
    title: "عکاسی",
    description: "از پشت لنز دنیا رو ببینید",
    pic: "/assets/photography.jpg",
  },
  {
    title: "هنر",
    description: "جور دیگر باید دید",
    pic: "/assets/art.jpg",
  },
  {
    title: "انیمه",
    description: "اوقات خوشی رو سپری کنید",
    pic: "/assets/anime.jpg",
  },
];

class TopicSeeder extends Seeder {
  async shouldRun() {
    return Model.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Model.create(data);
  }
}

export default TopicSeeder;
