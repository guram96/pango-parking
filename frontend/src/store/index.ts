import { createStore, type Store, type SetStoreFunction } from "solid-js/store";
import type { City, User } from "./types";

/**
 * Wrapper function that saves and loads it from session storage
 * @date 09/05/2024
 * @export
 * @template T
 * @param {T} initialState
 * @param {string} name
 * @return {*}  {[get: Store<T>, set: SetStoreFunction<T>]}
 */
export function createSessionStore<T extends object = {}>(
	initialState: T,
	name: string,
): [get: Store<T>, set: SetStoreFunction<T>] {
	const [state, setState] = createStore(initialState, { name });

	const cache = sessionStorage.getItem(name)
		? sessionStorage.getItem(name)
		: "";

	if (cache) {
		try {
			setState(JSON.parse(cache));
		} catch (err) {
			console.error(err);
		}
	} else {
		sessionStorage.setItem(name, JSON.stringify(initialState));
	}

	const setStateToLocalStorage = (value: T) => {
		sessionStorage.setItem(name, JSON.stringify(value));
		setState(value);
	};

	// @ts-ignore not sure how to properly type this for now.
	return [state, setStateToLocalStorage];
}

const [cityStore, setCityStore] = createSessionStore<{ cities: City[] }>(
	{
		cities: [],
	},
	"citiesStore",
);

const [userStore, setUserStore] = createSessionStore<{ user: User | null }>(
	{
		user: null,
	},
	"userStore",
);

// const [userStore, setUserStore] = createStore<{user: User | null}>(
// 	{
// 		user: null
// 	},
// );

// const [cityStore, setCityStore] = createStore<{cities: City[]}>({
// 	cities: [],
// });

export { userStore, setUserStore, cityStore, setCityStore };
