import usernameList from './lists/usernames';
import passwordList from './lists/passwords';

/**
 * Username - Checks if the name is a reserved username
 *
 * @returns True if the name is a reserved username, false otherwise
 */
export const checkIfUnsafeUsername = (username: string) => {
	return usernameList.includes(username);
};

/**
 * Password - Checks if the name is a reserved password
 *
 * @returns True if the name is a reserved password, false otherwise
 */
export const checkIfUnsafePassword = (password: string) => {
	return passwordList.includes(password);
};

/**
 * Checks if a value is a reserved username or password
 *
 * @param value - The value to check
 * @returns An object containing functions to check if the value is a reserved username or password
 */
export function checkIfUnsafe(value: string) {
	return {
		username: () => checkIfUnsafeUsername(value),
		password: () => checkIfUnsafePassword(value),
	};
}

export default checkIfUnsafe;
