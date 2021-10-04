# ScreenCast
* Sets up a VNC and NoVnc servers within the docker container
* Allows accessing the GUI from within the docker container
* See docs for more information
  * [TigerVNC](https://tigervnc.org/)
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

### Run
* **Websockify**
  * Command => `websockify -v --web /usr/share/novnc 0.0.0.0:26369 0.0.0.0:26370`
  * Example URL => http://herkin-develop.local.keghub.io:26369/vnc_lite.html
  * Example URL => http://herkin--develop.local.keghub.io:26369/novnc
* **TigerVNC**
  * Command => `Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbauth /root/.vnc/passwd -rfbport 26370 -alwaysshared :0`
