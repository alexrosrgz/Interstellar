const fs = require('fs');
const buf = fs.readFileSync('public/models/f22_raptor.glb');
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString());
json.nodes.forEach((n, i) => {
  const meshStr = n.mesh != null ? 'mesh:' + n.mesh : '';
  const childStr = n.children ? 'children:' + JSON.stringify(n.children) : '';
  console.log(i, n.name || '(unnamed)', meshStr, childStr);
});
