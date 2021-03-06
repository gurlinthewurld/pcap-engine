// Copyright (c) 2017 NetBlocks Project <https://netblocks.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const assert = require('assert');
const _ = require('lodash');

function splitPackets (buf) {
  var packets = [];

  // NOTE: All buffers currently refernce the original data.
  while (buf.length) {
    var incl_len = buf.readUInt32LE(8);
    var len = 16+incl_len;
    var packet = buf.slice(0, len);
    packets.push(packet);
    buf = buf.slice(len);
  }

  return packets;
}

function parseTimestamp (buf) {
  var ts_sec = buf.readUInt32LE(0);
  var ts_usec = buf.readUInt32LE(4);
  return new Date(ts_sec * 1000 + ts_usec / 1000);
}

module.exports.splitPackets = splitPackets;
module.exports.parseTimestamp = parseTimestamp;
