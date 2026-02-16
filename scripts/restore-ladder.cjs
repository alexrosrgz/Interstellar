const fs = require('fs');
const path = 'public/models/f22_raptor.glb';
const buf = fs.readFileSync(path);

const jsonLen = buf.readUInt32LE(12);
const jsonStr = buf.slice(20, 20 + jsonLen).toString();
const json = JSON.parse(jsonStr);

// Re-add node 88 (Circle_47) back into scene root children in sorted position
const sceneRoot = json.nodes[2];
if (!sceneRoot.children.includes(88)) {
  // Insert 88 after 86 (where it originally was)
  const idx86 = sceneRoot.children.indexOf(86);
  sceneRoot.children.splice(idx86 + 1, 0, 88);
  console.log('Restored node 88 (Circle_47) to scene root');
} else {
  console.log('Node 88 already present');
}

const newJsonStr = JSON.stringify(json);
const jsonPadded = newJsonStr + ' '.repeat((4 - (newJsonStr.length % 4)) % 4);
const jsonBuf = Buffer.from(jsonPadded, 'utf8');

const binChunkHeaderOffset = 20 + jsonLen;
const binLen = buf.readUInt32LE(binChunkHeaderOffset);
const binData = buf.slice(binChunkHeaderOffset + 8, binChunkHeaderOffset + 8 + binLen);

const totalLen = 12 + 8 + jsonBuf.length + 8 + binData.length;
const out = Buffer.alloc(totalLen);
out.writeUInt32LE(0x46546C67, 0);
out.writeUInt32LE(2, 4);
out.writeUInt32LE(totalLen, 8);
out.writeUInt32LE(jsonBuf.length, 12);
out.writeUInt32LE(0x4E4F534A, 16);
jsonBuf.copy(out, 20);
const binStart = 20 + jsonBuf.length;
out.writeUInt32LE(binData.length, binStart);
out.writeUInt32LE(0x004E4942, binStart + 4);
binData.copy(out, binStart + 8);

fs.writeFileSync(path, out);
console.log('Wrote', totalLen, 'bytes');
