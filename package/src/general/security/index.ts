import passwordList from './lists/passwords';
import usernameList from './lists/usernames';

/**
 * Reserved names for usernames and passwords
 */
export const reservedNames = () => {
	return {
		/**
		 * Lists the reserved usernames and passwords
		 *
		 * @returns An object containing the lists of reserved usernames and passwords
		 */
		list: () => {
			return {
				/**
				 * Usernames - The list of reserved usernames
				 */
				usernames: usernameList,
				/**
				 * Passwords - The list of reserved passwords
				 */
				passwords: passwordList,
			};
		},
		/**
		 * Checks if a name is a reserved username or password
		 *
		 * @param name - The name to check
		 * @returns An object containing functions to check if the name is a reserved username or password
		 */
		check: (name: string) => {
			return {
				/**
				 * Username - Checks if the name is a reserved username
				 *
				 * @returns True if the name is a reserved username, false otherwise
				 */
				username: () => usernameList.includes(name),
				/**
				 * Password - Checks if the name is a reserved password
				 *
				 * @returns True if the name is a reserved password, false otherwise
				 */
				password: () => passwordList.includes(name),
			};
		},
	};
};
