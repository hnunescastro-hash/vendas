import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');

for (const directory of ['audio', 'fonts', 'images']) {
  await mkdir(resolve(output, directory), { recursive: true });
  await cp(resolve(root, directory), resolve(output, directory), { recursive: true });
}

await cp(resolve(root, 'CNAME'), resolve(output, 'CNAME'));
await mkdir(resolve(output, 'assets'), { recursive: true });
await cp(resolve(root, 'assets/favicon.png'), resolve(output, 'assets/favicon.png'));
