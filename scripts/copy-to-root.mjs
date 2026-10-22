import { cp } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');

for (const entry of ['CNAME', 'index.html', 'assets', 'audio', 'fonts', 'images']) {
  await cp(resolve(output, entry), resolve(root, entry), { recursive: true });
}
