const Gift = require("../dbs/models/gift");
const User = require("../dbs/models/user");

export const getUserGift = async token => {
  let user = await User.findOne({ token });
  const Gifts = await Gift.find({ userId: user.id , disable: false});
  return Gifts;
};

export const addUserGift = async ({
  token,
  title,
  startDate,
  endDate,
  gift
}) => {
  try {
    let user = await User.findOne({ token });
    let insert = new Gift({
      userId: user.id,
      title,
      startDate,
      endDate,
      gift
    });

    await insert.save();
    return {
      success: true
    };
  } catch (error) {
    return {
      success: false
    };
  }
};

export const delUserGift = async id => {
  try {
    let gift = await Gift.findOne({ _id: id  });
    gift.disable = true;
    await gift.save();
    return {
      success: true
    };
  } catch (error) {
    return {
      success: false
    };
  }
};

export const editUserGift = async ({
  _id,
  title,
  startDate,
  endDate,
  gift
}) => {
  try {
    let _gift = await Gift.findOne({ _id });
    _gift.title = title;
    _gift.startDate = startDate;
    _gift.endDate = endDate;
    _gift.gift = gift;
    await _gift.save();
    return {
      success: true
    };
  } catch (error) {
    return {
      success: false
    };
  }
};
