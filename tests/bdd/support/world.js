const { setWorldConstructor, World } = require('@cucumber/cucumber')

class HerkinWorld extends World {
    constructor(options) {
        this.foo = 105
        super(options)
    }
}

setWorldConstructor(HerkinWorld)