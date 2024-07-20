import type { AstroIntegrationLogger } from "astro";
import { loadEnv } from 'vite';

export type CheckEnvOpts = {
    toCheck: string[];
    logger: AstroIntegrationLogger;
    verbose?: boolean;
}

const env = loadEnv("all", process.cwd(), "");

export const checkEnvVariables = async ( opts: CheckEnvOpts ) => {
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
}