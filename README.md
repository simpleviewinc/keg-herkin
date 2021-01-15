# Keg-Herkin
* Provides **cross-platform** and **cross-browser** application testing.
* Runs within an isolated environment (docker) to ensure a dependable an predicable testing conditions.
* It simplifies the application testing process with functionality such as 
  * Visualize tests as they are run on the host machines browser.
  * Write and execute tests directly in the browser within a web applications context.
    * **Requires** adding a single `script` tag to the web application
    * Browser must support [postmessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
    * The same tests can later be executed within a `headless` browser environment ( CI )
  * Use Cucumber.js to write feature files and step definitions
    * Feature files can use pre-defined step definitions, enabling non-developers to write tests
    * Custom step definitions can also be loaded, to handel application edge cases
  * Use Jest and Expect to assert test validity
    * **0 modifications** are needed, if Jest is already being used


## Tech Stack
* [Playwright](https://playwright.dev/)
  * Automates the browser
  * Works on all browsers
  * Provides the base docker container for Keg-Herkin
* [QAWolf](https://github.com/qawolf/qawolf)
  * Automatically writes tests based on browser interactions
  * CLI to create, run, and debug end-to-end tests within a Repl
  * Wraps Playwright for automation
* [Jest](https://jestjs.io/)
  * Provides data assertion ([expect](https://jestjs.io/docs/en/expect))
  * Allows running tests in parallel
  * Generates code coverage in multiple formats
* [Cucumber](https://github.com/cucumber/cucumber-js)
  * Tool for running automated tests written in plain language (Gherkin)
  * Parses Features / Scenarios files
  * Links Scenarios to Step definitions
  * Step definitions run actual tests based on linked Scenarios
* [Docker](https://www.docker.com/)
  * Open-source containerization technology for building and containerizing your applications
* [Docker-Compose](https://github.com/docker/compose)
  * Tool for defining and running multi-container Docker applications
  * Uses a YAML file to configure your application’s services
* [Keg-Hub](https://github.com/simpleviewinc/keg-hub)
  * A platform for developing cross-platform react apps.
  * Comes pre-configured to target both web and mobile devices
  * Contains a collection of utilities for simplifying development
* [Keg-CLI](https://github.com/simpleviewinc/keg-cli)
  * CLI for running taps, and other keg-hub related tasks
  * Manages docker and docker-compose
  * Can be extended by Taps through custom tasks
* [Mutagen](https://mutagen.io/)
  * Provides real-time file synchronization and network forwarding

## Architecture

### CI
* TODO

### Local Development
* TODO

### Iframe
* TODO


## Tasks
* [Start](/docs/tasks/start.md) - Start the Keg-Herkin application


