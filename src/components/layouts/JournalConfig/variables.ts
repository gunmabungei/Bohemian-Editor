import { getSequence } from '@/lib'

const seasons = [
	'春 / Spring',
	'夏 / Summer',
	'秋 / Fall, Autumn',
	'冬 / Winter',
	'なし',
]

const departments = [
	'M / 機械工学科',
	'E / 電子メディア工学科',
	'J / 電子情報工学科',
	'K / 物質工学科',
	'C / 環境都市工学科',
	'AP / 生産システム専攻',
	'AE / 環境工学専攻',
]
const years = getSequence(2025, new Date().getFullYear())
const months = getSequence(1, 12)
const days = getSequence(1, 31)
const grades = getSequence(1, 5)

export const variables = { years, months, days, grades, seasons, departments }
