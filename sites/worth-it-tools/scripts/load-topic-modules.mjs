/*
 * Loads the pure topic modules into plain Node.
 *
 * `src/lib/topics.ts` and `src/lib/slugSiblings.ts` hold logic worth auditing
 * and testing directly, but they cannot be imported as-is: the import chain
 * reaches `src/consts.ts`, which reads Vite's `import.meta.env` at module load
 * and uses extensionless specifiers Node will not resolve. Rather than reshape
 * the source to suit the tooling, this bundles them with esbuild — the same
 * bundler Astro already builds the site with — and stubs `import.meta.env`.
 *
 * The alternative would have been re-implementing the classifier in the audit,
 * which is exactly the drift the audit exists to catch.
 */
import * as esbuild from 'esbuild';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const ENTRY = [
  "export * from './src/lib/topics.ts';",
  "export * from './src/lib/slugSiblings.ts';",
  "export { guideIndex } from './src/data/guideIndex.ts';",
].join('\n');

export async function loadTopicModules() {
  const built = await esbuild.build({
    stdin: { contents: ENTRY, resolveDir: projectRoot, sourcefile: 'topic-modules.ts', loader: 'ts' },
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    // src/consts.ts reads these at module load; the audit never uses them.
    define: { 'import.meta.env': '{}' },
    logLevel: 'error',
  });

  const code = built.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

export { projectRoot };
