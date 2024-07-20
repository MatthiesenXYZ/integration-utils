/**
 * Factory function to create a file
 * 
 * @example
 * const file = fileFactory();
 * file.addLines('line1');
 * file.addLines('line2');
 * console.log(file.text());
 */
export const fileFactory = () => {
	let file = '';

	return {
		addLines(lines: string) {
			file += lines;
		},
		text() {
			return file;
		},
	};
};