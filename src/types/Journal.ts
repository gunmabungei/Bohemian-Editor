import type { Student } from '@/types/Student.ts'

export type Journal = Bohemian | OnePiecePuzzle

export type Bohemian = {
	type: 'bohemian'
	season: 'spring' | 'summer' | 'autumn' | 'winter' | null
} & CommonProperty

export type OnePiecePuzzle = {
	type: 'onepiecepuzzle'
	volume: number
	TTSelection: boolean
} & CommonProperty

type CommonProperty = {
	id: number
	title: string
	cover_url: string | null
	backcover_url: string | null
	publish_date: Date
	publisher: Student
}
