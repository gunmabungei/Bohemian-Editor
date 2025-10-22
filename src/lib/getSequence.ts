export function getSequence(from: number, to: number): string[] {
	return Array(to + 1 - from)
		.fill(0)
		.map((_, i) => i + from)
		.map(i => i.toString())
}
