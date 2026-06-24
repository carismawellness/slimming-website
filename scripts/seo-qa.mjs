import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const includeRoots = ['app', 'components', 'lib'];
const exclude = [
  'app/terms-conditions',
  'app/privacy-policy',
  'app/preview',
  'app/quiz-results',
  'app/thank-you',
  'app/weight-loss/thank-you',
  'components/redesign/PreviewFooter.tsx',
  'lib/blog/posts-index.json',
];

const extensions = new Set(['.ts', '.tsx']);

const checks = [
  {
    label: 'broken zero counter fallback',
    pattern: /(?:Up to 0 KG|Loved by 0 \+)/i,
  },
  {
    label: 'unsupported guaranteed outcome language',
    pattern: /(?:1KG Per Week Guaranteed|results guaranteed|weight loss results guaranteed|guarantees a 5 kg loss|or we keep treating you free)/i,
  },
  {
    label: 'over-specific 1kg/week promise',
    pattern: /(?:Lose up to 1kg\/week|Lose up to 1kg a week|Up to 1KG|Up to 1kg a week)/i,
  },
  {
    label: 'detox/toxin claim',
    pattern: /(?:detox therapy|detox support|natural detoxification|detoxification|eliminate toxins|toxins can build up)/i,
  },
  {
    label: 'cellulite-free claim',
    pattern: /cellulite-free/i,
  },
  {
    label: 'first-session visible result claim',
    pattern: /(?:visible results from the first session|right after your first session)/i,
  },
  {
    label: 'unqualified device percentage claim',
    pattern: /(?:Build 25% more muscle, reduce 30% fat|30% Fat reduction, 25% Muscle growth|promises 30% Fat reduction)/i,
  },
  {
    label: 'permanent fat destruction claim',
    pattern: /(?:permanently break down|permanent fat reduction|permanent fat cell removal|should be permanent)/i,
  },
];

function isExcluded(path) {
  return exclude.some((item) => path === item || path.startsWith(`${item}/`));
}

function extensionOf(path) {
  const index = path.lastIndexOf('.');
  return index === -1 ? '' : path.slice(index);
}

function listFiles(dir, relative = dir) {
  const out = [];
  for (const entry of readdirSync(join(ROOT, dir))) {
    const full = join(ROOT, dir, entry);
    const rel = join(relative, entry);
    if (isExcluded(rel)) continue;
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...listFiles(join(dir, entry), rel));
    else if (extensions.has(extensionOf(entry))) out.push(rel);
  }
  return out;
}

const files = includeRoots.flatMap((dir) => listFiles(dir));
const failures = [];

for (const file of files) {
  const text = readFileSync(join(ROOT, file), 'utf8');
  const lines = text.split('\n');
  for (const check of checks) {
    lines.forEach((line, index) => {
      if (check.pattern.test(line)) {
        failures.push(`${file}:${index + 1} ${check.label}: ${line.trim()}`);
      }
    });
  }
}

if (failures.length) {
  console.error(`SEO QA failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO QA passed across ${files.length} source files.`);
