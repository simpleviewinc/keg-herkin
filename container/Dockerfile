# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG GIT_STAGE_IMAGE_FROM
FROM $GIT_STAGE_IMAGE_FROM as builder

WORKDIR /

# Path of the app within the docker container
ARG DOC_APP_PATH=${DOC_APP_PATH:-/keg/tap}
ARG DOC_APP_PORT=${DOC_APP_PORT:-19006}

# Expose container ports
EXPOSE $DOC_APP_PORT

# Ensure the expo cli version
ARG EXPO_CLI_VERSION=${EXPO_CLI_VERSION:-3.28.0}

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME=${KEG_DOCKER_IP:-0.0.0.0}

# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Copy over the app to a temp directory
COPY . $DOC_APP_PATH

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

SHELL [ "/bin/bash" ]

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
