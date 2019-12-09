import { async } from "q";

const Gift = require("../dbs/models/gift");


export const getUserGift = async (type, year) => {
  let query = {};
  if (type) {
    query.GiftTypes = {
      $in: [type]
    };
  }
  if (year) {
    query.year = year;
  }

  const Gifts = await Gift.find(query);
  return Gifts;
};


export const addUserGift = async (gift, token) => {
  
}
