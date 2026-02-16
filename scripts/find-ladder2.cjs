const fs = require('fs');
const buf = fs.readFileSync('public/models/f22_raptor.glb');
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString());

// Print top-level children of the scene root with their transforms
const sceneRoot = json.nodes[2]; // GLTF_SceneRootNode
sceneRoot.children.forEach(ci => {
  const node = json.nodes[ci];
  const t = node.translation ? `t:[${node.translation.map(v => v.toFixed(3))}]` : '';
  const r = node.rotation ? `r:[${node.rotation.map(v => v.toFixed(3))}]` : '';
  const s = node.scale ? `s:[${node.scale.map(v => v.toFixed(3))}]` : '';
  const kids = node.children ? node.children.length + ' children' : 'leaf';
  console.log(`node:${ci} "${node.name}" ${t} ${r} ${s} (${kids})`);
});
