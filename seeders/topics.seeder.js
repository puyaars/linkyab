import { Seeder } from "mongoose-data-seed";
import { Topic as Model } from "../src/models";

const data = [
  {
    title: "fun",
    description: "fun memes and jokes",
    pic:
      "https://teambuildingenfun.nl/wp-content/uploads/2019/10/fun-02-01-400x400.png",
  },
  {
    title: "news",
    description: "get lates news and updates",
    pic: "https://www.paho.org/hq/images/stories/mh/icons-news-blue-400x400.png",
  },
  {
    title: "chat",
    description: "socialize and make friends",
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6nCAU6voCOYQgbRa1fk8NRSB6ME5HqPEjCXL3lyVnOKQ80s7G&usqp=CAU",
  },
  {
    title: "fashion",
    description: "lean about trends and look unique",
    pic: "https://fashionforgood.com/wp-content/uploads/2018/11/MsBay_portret_Saskia-400x400.jpg",
  },
  {
    title: "sport",
    description: "be fit",
    pic: "https://tilea.systems/wp-content/uploads/2019/03/Legnica2-400x400.jpeg",
  },
  {
    title: "travel",
    description: "enjoy new cultures and places",
    pic: "https://www.candotours.com/wp-content/uploads/2019/05/Airport-Transfers-1-400x400.jpg",
  },
  {
    title: "education",
    description: "become brighter",
    pic: "https://www.ti-coast.com/images/human-capital/anac-phd-education-program.jpg",
  },
  {
    title: "business",
    description: "find new investments",
    pic: "https://www.btmatters.com.au/website/wp-content/uploads/2015/08/photodune-7212896-for-business-s-400x400.jpg",
  },
  {
    title: "lifestyle",
    description: "live a comfy life",
    pic: "https://tykky.nl/wp-content/uploads/2020/03/Society-of-Lifestyle-House-Doctor-vase-vaas-bubble-clear-25-cm-2-e1585318314507-400x400.jpg",
  },
  {
    title: "music",
    description: "find your vibe",
    pic: "https://wallpapers.net/girl-listening-to-music-hd-wallpaper/download/400x400.jpg",
  },
  {
    title: "advertisement",
    description: "make your brand known",
    pic: "https://pbs.twimg.com/profile_images/1021822138964004865/UimQskO__400x400.jpg",
  },
  {
    title: "photography",
    description: "see beyond lenz",
    pic: "https://format-com-cld-res.cloudinary.com/image/private/s--U9jG-ApX--/c_crop,h_685,w_1024,x_0,y_0/c_fill,g_center,h_400,w_400/fl_keep_iptc.progressive,q_95/v1/a5637a650f0beaf3598eeace07fbea20/20191111-116.jpg",
  },
  {
    title: "art",
    description: "think in a new way",
    pic: "https://www.marcelamsterdam.nl/wp-content/uploads/2015/09/IMG_8878-400x400.jpg",
  },
  {
    title: "anime",
    description: "onii chan daisuki",
    pic: "https://cdnb.artstation.com/p/assets/images/images/020/185/703/20190825131628/smaller_square/anime-attics-illustration51.jpg?1566756988",
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
