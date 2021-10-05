const sockrCmds = {
  groups: {
    tests: {
      filters: {},
      commands: {
        feature: {
          description: "Run behavior driven tests with feature files",
          cmd: 'bdd',
          beforeArgs: [
            'test',
          ],
          afterArgs: [],
          params: [
            {
              name: "context",
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
          cmd: 'unit',
          beforeArgs: [
            'test',
          ],
          afterArgs: [],
          params: [
            {
              name: "context",
              withKey: true,
              description: "Name of the unit test to be run. If not set, all unit tests will be run",
              type: "string",
              required: false,
              value: ""
            },
          ]
        },
        waypoint: {
          description: "Run waypoint tests using playwright and jest",
          cmd: 'waypoint',
          beforeArgs: [
            'run',
          ],
          afterArgs: [],
          params: [
            {
              name: "context",
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