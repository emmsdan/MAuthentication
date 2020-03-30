const EventEmitter = require('events');
const fs = require('fs');

class BLogger extends EventEmitter {
  constructor(dir='../logs') {
    super();
    // create today/month folder
    this.__path  = `${__dirname}/${dir}/${this.date().year}-${this.date().month}`;
    fs.mkdir(this.__path, function(err) {
      if (err) {
        if (err.code == 'EEXIST') return;
        // ignore the error if the folder already exists
        else console.error (err); // something else went wrong
        return;
      }
    });
  }
  use (error, req, res, next) {
    if(error) {
      this.log(error, 'app');
    }
    req.logger = this;
    next();
  }
  date(){
    const date = new Date();
    return {
      now: date.getTime(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      format: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      full: date
    };
  }
  name(){
    return this.timeStamp().date + '_bLogger';
  }
  log(message, type='error') {
    this.emit(this.name, message);
    this.writeToFile(message, type);
  }
  writeToFile(error, type){
    // const
    const extention = 'blog';
    const fname = process.argv[1];
    // console.log(, this)
    const filename = `${this.__path}/${this.date().format}-@${fname.split('/').join(':')}.${extention}`;
    const { parent: { line } } = error;
    const msg = this.createLogSchema({
      message: error, filename: fname, line, type: type || 'error'
    });
    // if(!fs.stats.isDirectory())
    fs.appendFile(filename, msg, function (err) {
      if (err) throw err;
      // eslint-disable-next-line
      console.error('Saved log to ', filename);
      if (type === 'unhandledRejection') process.exit(1);
      // if (type === 'uncaughtException') process.exit(2);
    });
  }
  createLogSchema({message, filename, line, type}) {
    return `/**
 * @id- ${this.date().now}
 * @line- ${line}
 * @type- ${type}
 * @datetime- ${this.date().full}
 * @filename- ${filename}
 * @description- ${message}
 **/`;
  }
}

module.exports = BLogger;
