import type { AstroIntegration } from "astro";
import { addIntegration, defineUtility, hasIntegration } from "astro-integration-kit";

/**
 * Easily add a list of integrations from within an integration.
 *
 * @param {import("astro").HookParameters<"astro:config:setup">} params
 * @param {array} integrations
 *
 * @example
 * ```ts
 * import Vue from "@astrojs/vue";
 * import tailwindcss from "@astrojs/tailwind";
 *
 * addIntegration(params, [
 *  { integration: Vue(), ensureUnique: true }
 *  { integration: tailwindcss() }
 * ])
 * ```
 *
 * @see https://astro-integration-kit.netlify.app/utilities/add-integration/
 */
export const addIntegrationArray = defineUtility('astro:config:setup')(
    (
        params, 
        integrations: Array<{
            integration: AstroIntegration;
            ensureUnique?: boolean | undefined;
        }>
    ) => {
        const { logger } = params;

        for ( const { integration, ensureUnique } of integrations ) {
            if ( ensureUnique && hasIntegration(params, { name: integration.name })) {
                logger.warn(`Integration ${integration.name} already exists and ensureUnique is set to true. Skipping.`);
                return;
            }

            addIntegration(params, { integration });
        }
    }
)
