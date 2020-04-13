export function makeFactory(options: object, componentFactory: (...props: any) => any) {
	return (...params: []) => ({
		...options,
		// Overwrite the `beforeCreate()` hook added by `makeGuard()`.
		beforeCreate() {
			return null;
		},
		...componentFactory(...params),
	});
}

export function makeGuard(options: object) {
	return Object.assign(options, {
		beforeCreate() {
			throw new Error('Do not use the default export but use the factory function instead!');
		},
	});
}
