const trim = function trim(s) {
  s = s.replace(/(^\s*)|(\s*$)/gi, ""); 
  s = s.replace(/[ ]{2,}/gi, " ");
  s = s.replace(/\n /, "\n");
  return s;
  // https://www.qodo.co.uk/blog/javascript-trim-leading-and-trailing-spaces/
};

module.exports = {
  trim,
};
