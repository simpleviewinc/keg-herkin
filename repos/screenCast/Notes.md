See docs here => https://novnc.com/noVNC/docs/EMBEDDING.html

### TODO
  * Investigate installing only the following items
  ```sh
    apt-get update && apt-get install -y libnss3 libxss1 fonts-wqy-zenhei gettext nginx supervisor novnc tigervnc-standalone-server openssl libxss1 libxtst6 fonts-noto-color-emoji libasound2 libnss3 && apt-get clean && apt-get autoclean
  ```

### WORKING
* **Websockify**
  * Command => `websockify -v --web /usr/share/_novnc 0.0.0.0:26367 0.0.0.0:26370`
  * URL => http://herkin-testing-out-screen-cast.local.keghub.io:26367/vnc_lite.html
* **TigerVNC**
  * Command => `Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbauth /root/.vnc/passwd -rfbport 26370 -alwaysshared :0`
