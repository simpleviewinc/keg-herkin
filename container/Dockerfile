
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

ENV DOC_APP_PATH=$DOC_APP_PATH \
    DEBUG=pw:api* \
    HOME=/root \
    KEG_PROXY_PORT=$KEG_PROXY_PORT \
    PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin \
    DEBIAN_FRONTEND=noninteractive \
    DISPLAY=:0.0 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    LC_ALL=C.UTF-8

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

# Copy over the app to a temp directory
COPY --from=tap-base /usr/local/share/.config/yarn /usr/local/share/.config/yarn
COPY --from=tap-base /keg/. /keg/

# Install the dependecies with yarn setup, then remove the .npmrc
RUN yarn global add npm-run-all; \
    npx playwright install chrome; \
    npx playwright install firefox; \
    apt-get update && apt-get install -y --no-install-recommends \
    novnc \
    tigervnc-standalone-server; \
    apt-get clean && \
    apt-get autoclean; \
    rm -rf /var/cache/apk/*; \
    echo fs.inotify.max_user_watches=1048576 | tee -a /etc/sysctl.conf; \
    sysctl -p; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd

# Expose container ports
EXPOSE $KEG_PROXY_PORT

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
