/**
 * Loads a configuration file of type `ConfigObjectType` based on the provided `configName` and `projectRoot`.
 * @param configName - The name of the configuration file.
 * @param projectRoot - The root URL or path of the project.
 * @returns The loaded configuration object.
 * @throws An error if the configuration file cannot be loaded.
 */
export async function loadConfigFile<ConfigObjectType>(
	configName: string,
	projectRoot: URL | string
): Promise<ConfigObjectType> {
	const configPaths = Object.freeze([
		`${configName}.config.mjs`,
		`${configName}.config.js`,
		`${configName}.config.mts`,
		`${configName}.config.ts`,
	]);

	/**
	 * Resolves the full URL of a configuration file based on the provided `configPath` and `projectRoot`.
	 * @param configPath - The path of the configuration file.
	 * @returns The resolved URL of the configuration file.
	 */
	function resolveConfigPath(configPath: string) {
		return new URL(`${configPath}?t=${Date.now()}`, projectRoot).href;
	}

	const pathsToTry = configPaths.map((configPath) => resolveConfigPath(configPath));

	if (import.meta.env?.BASE_URL?.length) {
		pathsToTry.push(`${configName}.config.mjs?t=${Date.now()}`);
		pathsToTry.push(`${configName}.config.js?t=${Date.now()}`);
		pathsToTry.push(`${configName}.config.mts?t=${Date.now()}`);
		pathsToTry.push(`${configName}.config.ts?t=${Date.now()}`);
	}

	/**
	 * Coerces an error object into a standardized format.
	 * @param error - The error object to coerce.
	 * @returns The coerced error object.
	 */
	function coerceError(error: unknown): { message: string; code?: string | undefined } {
		if (typeof error === 'object' && error !== null && 'message' in error) {
			return error as { message: string; code?: string | undefined };
		}
		return { message: error as string };
	}

	for (const path of pathsToTry) {
		try {
			const module = (await import(/* @vite-ignore */ path)) as { default: ConfigObjectType };
			if (!module.default) {
				throw new Error(
					`Missing or invalid default export in ${path}. Please ensure the file exports a default object.`
				);
			}
			return module.default;
		} catch (error) {
			const { message, code } = coerceError(error);

			if (code === 'ERR_MODULE_NOT_FOUND' || code === 'ERR_LOAD_URL') {
				if (message.replace(/(imported )?from .*$/, '').includes(path)) continue;
			}

			throw new Error(
				`Your project includes a ${configName}.config file that could not be loaded due to ${
					code ? `the error ${code}` : 'the following error'
				}: ${message}`.replace(/\s+/g, ' '),
				error instanceof Error ? { cause: error } : undefined
			);
		}
	}
	return {} as ConfigObjectType;
}

export default loadConfigFile;
