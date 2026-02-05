import  { convert2jsDate, getTimeBtwn, calculateProductivity } from './js.js';
import test from 'node:test';
import assert from 'node:assert/strict';

test('convert time', async () => {
    let testDate = new Date(1970, 0, 1, 5, 30);
    assert.equal(convert2jsDate("5:30").getTime(), testDate.getTime());
});

test('get time between', async () => {
    let stime = convert2jsDate("5:30");
    let etime = convert2jsDate("6:30");
    assert.equal(getTimeBtwn(stime,etime),60);

    let pauseStart = convert2jsDate("6:05");
    let restime = convert2jsDate("6:10");
    assert.equal(getTimeBtwn(stime,etime,pauseStart,restime),55);

    etime = convert2jsDate("00:30");
    assert.equal(getTimeBtwn(stime,etime),1140);
});

test('calculate productivity', async () => {
    assert.equal(calculateProductivity(60,60),100);
    assert.equal(calculateProductivity(30,60),200);
});
