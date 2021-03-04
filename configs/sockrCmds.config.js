const sockrCmds = {
  groups: {
    default: {
      filters: {},
      commands: {
        bbd: {
          group: "default",
          // icon: "example-icon",
          description: "Run behavior driven tests",
          cmd: "npx",
          beforeArgs: [ 'npx', 'jest', '--detectOpenHandles' ],
          afterArgs: [],
          params: [
            {
              name: "name",
              withKey: true,
              description: "Name of the test to be run",
              type: "string",
              required: false,
              value: ""
            }
          ]
        }
      }
    }
  }
}

module.exports = {
  sockrCmds
}