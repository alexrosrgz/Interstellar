/**
 * Generate a minimal valid GLB (glTF 2.0 Binary) file
 * containing a low-poly airplane shape suitable for CesiumJS.
 *
 * CesiumJS expects: Y-up coordinate system (glTF spec default)
 * Plane nose faces +Z in geometry, rotated to +X via node quaternion
 * so CesiumJS axis correction places it along North (forward).
 */

import { writeFileSync } from "fs";

const OUTPUT = "/Users/alerr415/Project/Interstellar/public/models/plane.glb";

function faceNormal(a, b, c) {
  const u = [b[0]-a[0], b[1]-a[1], b[2]-a[2]];
  const v = [c[0]-a[0], c[1]-a[1], c[2]-a[2]];
  const n = [
    u[1]*v[2] - u[2]*v[1],
    u[2]*v[0] - u[0]*v[2],
    u[0]*v[1] - u[1]*v[0],
  ];
  const len = Math.sqrt(n[0]*n[0] + n[1]*n[1] + n[2]*n[2]) || 1;
  return [n[0]/len, n[1]/len, n[2]/len];
}

function buildFlatGeometry(verts, tris) {
  const positions = [];
  const normals = [];
  const indices = [];
  let idx = 0;
  for (const [ai, bi, ci] of tris) {
    const a = verts[ai], b = verts[bi], c = verts[ci];
    const n = faceNormal(a, b, c);
    positions.push(...a, ...b, ...c);
    normals.push(...n, ...n, ...n);
    indices.push(idx, idx+1, idx+2);
    idx += 3;
  }
  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices),
  };
}

// Fuselage: elongated diamond/cylinder approximation
function fuselageGeometry() {
  const r = 0.3;
  const nose = 3.0;   // +Z forward in geometry (rotated to +X by node quaternion)
  const tail = -3.0;
  const verts = [
    [0, 0, nose],         // 0: nose tip
    [0, r, tail],         // 1: tail top
    [r, 0, tail],         // 2: tail right
    [0, -r, tail],        // 3: tail bottom
    [-r, 0, tail],        // 4: tail left
    [0, r*1.2, 0],        // 5: mid top
    [r*1.2, 0, 0],        // 6: mid right
    [0, -r*0.9, 0],       // 7: mid bottom
    [-r*1.2, 0, 0],       // 8: mid left
  ];
  const tris = [
    // Nose to mid
    [0,6,5], [0,7,6], [0,8,7], [0,5,8],
    // Mid to tail
    [5,6,2], [5,2,1], [6,7,3], [6,3,2],
    [7,8,4], [7,4,3], [8,5,1], [8,1,4],
    // Tail cap
    [1,2,3], [1,3,4],
  ];
  return buildFlatGeometry(verts, tris);
}

// Main wings
function wingsGeometry() {
  const span = 3.5, chord = 1.2, y = 0.0, z = 0.2, thick = 0.05;
  const verts = [
    // Right wing (top face then bottom)
    [0.2, y+thick, z-chord/2], [span, y+thick, z-chord/4],
    [span, y+thick, z+chord/4], [0.2, y+thick, z+chord/2],
    [0.2, y-thick, z-chord/2], [span, y-thick, z-chord/4],
    [span, y-thick, z+chord/4], [0.2, y-thick, z+chord/2],
    // Left wing
    [-0.2, y+thick, z-chord/2], [-span, y+thick, z-chord/4],
    [-span, y+thick, z+chord/4], [-0.2, y+thick, z+chord/2],
    [-0.2, y-thick, z-chord/2], [-span, y-thick, z+chord/4],
    [-span, y-thick, z+chord/4], [-0.2, y-thick, z+chord/2],
  ];
  const tris = [
    // Right wing
    [0,1,2], [0,2,3], [4,6,5], [4,7,6],
    [0,5,1], [0,4,5], [3,2,6], [3,6,7],
    [1,5,6], [1,6,2], [0,3,7], [0,7,4],
    // Left wing
    [8,10,9], [8,11,10], [12,13,14], [12,14,15],
    [8,9,13], [8,13,12], [11,14,10], [11,15,14],
    [9,14,13], [9,10,14], [8,12,15], [8,15,11],
  ];
  return buildFlatGeometry(verts, tris);
}

// Vertical tail fin
function tailFinGeometry() {
  const thick = 0.03;
  const verts = [
    [thick, 0.0, -2.2], [thick, 0.0, -3.0], [thick, 1.0, -3.0],
    [-thick, 0.0, -2.2], [-thick, 0.0, -3.0], [-thick, 1.0, -3.0],
  ];
  const tris = [
    [0,1,2], [3,5,4],
    [0,2,5], [0,5,3], [1,4,5], [1,5,2], [0,3,4], [0,4,1],
  ];
  return buildFlatGeometry(verts, tris);
}

// Horizontal stabilizer
function hStabGeometry() {
  const span = 1.0, chord = 0.5, y = 0.0, z = -2.5, thick = 0.03;
  const verts = [
    [-span, y+thick, z+chord/2], [span, y+thick, z+chord/2],
    [span, y+thick, z-chord/2], [-span, y+thick, z-chord/2],
    [-span, y-thick, z+chord/2], [span, y-thick, z+chord/2],
    [span, y-thick, z-chord/2], [-span, y-thick, z-chord/2],
  ];
  const tris = [
    [0,1,2], [0,2,3], [4,6,5], [4,7,6],
    [0,5,1], [0,4,5], [3,2,6], [3,6,7],
    [1,5,6], [1,6,2], [0,3,7], [0,7,4],
  ];
  return buildFlatGeometry(verts, tris);
}

function mergeGeometries(geos) {
  let totalPos = 0, totalIdx = 0;
  for (const g of geos) { totalPos += g.positions.length; totalIdx += g.indices.length; }
  const positions = new Float32Array(totalPos);
  const normals = new Float32Array(totalPos);
  const indices = new Uint16Array(totalIdx);
  let posOff = 0, idxOff = 0, vertOff = 0;
  for (const g of geos) {
    positions.set(g.positions, posOff);
    normals.set(g.normals, posOff);
    for (let i = 0; i < g.indices.length; i++) indices[idxOff+i] = g.indices[i] + vertOff;
    posOff += g.positions.length;
    idxOff += g.indices.length;
    vertOff += g.positions.length / 3;
  }
  return { positions, normals, indices };
}

function buildGLB(geometry) {
  const { positions, normals, indices } = geometry;
  const vertexCount = positions.length / 3;
  const indexCount = indices.length;

  let minX=Infinity, minY=Infinity, minZ=Infinity;
  let maxX=-Infinity, maxY=-Infinity, maxZ=-Infinity;
  for (let i = 0; i < vertexCount; i++) {
    const x=positions[i*3], y=positions[i*3+1], z=positions[i*3+2];
    if(x<minX) minX=x; if(x>maxX) maxX=x;
    if(y<minY) minY=y; if(y>maxY) maxY=y;
    if(z<minZ) minZ=z; if(z>maxZ) maxZ=z;
  }

  const indicesByteLength = indexCount * 2;
  const indicesPadding = (4 - (indicesByteLength % 4)) % 4;
  const positionsByteLength = positions.byteLength;
  const normalsByteLength = normals.byteLength;
  const indicesOffset = 0;
  const positionsOffset = indicesByteLength + indicesPadding;
  const normalsOffset = positionsOffset + positionsByteLength;
  const totalBinLength = normalsOffset + normalsByteLength;

  const binBuffer = new ArrayBuffer(totalBinLength);
  const binView = new DataView(binBuffer);
  for (let i = 0; i < indexCount; i++) binView.setUint16(indicesOffset + i*2, indices[i], true);
  for (let i = 0; i < positions.length; i++) binView.setFloat32(positionsOffset + i*4, positions[i], true);
  for (let i = 0; i < normals.length; i++) binView.setFloat32(normalsOffset + i*4, normals[i], true);

  const gltf = {
    asset: { version: "2.0", generator: "interstellar-plane-gen" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: "Airplane", rotation: [0, 0.7071067811865476, 0, 0.7071067811865476] }],
    meshes: [{ primitives: [{ attributes: { POSITION: 1, NORMAL: 2 }, indices: 0, material: 0 }] }],
    materials: [{
      pbrMetallicRoughness: {
        baseColorFactor: [0.75, 0.78, 0.82, 1.0],
        metallicFactor: 0.4,
        roughnessFactor: 0.5,
      },
      name: "PlaneMaterial",
    }],
    accessors: [
      { bufferView: 0, byteOffset: 0, componentType: 5123, count: indexCount, type: "SCALAR", max: [vertexCount-1], min: [0] },
      { bufferView: 1, byteOffset: 0, componentType: 5126, count: vertexCount, type: "VEC3", max: [maxX,maxY,maxZ], min: [minX,minY,minZ] },
      { bufferView: 2, byteOffset: 0, componentType: 5126, count: vertexCount, type: "VEC3" },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: indicesOffset, byteLength: indicesByteLength, target: 34963 },
      { buffer: 0, byteOffset: positionsOffset, byteLength: positionsByteLength, byteStride: 12, target: 34962 },
      { buffer: 0, byteOffset: normalsOffset, byteLength: normalsByteLength, byteStride: 12, target: 34962 },
    ],
    buffers: [{ byteLength: totalBinLength }],
  };

  let jsonStr = JSON.stringify(gltf);
  while (jsonStr.length % 4 !== 0) jsonStr += " ";
  const jsonEncoder = new TextEncoder();
  const jsonBytes = jsonEncoder.encode(jsonStr);

  const binPadding = (4 - (totalBinLength % 4)) % 4;
  const paddedBinLength = totalBinLength + binPadding;
  const totalLength = 12 + 8 + jsonBytes.length + 8 + paddedBinLength;

  const glb = new ArrayBuffer(totalLength);
  const glbView = new DataView(glb);
  const glbUint8 = new Uint8Array(glb);
  let offset = 0;

  // Header
  glbView.setUint32(offset, 0x46546C67, true); offset += 4; // magic
  glbView.setUint32(offset, 2, true); offset += 4;           // version
  glbView.setUint32(offset, totalLength, true); offset += 4;  // total length

  // JSON chunk
  glbView.setUint32(offset, jsonBytes.length, true); offset += 4;
  glbView.setUint32(offset, 0x4E4F534A, true); offset += 4;
  glbUint8.set(jsonBytes, offset); offset += jsonBytes.length;

  // Binary chunk
  glbView.setUint32(offset, paddedBinLength, true); offset += 4;
  glbView.setUint32(offset, 0x004E4942, true); offset += 4;
  glbUint8.set(new Uint8Array(binBuffer), offset);

  return Buffer.from(glb);
}

// Build and write
const parts = [fuselageGeometry(), wingsGeometry(), tailFinGeometry(), hStabGeometry()];
const merged = mergeGeometries(parts);
const glbBuffer = buildGLB(merged);
writeFileSync(OUTPUT, glbBuffer);

console.log("GLB written to " + OUTPUT);
console.log("  Vertices: " + (merged.positions.length / 3));
console.log("  Triangles: " + (merged.indices.length / 3));
console.log("  File size: " + glbBuffer.length + " bytes");
