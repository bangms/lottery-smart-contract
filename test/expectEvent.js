const assert = require('chai').assert;

// inLogs에 아까 찍은 receipt의 logs에 있는 array에서 event를 가져와서 BET이 맞는지 확인
const inLogs = async (logs, eventName) => {
    const event = logs.find(e => e.event === eventName);
    assert.exists(event);
}

module.exports = {
    inLogs
}
