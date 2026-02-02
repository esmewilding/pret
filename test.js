import getTimeBtwn from './js.js';
import test from 'node:test';
import assert from 'node:assert/strict';

test('get time between', async () => {
    let stime = new Date(1970, 0, 1, 5, 30);
    let etime = new Date(1970, 0, 1, 6, 30);
    assert.equal(getTimeBtwn(stime,etime),60);
}); 