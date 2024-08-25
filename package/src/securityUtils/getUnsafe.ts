import passwordsList from './lists/passwords';
import usernamesList from './lists/usernames';

/**
 * Lists the reserved usernames and passwords
 *
 * @returns An object containing the lists of reserved usernames and passwords that are unsafe to use
 */
export const getUnsafe = () => {
	return {
		usernames: usernamesList,
		passwords: passwordsList,
	};
};

export default getUnsafe;
