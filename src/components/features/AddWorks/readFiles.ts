const readfile = async (file: File) => {
	const reader = new FileReader()
	reader.onload = async e => {
		return e.target?.result
	}
	reader.readAsText(file)
}

const readFiles = async (files: File[]) => {
	const text = new Array(0)
	for (const file of files) {
		text.push([await readfile(file), file.name.replace('.txt', '')])
	}
	return text
}

export default readFiles
