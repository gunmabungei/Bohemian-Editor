import type { Bohemian, OnePiecePuzzle } from '@/types/Journal.ts'

export function toBohemian(opp: OnePiecePuzzle): Bohemian {
	return { ...opp, season: null }
}

export function toOnePiecePuzzle(bohe: Bohemian): OnePiecePuzzle {
	return { ...bohe, TTSelection: false, volume: 0 }
}
