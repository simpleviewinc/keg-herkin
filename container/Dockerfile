# Path of the tap within the docker container
ARG DOC_APP_PATH=/keg/tap
ARG GIT_APP_URL=https://github.com/simpleviewinc/keg-herkin.git
ARG GIT_APP_BRANCH=master
ARG PLAYWRIGHT_IMAGE_FROM=mcr.microsoft.com/playwright:bionic

# Add a FROM for the tap-base image to we can copy content from it
ARG KEG_BASE_IMAGE=ghcr.io/simpleviewinc/tap:master
FROM $KEG_BASE_IMAGE as tap-base

# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
FROM $PLAYWRIGHT_IMAGE_FROM as builder

WORKDIR /

# Path of the app within the docker container
ENV DOC_APP_PATH=$DOC_APP_PATH
ENV GIT_APP_URL=$GIT_APP_URL
ENV GIT_APP_BRANCH=$GIT_APP_BRANCH

# Port the app is running on
ARG DOC_APP_PORT=${DOC_APP_PORT:-19006}

# Expose container ports
EXPOSE $DOC_APP_PORT

# Ensure the expo cli version
ARG EXPO_CLI_VERSION=${EXPO_CLI_VERSION:-3.28.0}

# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Copy over the app to a temp directory
COPY --from=tap-base /usr/local/share/.config/yarn /usr/local/share/.config/yarn
COPY --from=tap-base /keg/. /keg/

# Install the dependecies with yarn setup, then remove the .npmrc
# Install git and the expo-cli and sharp-cli
RUN apt-get install -y git bash sudo; \
    yarn global add expo-cli@$EXPO_CLI_VERSION sharp-cli nodemon npm-run-all; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd; \
    cd $DOC_APP_PATH; \
    yarn install --ignore-engines; \
    yarn cache clean; \
    cd $DOC_APP_PATH/repos/messenger; \
    yarn install --ignore-engines; \
    yarn cache clean; \
    cd $DOC_APP_PATH/repos/client-example; \
    yarn install --ignore-engines; \
    yarn cache clean

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
