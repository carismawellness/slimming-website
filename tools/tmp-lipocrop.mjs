// Crop regions from a tall screenshot: node tools/tmp-lipocrop.mjs <in.png> <out.png> <y> <h> [x] [w]
import sharp from 'sharp';
const [inF, outF, y, h, x = '0', w = '1440'] = process.argv.slice(2);
const img = sharp(inF);
const meta = await img.metadata();
const top = Math.min(parseInt(y), meta.height - 10);
const height = Math.min(parseInt(h), meta.height - top);
await img.extract({ left: parseInt(x), top, width: Math.min(parseInt(w), meta.width), height }).toFile(outF);
console.log('OK', outF, meta.width, meta.height);
