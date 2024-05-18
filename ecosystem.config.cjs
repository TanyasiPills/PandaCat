module.exports = {
  apps : [{
    name   : "backend",
    script : ".\\BackEnd\\index.js",
    watch: [
      ".\\BackEnd\\index.js",
      ".\\Stealing\\steal.js"
    ]
  }]
}
