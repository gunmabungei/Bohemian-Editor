import type { Bohemian, OnePiecePuzzle } from '@/types/Journal.ts'

export function toBohemian(opp: OnePiecePuzzle): Bohemian {
	return { ...opp, type: 'bohemian', season: null }
}

export function toOnePiecePuzzle(bohe: Bohemian): OnePiecePuzzle {
	return { ...bohe, type: 'onepiecepuzzle', TTSelection: false, volume: 0 }
}
