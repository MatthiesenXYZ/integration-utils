import { builtinModules as builtins } from 'node:module';
import type { AstroConfig, AstroIntegration } from 'astro';
import { addVitePlugin, hasVitePlugin } from 'astro-integration-kit';
type VitePlugin = Required<AstroConfig['vite']>['plugins'][number];

/**
 * Vite plugin to namespace node builtins
 * 
 * @example
 * ```ts
 * // astro.config.mjs
 * import { defineConfig } from 'astro/config';
 * import { namespaceBuiltinsPlugin } from '@matthiesenxyz/integration-utils/astro-utils';
 * 
 * export default defineConfig({
 *   vite: {
 *     plugins: [namespaceBuiltinsPlugin()]
 *   }
 * });
 * ```
 */
export function namespaceBuiltinsPlugin(): VitePlugin {
    return {
        name: 'namespace-builtins',
        enforce: 'pre',
        // biome-ignore lint/suspicious/noExplicitAny: This is a Vite plugin, so we don't have control over the type of `id`
        resolveId(id: any) {
            if (id[0] === '.' || id[0] === '/') return;
    
            if (builtins.includes(id)) {
                return { id: `node:${id}`, external: true };
            }
            return;
        },
    }
};

/**
 * Astro integration to add the node namespace builtins Vite plugin.
 * @returns The AstroIntegration object with the `vite-namespace-builtins` plugin added.
 * 
 * @example
 * ```ts
 * // astro.config.mjs
 * import { defineConfig } from 'astro/config';
 * import { nodeNamespaceBuiltinsAstro } from '@matthiesenxyz/integration-utils/astro-utils';
 * 
 * export default defineConfig({
 *   integrations: [nodeNamespaceBuiltinsAstro()]
 * });
 * ```
 */
export function nodeNamespaceBuiltinsAstro(): AstroIntegration {
    return {
        name: 'vite-namespace-builtins',
        hooks: {
            "astro:config:setup": ( params ) => {
                if (!hasVitePlugin(params, { plugin: 'namespace-builtins' })) {
                    addVitePlugin(params, { plugin: namespaceBuiltinsPlugin() });
                }
            }
        }
    }
};