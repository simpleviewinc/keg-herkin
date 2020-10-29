# New feature flow
1. Start a command which
 * starts the backend docker container
 * starts the local server running on the host machine
 * maybe accepts flags for syncing other projects for feature and step definition files
2. User runs `yarn test:create` to create a new test file
  * this drops them into the qa-wolf REPL
  * they can then decide what to do -- record, or do something else
3. User can manually edit the feature file with jest and cucumber as they want
3. User can run `yarn test:run` to run the test
​
# TODO
[] start task
  [x] starts the local server running on the host machine
    * the local server, starting the browser, gets the websocket-hash to the browser, passed to the `docker-compose.yml` file
  [x] starts the backend docker container
  [] accepts flags for syncing other projects for feature and step definition files
    * `values.defaults.yml` we create with defaults 
    * `values.yml` file can be configured with the environment variable overrides (or the user can pass these inline at the terminal). 
​
[] create test 
  * this drops them into the qa-wolf REPL for creating
  * they can then decide what to do using that REPL -- record, or do something else
  * user can explicitly write the `qawolf.create()` call to define where the recording begins
  * parameters
    * context: name of test
    * url: url that test will be run on (could use default env)
    * template: cucumber vs qa-wolf
      * ideally eventually we can abstract this out and won't need separate templates
​
[] edit test
  * this drops them into the qa-wolf REPL for editing
  * they can then decide what to do using that REPL -- record, or do something else
  * parameters
    * context?: name of test (if not provided, we could ask)
​
[] run test
  * runs the cucumber test-runner
    * need this for feature files
  * could ALSO run the qa-wolf test-runner, but this can't run features
  * runs the tests
    * Environment variables / start-command args
      1. Path to the external project
      2. Browser(s) to test on
      3. Headless mode
      4. Dimensions of browser
      5. Playwright device list
      6. Path to the custom value yml file
      7. test-runner (cucumber vs qa-wolf)
    * also could let user define the custom docker-compose file that docker compose runs with
  * when running tests, looks at the "env" argument (e.g. env=ci, env=mac-ci, env=win-ci), which it uses to determine which `values.<env>.yml` to use
    * then each of these can define any environment variables they want
  * parameters
    * context?: name of single test file to test (if not provided, we run all the tests)
    * browser?: uses env var by default, otherwise uses this browser, 
      * this could also be defined in the `values.yml`, following this pattern:
        * BROWSER_<env> 
​
[] create our qa-wolf template
  * import/integrate with the "expect" package (ideally import jest's expect package directly, so that we have control over that dependency) 
    * [some existing work done on this](tests/wolf/test.template.js)
  * import/integrate with the cucumber exports (Given/When/Then)
  * investigate/research: there is a lot of jest/qa-wolf initialization code that takes up a lot of the template. It would be nice to just wrap these into a function that we import, OR to pass our tests into that file to be run there.
​
[] setup the test results reporter
  * ideally, just copy over the cucumber-html-reporter work from `keg-regulator`
​
[] we need configuration for setup for cucumber
  * probably can copy from `keg-regulator`
  * just ignore the selenium stuff
​
[] github actions for running this in a ci environment
  - a reusable action that can be added to any repo
  - when this action is added, it will use kegherkin to run the tests in that repo 
  - makes this super simple to setup on any "test" repo or other repo
​
[] migrate repo from lancetipton to @simpleviewinc org
​
[] stop task
​
[] investigate using keg-cli as a node_module to reuse tasks like start/stop
​
# Done?
[ x ] it needs a server that runs on the host machine, not in docker container, for launching the browser