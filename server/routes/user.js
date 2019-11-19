const { controller, get, post, all, del } = require("../lib/deractor");
const {
  checkPassword
} = require("../service/user");

@controller("user")
export class UserController {
  @post("/")
  async login(ctx, next) {
    let { email, password } = ctx.request.body;
    const match = await checkPassword(email, password);

    if(!match.user){
      return ctx.body = {
        success: false,
        error: "no exist"
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
        error: "password wrong"
      }
    }
  }
}
