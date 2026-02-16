const fs = require('fs');
const path = 'public/models/f22_raptor.glb';
const buf = fs.readFileSync(path);

// Parse GLB header
const magic = buf.readUInt32LE(0);
const version = buf.readUInt32LE(4);
const jsonLen = buf.readUInt32LE(12);
const jsonStr = buf.slice(20, 20 + jsonLen).toString();
const json = JSON.parse(jsonStr);

// Remove node 88 (Circle_47 — the boarding ladder) from its parent's children list
const sceneRoot = json.nodes[2]; // GLTF_SceneRootNode
const ladderNodeIdx = 88;
const idx = sceneRoot.children.indexOf(ladderNodeIdx);
if (idx === -1) {
  console.error('Ladder node not found in scene root children');
  process.exit(1);
}
sceneRoot.children.splice(idx, 1);
console.log('Removed node', ladderNodeIdx, '(' + json.nodes[ladderNodeIdx].name + ') from scene root');

// Re-serialize GLB
const newJsonStr = JSON.stringify(json);
// JSON chunk must be padded to 4-byte alignment with spaces
const jsonPadded = newJsonStr + ' '.repeat((4 - (newJsonStr.length % 4)) % 4);
const jsonBuf = Buffer.from(jsonPadded, 'utf8');

// BIN chunk starts after JSON chunk
const binChunkHeaderOffset = 20 + jsonLen;
const binLen = buf.readUInt32LE(binChunkHeaderOffset);
const binData = buf.slice(binChunkHeaderOffset + 8, binChunkHeaderOffset + 8 + binLen);

// Build new GLB
const totalLen = 12 + 8 + jsonBuf.length + 8 + binData.length;
const out = Buffer.alloc(totalLen);
out.writeUInt32LE(0x46546C67, 0); // magic "glTF"
out.writeUInt32LE(2, 4);           // version
out.writeUInt32LE(totalLen, 8);    // total length
// JSON chunk
out.writeUInt32LE(jsonBuf.length, 12);
out.writeUInt32LE(0x4E4F534A, 16); // "JSON"
jsonBuf.copy(out, 20);
// BIN chunk
const binStart = 20 + jsonBuf.length;
out.writeUInt32LE(binData.length, binStart);
out.writeUInt32LE(0x004E4942, binStart + 4); // "BIN\0"
binData.copy(out, binStart + 8);

fs.writeFileSync(path, out);
console.log('Wrote', totalLen, 'bytes to', path);
