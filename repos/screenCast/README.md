# ScreenCast
* Sets up a VNC and NoVnc servers within the docker container
* Allows accessing the GUI from within the docker container
* See docs for more information
  * [TigerVNC](https://tigervnc.org/)
  * [Websockify](https://github.com/novnc/websockify)
  * [NoVNC](https://novnc.com/noVNC/docs/EMBEDDING.html)

### Setup
* All the setup commands are run during the `docker build`
  * They should not have to be run manually
* **Steps**
  * Install tigervnc and novnc
    ```sh
      apt-get update && apt-get install -y novnc tigervnc-standalone-server
    ```
  * Install Chrome and Firefox browsers
    ```sh
      npx playwright install chrome
      npx playwright install firefox
    ```
  * Install node_modules from keg-herkin root directory
    ```sh
      yarn install
    ```

### Run
* The main exported method is `screencast`, and be used like this
  ```js
    const { screencast } = require('path/to/screencCast')
    await screencast({ ...options })
  ```
* This will start the `VNC` and `WebSockify` servers with the default settings
  * The default settings should would for most use cases, but can be overwritten when needed
* **IMPORTANT** - Both servers are started with `detached` mode
  * This means even if the parent node.js process is killed, both servers will continue to run
  * This is intended, and allows calling screencast once, then forgetting about it
  * Helper methods are also exported, to allow killing the servers, either together or individually

* **Websockify**
  * Command => `websockify -v --web /usr/share/novnc 0.0.0.0:26369 0.0.0.0:26370`
  * Example URL => http://herkin-develop.local.keghub.io:26369/vnc_lite.html
  * Example URL => http://herkin--develop.local.keghub.io:26369/novnc
* **TigerVNC**
  * Command => `Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbauth /root/.vnc/passwd -rfbport 26370 -alwaysshared :0`
