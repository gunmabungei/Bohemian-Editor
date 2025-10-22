const recordToFunc =
	<A extends string | number | symbol, B>(o: Record<A, B>) =>
	(key: A): B => {
		return o[key]
	}
export { recordToFunc }
