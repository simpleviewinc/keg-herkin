
# Path of the tap within the docker container
ARG DOC_APP_PATH=/keg/tap
ARG GIT_APP_URL=https://github.com/simpleviewinc/keg-herkin.git
ARG GIT_APP_BRANCH=master
ARG PLAYWRIGHT_IMAGE_FROM=mcr.microsoft.com/playwright:bionic
# Flag to copy over the taps local folder instead of pulling from git
ARG KEG_COPY_LOCAL

# Add a FROM for the tap-base image to we can copy content from it
ARG KEG_BASE_IMAGE=ghcr.io/simpleviewinc/tap:develop
FROM $KEG_BASE_IMAGE as tap-base

# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
FROM $PLAYWRIGHT_IMAGE_FROM as builder

# Path of the tap within the docker container
ARG DOC_APP_PATH=/keg/tap
# Port the app is running on
ARG KEG_PROXY_PORT=19006

# Add the path and port args as envs
ENV DOC_APP_PATH=$DOC_APP_PATH
ENV KEG_PROXY_PORT=$KEG_PROXY_PORT

# Expose container ports
EXPOSE $KEG_PROXY_PORT

# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Copy over the app to a temp directory
COPY --from=tap-base /usr/local/share/.config/yarn /usr/local/share/.config/yarn
COPY --from=tap-base /keg/. /keg/

# Install the dependecies with yarn setup, then remove the .npmrc
RUN yarn global add npm-run-all; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

ENV DEBIAN_FRONTEND=noninteractive

ENV DISPLAY=:0.0 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=C.UTF-8

RUN apt-get update && apt-get install -y curl gnupg2 && \
    curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list


# TODO: investigate which of these libs are not required
RUN apt-get update -y && apt-get install -y --no-install-recommends --allow-unauthenticated \
    net-tools \
    libwoff1 \
    libopus0 \
    libwebp6 \
    libwebpdemux2 \
    libenchant1c2a \
    libgudev-1.0-0 \
    libsecret-1-0 \
    libhyphen0 \
    libgdk-pixbuf2.0-0 \
    libegl1 \
    libnotify4 \
    libxslt1.1 \
    # libevent-2.1-7 \
    libgles2 \
    libxcomposite1 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libepoxy0 \
    libgtk-3-0 \
    libharfbuzz-icu0 \
    # support video playback in WebKit
    libgstreamer-gl1.0-0 \
    libgstreamer-plugins-bad1.0-0 \
    gstreamer1.0-plugins-good \
    gstreamer1.0-libav \
    # chrome
    google-chrome-stable \
    # chromium
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-noto-color-emoji \
    fonts-wqy-zenhei \
    libxtst6 \
    # firefox
    libdbus-glib-1-2 \
    libxt6 \
    # nginx
    # gettext \
    # nginx \
    # server
    # supervisor \
    # vnc
    novnc \
    tigervnc-standalone-server \
    tigenvnc-common \
    # ffmpeg
    ffmpeg \
    # ssl
    openssl && \
    apt-get clean && \
    apt-get autoclean

#  xvfb libnss3 fonts-wqy-zenhei gettext nginx supervisor novnc tigervnc-standalone-server openssl libxss1 libxtst6 fonts-noto-color-emoji libasound2 libnss3 && apt-get clean && apt-get autoclean

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
