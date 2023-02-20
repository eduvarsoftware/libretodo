const timeStampedLog = (...args) => console.log(`[${new Date().getTime()}]`, ...args)

module.exports = timeStampedLog;