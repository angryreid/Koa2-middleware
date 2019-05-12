const router = require("koa-router")();
const Person = require("../dbs/models/person");
const Redis = require("koa-redis");

const Store = new Redis().client;

router.prefix("/users");

router.get("/", function(ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function(ctx, next) {
  ctx.body = "this is a users/bar response";
});

// create
router.post("/addPerson", async function(ctx) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  });
  let code = 0;
  try {
    await person.save();
  } catch (error) {
    code = -1;
  }
  ctx.body = {
    code
  };
});

// find
router.get("/getPerson", async function(ctx) {
  let code = 0;
  try {
    const result = await Person.findOne({ name: ctx.request.body.name });
    const results = await Person.find({ name: ctx.request.body.name });
  } catch (error) {
    code = -1;
  }
  ctx.body = {
    code,
    result,
    results
  };
});

// update
router.post("updatePerson", async function(ctx) {
  let code = 0;
  try {
    const result = await Person.where({
      name: ctx.request.body.name
    }).update({
      age: ctx.request.body.age
    });
  } catch (error) {
    code = -1;
  }
  ctx.body = {
    code
  };
});

// remove
router.post("removePerson", async function(ctx) {
  let code = 0;
  try {
    const result = await Person.where({
      name: ctx.request.body.name
    }).remove();
  } catch (error) {
    code = -1;
  }
  ctx.body = {
    code
  };
});

// redis
router.get("/fix", async function(ctx) {
  const st = await Store.hset("fix", "name", Math.random());
  ctx.body = {
    code: 0
  };
});

module.exports = router;
