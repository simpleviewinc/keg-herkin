const { execSync } = require('child_process')
const env = process.env.NODE_ENV || 'local'

module.exports.getKegHerkinUrl = () => {
  let branchName
  try {
    branchName = execSync(`git -C ${__dirname} branch --show-current`)
      .toString()
      .trim()
  }
  catch (err) {
    console.log(err.stack)
    branchName = 'master'
  }
  
  return `http://herkin-${branchName}.${env}.kegdev.xyz`
}