# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG KEG_NODE_VERSION
ARG GIT_STAGE_IMAGE_FROM=node:$KEG_NODE_VERSION
FROM $GIT_STAGE_IMAGE_FROM as builder

WORKDIR /

# Set the 
ARG EXPO_CLI_VERSION=${EXPO_CLI_VERSION:-3.22.3}

# Install git and the expo-cli and sharp-cli
RUN apk add --no-cache git; \
    yarn global add expo-cli@$EXPO_CLI_VERSION sharp-cli nodemon npm-run-all

# Path of the app within the docker container
ARG DOC_APP_PATH=${DOC_APP_PATH:-/keg/tap}

ARG EXPO_DEBUG_PORT=${EXPO_DEBUG_PORT:-19002}
ARG DOC_APP_PORT=${DOC_APP_PORT:-19006}

# Copy over the app to a temp directory
COPY . $DOC_APP_PATH

# Install the dependecies with yarn setup, then remove the .npmrc
RUN cd $DOC_APP_PATH; \
    yarn install --ignore-engines; \
    yarn cache clean;

# Install git for the new stage
RUN apk add --no-cache git bash sudo; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME=${KEG_DOCKER_IP:-0.0.0.0}

# Listen to all IPs within the container
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Expose container ports
EXPOSE 80
EXPOSE 443
EXPOSE $DOC_APP_PORT
EXPOSE $EXPO_DEBUG_PORT

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

SHELL [ "/bin/bash" ]

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
