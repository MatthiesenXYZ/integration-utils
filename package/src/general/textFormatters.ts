/**
 * Converts a string to camel case.
 * @param str - The string to convert.
 * @returns The camel case version of the input string.
 */
export function toCamelCase (str: string): string {
    return str
        .split(/[-_]/)
        .map((word, index) => {
            if (index === 0) {
                return word;
            }
            return (
                word.charAt(0).toUpperCase() +
                word.slice(1)
            );
        })
        .join("");
};

/**
 * Converts a string to PascalCase.
 * @param str - The input string to be converted.
 * @returns The converted string in PascalCase.
 */
export function toPascalCase (str: string): string {
  if (/^[a-z\d]+$/i.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str.replace(
    /([a-z\d])([a-z\d]*)/gi,
    (g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  ).replace(/[^a-z\d]/gi, '');
};