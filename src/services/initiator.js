/**
 * @description used to store the current action creator information
 * @author EmmsDan
 * @version 0.2
 */
class InitiatorService {
  constructor(initiator) {
    this.__initiator = initiator;
    // eslint-disable-next-line
    console.log(
      '\n →→  \x1b[43m\x1b[31m Initiator Instance Initialized...\x1b[40m\x1b[39m ←←\n');
  }
  set(initiator) {
    this.__initiator = initiator;
  }

  get() {
    return this.__initiator;
  }
}

export default new InitiatorService(null);
