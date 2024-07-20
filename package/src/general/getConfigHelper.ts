
export function getConfigFileURL(projectRootUrl: URL | string, configName: string) {
    const configPaths = Object.freeze([
        `${configName}.config.mjs`,
        `${configName}.config.js`,
        `${configName}.config.mts`,
        `${configName}.config.ts`,
    ])

    function resolveConfigPath( configPath: string ) {
        return new URL( `${configPath}`, projectRootUrl );
    }

    const pathsToTry = configPaths.map( (configPath) => resolveConfigPath(configPath));

    return pathsToTry;
}

export async function loadConfigFile <ConfigObjectType> ( configName: string, projectRoot: URL | string) {
    const configPaths = Object.freeze([
        `${configName}.config.mjs`,
        `${configName}.config.js`,
        `${configName}.config.mts`,
        `${configName}.config.ts`,
    ])
    
    function resolveConfigPath( configPath: string ) {
        return new URL( `${configPath}?t=${Date.now()}`, projectRoot ).href;
    }

    const pathsToTry = configPaths.map( (configPath) => resolveConfigPath(configPath));

    if (import.meta.env?.BASE_URL?.length) {
        pathsToTry.push( `${configName}.config.mjs?t=${Date.now()}` );
        pathsToTry.push( `${configName}.config.js?t=${Date.now()}` );
        pathsToTry.push( `${configName}.config.mts?t=${Date.now()}` );
        pathsToTry.push( `${configName}.config.ts?t=${Date.now()}` );
    }

    function coerceError(error: unknown): { message: string; code?: string | undefined } {
		if (typeof error === 'object' && error !== null && 'message' in error) {
			return error as { message: string; code?: string | undefined }
		}
		return { message: error as string }
	}

    for (const path of pathsToTry) {
        try {
            const module = (await import(/* @vite-ignore */ path)) as { default: ConfigObjectType };
            if (!module.default) {
                throw new Error(`Missing or invalid default export in ${path}. Please ensure the file exports a default object.`);
            }
            return module.default;
        } catch (error) {
            const { message, code } = coerceError(error);

            if (code === 'ERR_MODULE_NOT_FOUND' || code === 'ERR_LOAD_URL') {
                if (message.replace(/(imported )?from .*$/, '').includes(path)) continue;
            }

            throw new Error(`Your project includes a ${configName}.config file that could not be loaded due to ${code ? `the error ${code}` : 'the following error'}: ${message}`.replace(/\s+/g, ' '),
				error instanceof Error ? { cause: error } : undefined
			);
        }
    }
    return {};
}