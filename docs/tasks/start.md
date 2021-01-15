### Start
1. Run Keg-Herkin start task ( `yarn task start` || `keg herkin start` )
   1. Opens a browser on the host machine with Playwright
   2. Obtains a websocket endpoint from the browser
   3. Starts the `Keg-Herkin` docker container
      1. Passes the `websocket endpoint` to the docker container
      2. Uses the `websocket endpoint` to connect to the host machines browser 
   4. Creates a mutagen sync of the host machines `keg-herkin` repo folder
   5. Mounts a `Docker Volume` of a user defined path to test files on the host machine
   6. Executes the test in the mounted `Docker Volume` within the docker container
      1. Can automate the host machine browser, using Playwright
      2. Use Cucumber to execute features and steps definitions
      3. Use jest and expect to ensure test validity
   7. Saves results to host machine via the mounted `Docker Volume`
