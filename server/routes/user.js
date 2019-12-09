const { controller, get, post, all, del } = require("../lib/deractor");
const {
  checkPassword
} = require("../service/user");

@controller("gift/user")
export class UserController {
  @post("/")
  async login(ctx, next) {
    let { username, password } = ctx.request.body;
    const match = await checkPassword(username, password);

    if(!match.user){
      return ctx.body = {
        success: false,
        error: "用户不存在"
      }
    }

    if(match.match){
      return ctx.body = {
        success: true,
      }
    }

    if(!match.match){
      return ctx.body = {
        success: false,
        error: "密码错误"
      }
    }
  }
}
