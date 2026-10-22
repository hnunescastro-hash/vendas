import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
const root=fileURLToPath(new URL('./frontend-source/',import.meta.url));
export default defineConfig({root,plugins:[react()],publicDir:false,resolve:{alias:{'@':root}},css:{postcss:{plugins:[tailwindcss()]}},build:{outDir:resolve(root,'../dist'),emptyOutDir:true}});
