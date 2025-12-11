// CRC32 helper shared by CI tools
const makeCrcTable = () => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
};
const CRC_TABLE = makeCrcTable();

export const crc32 = async (buf: Buffer | Uint8Array) => {
  let crc = 0xffffffff >>> 0;
  for (let i = 0; i < buf.length; i++) {
    const b = (buf as Uint8Array)[i] as number;
    const idx = (crc ^ b) & 0xff;
    const tableVal = CRC_TABLE[idx] as number;
    crc = (crc >>> 8) ^ tableVal;
  }
  return (crc ^ 0xffffffff) >>> 0;
};

export default crc32;
