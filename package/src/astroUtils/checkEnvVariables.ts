import type { AstroIntegrationLogger } from "astro";
import { loadEnv } from 'vite';

export type CheckEnvOpts = {
    toCheck: string[];
    logger: AstroIntegrationLogger;
    verbose?: boolean;
};

const env = loadEnv("all", process.cwd(), "");

/**
 * Check environment variables
 * 
 * @param opts - Options for checking environment variables
 * @param opts.toCheck - Array of environment variables to check
 * @param opts.logger - Astro logger
 * @param opts.verbose - Whether to log all environment variables or just missing ones
 */
export const checkEnvVariables = async ( opts: CheckEnvOpts ): Promise<void> => {
    const { logger, toCheck, verbose } = opts;

    for ( const variable of toCheck ) {
        switch ( verbose ) {
            case true:
                if ( !env[variable] ) {
                    logger.error( `Environment variable ${variable} is missing` );
                } else {
                    logger.info( `Environment variable ${variable} is present` );
                }
                break;
            default:
                if ( !env[variable] ) {
                    logger.error( `Environment variable ${variable} is missing` );
                }
                break;
        }
    }
};