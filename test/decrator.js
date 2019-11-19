class Boy {
  @speakLang("Chinese")
  speak() {
    console.log("I can speak "+this.lang);
  }
}

/**
 *
 *
 * @param {Class} target
 * @param {String} key
 * @param {Object} description
 */
function speak(target, key, description) {
  console.log(target);
  console.log(key);
  console.log(description);

  return description;
}


/**
 *
 *
 * @param {String} lang // extions
 * @returns
 */
function speakLang(lang) {
  return function(target, key, description) {
    console.log(target);
    console.log(key);
    console.log(description);

    target.lang = lang;
    return description;
  };

}

const luke = new Boy();

luke.speak();
