#!/usr/bin/env

# Ensure required envs are set
[[ -z "$KEG_PROXY_PORT" ]] && KEG_PROXY_PORT=19006
[[ -z "$DOC_APP_PATH" ]] && DOC_APP_PATH=/keg/tap
[[ -z "$DOC_BUILD_PATH" ]] && DOC_BUILD_PATH=/keg/tap-build

# If the no KEG_DOCKER_EXEC env is set, just sleep forever
# This is to keep our container running forever
[[ -z "$KEG_DOCKER_EXEC" ]] && tail -f /dev/null && exit 0;

# Starts the screen cast servers when not using a websocket from the hostmachine
keg_start_screen_cast(){
  cd $DOC_APP_PATH
  # TODO: Move this to the Dockerfile,
  # Or come up with a better way to overwrite the file
  # Maybe able to use the novnc node_moduel, and set the --web path when starting the noview websockify server
  if [[ -f "/keg/tap/repos/screencast/src/vnc/novnc/vnc_auto.html" ]]; then
    if [[ -f "/usr/share/novnc/vnc_auto.html" ]]; then
      rm -rf /usr/share/novnc/vnc_auto.html
    fi
    rm -rf /usr/share/novnc/vnc_auto.html; cp /keg/tap/repos/screencast/src/vnc/novnc/vnc_auto.html /usr/share/novnc/vnc_auto.html
  fi
  
  yarn sc:daemon
}

# Serve the bundle and also run the backend api
keg_herkin_serve(){
  cd $DOC_APP_PATH
  npx serve $DOC_BUILD_PATH --cors -n -l $KEG_PROXY_PORT &>/dev/null & disown;
  node ./repos/backend/index.js
  exit 0
}

# Check if the vnc screen-cast servers should be started
[[ "$HERKIN_USE_VNC" == "true" ]] && keg_start_screen_cast

# Check the NODE_ENV, and use that to know which environment to start
# For non-development environments, we want to serve the bundle if it exists
if [[ ! " development develop local test " =~ " $NODE_ENV " ]]; then
  [[ -d "$DOC_BUILD_PATH" ]] && keg_herkin_serve
  echo $"[ KEG-CLI ] Serve path $DOC_BUILD_PATH does not exist!" >&2
fi

# Serve the app bundle in development environemnts
echo $"[ KEG-CLI ] Running development server!" >&2
cd $DOC_APP_PATH
[[ -z "$KEG_EXEC_CMD" ]] && yarn web || yarn $KEG_EXEC_CMD
