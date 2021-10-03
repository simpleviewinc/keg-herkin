See docs here => https://novnc.com/noVNC/docs/EMBEDDING.html

### Setup
  ```sh
    apt-get update && apt-get install -y novnc tigervnc-standalone-server
  ```

### Run
* **Websockify**
  * Command => `websockify -v --web /usr/share/novnc 0.0.0.0:26369 0.0.0.0:26370`
  * URL => http://herkin-screen-cast.local.keghub.io:26369/vnc_lite.html
  * URL => http://herkin-screen-cast.local.keghub.io:26369/novnc
* **TigerVNC**
  * Command => `Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbauth /root/.vnc/passwd -rfbport 26370 -alwaysshared :0`
