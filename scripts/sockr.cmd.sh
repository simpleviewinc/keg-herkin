#!/bin/bash

# Prints a message to the terminal through stderr
printMessage(){
  echo "[ SOCKr ] $@" >&2
  return
}

# Ensure the local bash settings get loaded for the machine
sourceRCFile(){

  # Check if the bashfile exists
  local BASHRC_FILE

  # Check for .bash file
  local PROFILE=~/.bash_profile
  local BRC=~/.bashrc
  if [[ -f "$PROFILE" ]]; then
    BASH_FILE="$PROFILE"
  elif [[ -f "$BRC" ]]; then
    BASH_FILE="$BRC"
  fi

  # If there's no bash file, then we know keg-cli's not installed
  # So log an error and exit!
  if [[ -z "$BASH_FILE" ]]; then
    printMessage "Could not load bash profile. Could not find \"~/.bash_profile\" || \"~/.bashrc\""
    exit 1
  else
    # Source the bash file so we have access to the keg-cli
    source $BASH_FILE
  fi

}

# Add the bash settings for the environment
# sourceRCFile

if [[ -z "$DOC_APP_PATH" ]]; then
  export DOC_APP_PATH=/keg/tap
fi

## run the task (ex: bash scripts/sockr.cmd.sh bdd test)
yarn task "$@"
