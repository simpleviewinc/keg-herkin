

module.exports = {
  "name": "keg-herkin",
  "displayName": "Keg-Herkin",
  "keg": {
    "cli": {
      "link": {
        "name": "herkin"
      }
    },
    "routes": {
      "/": "RootContainer"
    },
    "tapResolver": {
      "paths": {
        "tapSrc": "./repos/tap"
      }
    },
    "playwright": {
      "browser": {
        "type": "chromium",
        "allowed": [ "chromium", "firefox", "webkit" ],
        "headless": false
      }
    },
  },
  "expo": {
    "name": "keg-herkin",
    "slug": "keg-herkin"
  }
}
