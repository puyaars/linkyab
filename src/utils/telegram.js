import Parser from "dom-parser";
import axios from "axios";

const parser = new Parser();

export const getChannelInfo = async (link) => {
  return await axios
    .get(link)
    .then((res) => parser.parseFromString(res.data))
    .then((parsed) => {

      var extra = parsed
      .getElementsByClassName("tgme_page_extra")[0]
      .innerHTML.replace(/\n/g, "")

      var title =  parsed
      .getElementsByClassName("tgme_page_title")[0]
      .textContent.replace(/\n/g, "")

      var type =  ((v) => {
        switch (v) {
          case "Join Group":
            return "GROUP";
          case "Send Message":
            if (/bot$/i.test(title)) return "BOT";
            else return "ECCOUNT";
          case "View in Telegram":
            return "CHANNEL";
        }
      })(
        parsed.getElementsByClassName("tgme_action_button_new")[0].innerHTML
      )

      return {
        pic: parsed
          .getElementsByClassName("tgme_page_photo_image")[0]
          .attributes.find((attr) => attr.name == "src").value,
        title,
        extra,
        description: parsed.getElementsByClassName("tgme_page_description")[0]
          .innerHTML,
        type,
        members: ((type,extra) => {
          if (["GROUP", "CHANNEL"].includes(type) && /[0-9 ]+ members/.test(extra)) {
            return parseInt(
              /[0-9 ]+ members/
                .exec(extra)[0]
                .replace(" ", "")
                .replace(" members", "")
            );
          } else return 0;
        })(type,extra),
      };
    });
};

