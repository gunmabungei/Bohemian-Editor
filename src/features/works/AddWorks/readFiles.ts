const readfile = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = e => {
			resolve(e.target?.result as string)
		}
		reader.onerror = reject
		reader.readAsText(file)
	})
}

const readFiles = async (files: File[]): Promise<[string, string][]> => {
	const text: [string, string][] = []
	for (const file of files) {
		text.push([await readfile(file), file.name.replace('.txt', '')])
	}
	return text
}

export default readFiles
