const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;

let userSchema = new mongoose.Schema({
  username: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    unique: true,
    required: true,
    type: String
  },
  token: {
    unique: true,
    required: true,
    type: String
  }
  // loginAttempts: {
  //   type: Number,
  //   required: true,
  //   default: 0
  // },
  // lockUtil: Number,
  // meta: {
  //   createdAt: {
  //     type: Date,
  //     default: Date.now()
  //   },
  //   updateAt: {
  //     type: Date,
  //     default: Date.now()
  //   }
  // }
});

// userSchema.virtual("isLocked").get(function() {
//   return !!(this.lockUtil && this.lockUtil > Date.now());
// });

// userSchema.pre("save", function(next) {
//   if (this.isNew) {
//     this.meta.createdAt = this.updateAt = Date.now();
//   } else {
//     this.updateAt = Date.now();
//   }
//   next();
// });

// userSchema.pre("save",function(next){
//   if (!this.isModified("password")) return next();

//   bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(this.password, salt, (error, hash) => {
//       if (error) return next(error);

//       this.password = hash;
//       next();
//     });
//   });
// });

userSchema.methods = {
  comparePassword: (_password, password) => {
    // return new Promise((resolve, reject) => {
    //   bcrypt.compare(_password, password, (err, isMatch) => {
    //     if (!err) resolve(isMatch);
    //     else reject(err);
    //   });
    // });
    return new Promise((resolve, reject) => {
      if(_password === password) {
        resolve(true)
      }else{
        resolve(false);
      }
    })
  },
  // incLoginAttempts: user => {
  //   return new Promise((resolve, reject) => {
  //     if (this.lockUtil && this.lockUtil < Date.now()) {
  //       // 过了解锁时间
  //       this.update(
  //         {
  //           $set: {
  //             loginAttempts: 1
  //           },
  //           $unset: {
  //             lockUntil: 1
  //           }
  //         },
  //         err => {
  //           if (!err) resolve(true);
  //           else reject(err);
  //         }
  //       );
  //     } else {
  //       // 锁定
  //       let updates = {
  //         $inc: {
  //           loginAttempts: 1
  //         }
  //       };

  //       if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
  //         updates.$set = {
  //           lockUntil: Date.now() + LOCK_TIME
  //         };

  //         this.update(updates, err => {
  //           if (!err) resolve(true);
  //           else reject(err);
  //         });
  //       }
  //     }
  //   });
  // }
};

module.exports = mongoose.model("User", userSchema);
