// 型Aをkeyに、型Bをvalueに持つObjectをA => Bの関数に変換する
const RecordToFunc =
	<A extends string | number | symbol, B>(o: Record<A, B>) =>
	(key: A): B => {
		return o[key]
	}
export { RecordToFunc }
