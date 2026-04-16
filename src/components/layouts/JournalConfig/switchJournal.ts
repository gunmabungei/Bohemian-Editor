import { toBohemian, toOnePiecePuzzle } from '@/lib'
import type { Journal } from '@/types/Journal.ts'

export function switchJournal(
	key: string,
	journal: Journal,
	setJournal: (j: Journal) => void
) {
	if (key === 'bohemian' && journal.type === 'onepiecepuzzle') {
		setJournal(toBohemian(journal))
	} else if (key === 'onepiecepuzzle' && journal.type === 'bohemian') {
		setJournal(toOnePiecePuzzle(journal))
	}
}
