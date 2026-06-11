import https from 'https';
import fs from 'fs';

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        return get(r.headers.location).then(res, rej);
      }
      const d = [];
      r.on('data', (c) => d.push(c));
      r.on('end', () => res(Buffer.concat(d)));
    }).on('error', rej);
  });
}

const map = {
  'fat-freezing': '87fc13_6484417438e1968732e918b83a4bbcbc',
  'fat-dissolving': '87fc13_1fd10d3ef79efd2653dafd1d07221557',
  'muscle-stimulation': '87fc13_045a0e6102a6d3729ff33768f5ecc426',
  'skin-tightening': '87fc13_8156aefc03614f5862d6a89766353289',
  'lipocavitation': 'f940f0_28dc0a5e40d8a721569d28707b4c85df',
  'anti-cellulite': '87fc13_7eaf33f155dd867363a59c2c23281585',
  'lymphatic-drainage': '87fc13_858776416a1a00eef3f9975a6af9acf8',
};

const result = {};
for (const [id, iframeId] of Object.entries(map)) {
  let html;
  try { html = (await get('https://www-carismaslimming-com.filesusr.com/html/' + iframeId + '.html')).toString(); }
  catch (e) { console.log(id, 'FETCH FAIL', e.message); continue; }
  const re = /<img[^>]*?src="([^"]+)"[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<h3>\s*([\s\S]*?)\s*<\/h3>/g;
  const items = [];
  let m;
  while ((m = re.exec(html))) {
    const src = m[1];
    const quote = m[2].replace(/\s+/g, ' ').trim();
    const name = m[3].replace(/\s+/g, ' ').trim();
    const mediaId = src.includes('/media/') ? src.split('/media/')[1].split('/')[0].split('?')[0] : src.split('/').pop();
    const path = 'public/wix/' + mediaId;
    if (!fs.existsSync(path)) {
      try { const buf = await get(src); fs.writeFileSync(path, buf); }
      catch (e) { console.log('  img fail', mediaId, e.message); }
    }
    const sz = fs.existsSync(path) ? fs.statSync(path).size : 0;
    items.push({ mediaId, quote, name, sz });
  }
  result[id] = items;
  console.log(id, items.length, 'items');
}
fs.writeFileSync('d:/tmp/testimonials.json', JSON.stringify(result, null, 2));
console.log('WROTE d:/tmp/testimonials.json');
