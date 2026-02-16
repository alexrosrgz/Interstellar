const fs = require('fs');
const buf = fs.readFileSync('public/models/f22_raptor.glb');

// Parse GLB
const jsonLen = buf.readUInt32LE(12);
const binOffset = 20 + jsonLen + 8; // skip JSON chunk + BIN chunk header
const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString());
const bin = buf.slice(binOffset);

function readAccessor(accIdx) {
  const acc = json.accessors[accIdx];
  const bv = json.bufferViews[acc.bufferView];
  const offset = (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const count = acc.count;
  const vals = [];
  for (let i = 0; i < count; i++) {
    const x = bin.readFloatLE(offset + i * 12);
    const y = bin.readFloatLE(offset + i * 12 + 4);
    const z = bin.readFloatLE(offset + i * 12 + 8);
    vals.push([x, y, z]);
  }
  return vals;
}

// For each mesh, compute bounding box from POSITION accessor
json.meshes.forEach((mesh, mi) => {
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  let vtxCount = 0;
  mesh.primitives.forEach(prim => {
    const posAcc = prim.attributes.POSITION;
    const acc = json.accessors[posAcc];
    // Use accessor min/max if available
    if (acc.min && acc.max) {
      minX = Math.min(minX, acc.min[0]);
      minY = Math.min(minY, acc.min[1]);
      minZ = Math.min(minZ, acc.min[2]);
      maxX = Math.max(maxX, acc.max[0]);
      maxY = Math.max(maxY, acc.max[1]);
      maxZ = Math.max(maxZ, acc.max[2]);
    }
    vtxCount += acc.count;
  });
  // Find which node references this mesh
  const node = json.nodes.find(n => n.mesh === mi);
  const nodeName = node ? node.name : '?';
  // Find parent node
  let parentName = '?';
  for (const n of json.nodes) {
    if (n.children && node) {
      const nodeIdx = json.nodes.indexOf(node);
      if (n.children.includes(nodeIdx)) {
        parentName = n.name || '?';
        break;
      }
    }
  }
  const sizeX = (maxX - minX).toFixed(4);
  const sizeY = (maxY - minY).toFixed(4);
  const sizeZ = (maxZ - minZ).toFixed(4);
  console.log(`mesh:${mi} node:"${nodeName}" parent:"${parentName}" vtx:${vtxCount} bbox:[${minX.toFixed(3)},${minY.toFixed(3)},${minZ.toFixed(3)}]->[${maxX.toFixed(3)},${maxY.toFixed(3)},${maxZ.toFixed(3)}] size:[${sizeX},${sizeY},${sizeZ}]`);
});
