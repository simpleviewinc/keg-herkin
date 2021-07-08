# Keg-Herkin
Provides **cross-platform** and **cross-browser** application testing through an easy to use interface that simplifies writing and automating test execution

## Features
* Runs within an isolated environment
  * Ensures dependable and predicable automation and testing conditions.
* Visualize tests as they are run
  * Tests can be executed on the hosts machine or within an isolated container
* Write and execute tests and automation steps directly in the browser
  * Updates and changes are automatically synced to the host machine or a git provider 
* Use gherkin syntax to write feature files and step definitions
  * Feature files can use pre-defined step definitions, enabling non-developers to write tests
  * Custom step definitions can also be loaded, to handel application edge cases
* Requires **0 modifications** to the application, yet capable of **100%** test coverage

## Architecture

### [Docker](https://www.docker.com/)
* Used to provide an isolated container environment
* Allows running the framework anywhere a docker container can be run
  * Kubernetes
  * Swarm
  * Compose
* Docker overlay volume technology used for syncing local files into the container
* Mutagen.io sync technology used for syncing keg-herkin code into the container
  * **Used for development only** 
* Framework updates are published via new docker images
  * Allows running a single command to update to the latest version
  * Allows switching to different framework version just by running a different version

### [Playwright](https://playwright.dev/)
* Used to provide reliable testing and automation across all browsers

### [Parkin](https://lancetipton.github.io/parkin/)
* Used parse Feature files written in gherkin syntax into steps, then executes each step