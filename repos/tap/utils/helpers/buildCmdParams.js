
const buildFeatureParams = (command, activeFile) => {
  return [
    `context=${activeFile.location}`,
    `slowMo=5`,
  ]
}

const buildWaypointParams = (command, activeFile) => {
  return [
    `context=${activeFile.location}`,
  ]
}


export const buildCmdParams = (command, activeFile) => {
  switch(activeFile.fileType){
    case 'feature':
      return buildFeatureParams(command, activeFile)
    case 'unit':
      return []
    case 'waypoint':
      return buildWaypointParams(command, activeFile)
  }
}