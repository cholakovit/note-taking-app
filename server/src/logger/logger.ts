
import * as log4i from 'log4js'

log4i.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: 'logs/app.log' }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' }
  }
})

const logger = log4i.getLogger()

export default logger


