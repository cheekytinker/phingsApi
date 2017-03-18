import Logger from 'bunyan';
import fs from 'fs';

const logDir = './log';
if (!fs.existsSync(logDir)){
  fs.mkdirSync(logDir);
}

const log = new Logger({
  name: 'phings-api',
  streams: [
    {
      level: 'info',
      path: `${logDir}/phings-api.log`,
      type: 'rotating-file',
      period: '1d',
    },
  ],
});


export default log;
