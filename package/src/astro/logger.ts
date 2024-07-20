import type { AstroIntegrationLogger } from "astro";

export type LoggerOpts = {
    logLevel: 'info' | 'warn' | 'error' | 'debug';
    logger: AstroIntegrationLogger;
    verbose?: boolean;
};

/**
 * Log messages to the console based on the log level.
 * 
 * @param opts - Options for logging
 * @param opts.logLevel - Log level
 * @param opts.logger - Astro logger
 * @param opts.verbose - Whether to log all messages or just those that are not debug or info
 * @param message - Message to log
 */
export const integrationLogger = async ( opts: LoggerOpts, message: string ) => {
    const { logLevel, logger, verbose } = opts;
    
    switch ( verbose ) {
        case true:
            logger[logLevel]( message );
            break;
        case false:
            if ( logLevel !== 'debug' && logLevel !== 'info' ) {
                logger[logLevel]( message );
            }
            break;
        default:
            logger[logLevel]( message );
    }
};