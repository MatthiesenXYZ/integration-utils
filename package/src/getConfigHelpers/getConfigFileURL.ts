/**
 * Returns an array of URLs for different configuration file paths to try.
 * @param projectRootUrl - The root URL of the project.
 * @param configName - The name of the configuration file.
 * @returns An array of URLs representing different configuration file paths to try.
 */
export function getConfigFileURL(projectRootUrl: URL | string, configName: string): URL[] {
	const configPaths = Object.freeze([
		`${configName}.config.mjs`,
		`${configName}.config.js`,
		`${configName}.config.mts`,
		`${configName}.config.ts`,
	]);

	/**
	 * Resolves the given config path relative to the project root URL.
	 * @param configPath - The configuration file path to resolve.
	 * @returns The resolved URL of the configuration file.
	 */
	function resolveConfigPath(configPath: string) {
		return new URL(`${configPath}`, projectRootUrl);
	}

	const pathsToTry = configPaths.map((configPath) => resolveConfigPath(configPath));

	return pathsToTry;
}

export default getConfigFileURL;
