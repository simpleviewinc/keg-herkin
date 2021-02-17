const { setWorldConstructor, World } = require('@cucumber/cucumber')

class HerkinWorld extends World {
    constructor(options) {
        super(options)
    }
}

setWorldConstructor(HerkinWorld)