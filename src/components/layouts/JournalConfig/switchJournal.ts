import { toBohemian, toOnePiecePuzzle } from '@/lib'

export function switchJournal(key: RadioKeys | string) {
	if (key === 'bohemian') {
		if (journal.type === 'onepiecepuzzle') setJournal(toBohemian(journal))
	} else if (key === 'onepiecepuzzle') {
		if (journal.type === 'bohemian') setJournal(toOnePiecePuzzle(journal))
	} else {
		console.error('[Journal Config] Undefined Journal Type')
	}
}
