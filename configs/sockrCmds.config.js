const sockrCmds = {
  groups: {
    tests: {
      filters: {},
      commands: {
        feature: {
          description: "Run behavior driven tests with feature files",
          cmd: 'cucumber',
          beforeArgs: [
            'test',
          ],
          afterArgs: [],
          params: [
            {
              name: "name",
              withKey: true,
              description: "Name of the test to be run. If not set, all feature files will be run",
              type: "string",
              required: false,
              value: ""
            },
            {
              name: 'tags',
              withKey: true,
              description: "Use tags from feature files to filter which tests will run",
              type: "string",
              required: false,
              value: ""
            },
            {
              name: "browsers",
              withKey: true,
              description: "Which browsers the tests should be run on",
              type: "array",
              required: false,
              value: [
                'chrome',
                'firefox',
                'webkit',
                'all'
              ]
            }
          ]
        },
        unit: {
          description: "Run unit tests through jest",
          cmd: 'npx',
          beforeArgs: [
            'jest',
            '--detectOpenHandles',
            '--no-cache',
            '--verbose',
            '--config=./configs/jest.config.js'
          ],
          afterArgs: [],
          params: [
          ]
        },
        waypoint: {
          description: "Run waypoint tests using playwright and jest",
          cmd: 'wolf',
          beforeArgs: [
            'run',
          ],
          afterArgs: [],
          params: [
            {
              name: "name",
              withKey: true,
              description: "Name of the test to be run. If not set, all waypoint tests will be run",
              type: "string",
              required: false,
              value: ""
            },
          ]
        }
      }
    }
  }
}

module.exports = {
  sockrCmds
}