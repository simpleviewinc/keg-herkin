import { Values } from 'SVConstants'
const { SOCKR_MSG_TYPES } = Values

export const testRunModelMock = {
  file: "/keg/tap/tests/bdd/features/scrollSessions.feature",
  testType: "feature",
  lastRun: 1616084542851,
  exitCode: 1,
  failed: true,
  active: true,
  running: false,
  command: "bdd",
  params: [
    "context=tests/bdd/features/scrollSessions.feature",
    "slowMo=5"
  ],
  messages: {
    "1616084165074": {
      message: "Running feature tests for scrollSessions.feature",
      timestamp: 1616084165074,
      type: SOCKR_MSG_TYPES.CMD_RUN,
    },
    "1616084165474": {
      message: "$ node ./tasks/runTask.js bdd test context=tests/bdd/features/scrollSessions.feature slowMo=5\n",
      timestamp: 1616084165474,
      type: SOCKR_MSG_TYPES.STD_OUT,
    },
    "1616084166213": {
      message: "==== Using previously-launched chromium on host machine... ====\n",
      timestamp: 1616084166213,
      type: SOCKR_MSG_TYPES.STD_OUT,
    },
    "1616084178820": {
      message: "FAIL tests/bdd/features/scrollSessions.feature (6.049 s)\n",
      timestamp: 1616084178820,
      type: SOCKR_MSG_TYPES.STD_ERR,
    },
    "1616084178824": {
      message: "  Feature: Scroll Sessions\n",
      timestamp: 1616084178824,
      type: SOCKR_MSG_TYPES.STD_ERR,
    },
    "1616084178827": {
      message: "    Scenario: Navigate Forward\n",
      timestamp: 1616084178827,
      type: SOCKR_MSG_TYPES.STD_ERR,
    },
    "1616084178831": {
      message: "      ✕ Given I open the site \"https://simpleviewinc.github.io/keg-test-consumer/\" (5 ms)\n",
      timestamp: 1616084178831,
      type: SOCKR_MSG_TYPES.STD_ERR,
    },
    "1616084178834": {
      message: "      ✕ When I click the element \".ef-sessions-date-button-decrement\" (2 ms)\n",
      timestamp: 1616084178834,
      type: SOCKR_MSG_TYPES.STD_ERR,
    },
    "1616084178837": {
      message: "      ✕ Then the element \".ef-sessions-date-text\" contains the text \"Day 1\" (2 ms)\n\n  ● Feature: Scroll Sessions › Scenario: Navigate Forward › Given I open the site \"https://simpleviewinc.github.io/keg-test-consumer/\"\n\n    TypeError: this.getSteps is not a function\n\n      at Steps.resolve (node_modules/@ltipton/parkin/src/steps.js:200:23)\n      at Object.<anonymous> (node_modules/@ltipton/parkin/src/runner.js:49:25)\n\n  ● Feature: Scroll Sessions › Scenario: Navigate Forward › When I click the element \".ef-sessions-date-button-decrement\"\n\n    TypeError: this.getSteps is not a function\n\n      at Steps.resolve (node_modules/@ltipton/parkin/src/steps.js:200:23)\n      at Object.<anonymous> (node_modules/@ltipton/parkin/src/runner.js:49:25)\n\n  ● Feature: Scroll Sessions › Scenario: Navigate Forward › Then the element \".ef-sessions-date-text\" contains the text \"Day 1\"\n\n    TypeError: this.getSteps is not a function\n\n      at Steps.resolve (node_modules/@ltipton/parkin/src/steps.js:200:23)\n      at Object.<anonymous> (node_modules/@ltipton/parkin/src/runner.js:49:25)\n\n",
      timestamp: 1616084178837,
      type: SOCKR_MSG_TYPES.STD_ERR,
    },
    "1616084178845": {
      message: "Test Suites: 1 failed, 1 total\nTests:       3 failed, 3 total\nSnapshots:   0 total\nTime:        7.154 s\nRan all test suites matching /tests\\/bdd\\/features\\/scrollSessions.feature/i.\n",
      timestamp: 1616084178845,
      type: SOCKR_MSG_TYPES.STD_ERR,
    },
    "1616084179012": {
      message: "error Command failed with exit code 1.\n",
      timestamp: 1616084179012,
      type: SOCKR_MSG_TYPES.STD_ERR,
    },
    "1616084179013": {
      message: "info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.\n",
      timestamp: 1616084179013,
      type: SOCKR_MSG_TYPES.STD_OUT,
    },
    "1616084179020": {
      message: `Finished running command!\n`,
      timestamp: 1616084179020,
      type: SOCKR_MSG_TYPES.CMD_END,
    }
  }
}
