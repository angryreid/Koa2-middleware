const User = require("../dbs/models/user");
const md5 = require("blueimp-md5");

export const checkPassword = async (username, password) => {
  let match = false;
  const user = await User.findOne({ username });
  if (user) {
    match = await user.comparePassword(password, user.password);
    if (match) {
      let token = md5(md5(username + password));
      user.token = token;
      let s = await user.save();
      console.log(s);
    }
  }
  return {
    match,
    user
  };
};
