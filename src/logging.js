import Logger from 'bunyan';

const log = new Logger({
  name: 'phings-api',
  streams: [
    {
      level: 'info',
      path: './log/phings-api.log',
      type: 'rotating-file',
      period: '1d',
    },
  ],
});

export default log;
