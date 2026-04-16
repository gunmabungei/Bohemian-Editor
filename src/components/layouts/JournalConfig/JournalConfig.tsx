import {
	Fieldset,
	Group,
	NativeSelect,
	Radio,
	Stack,
	Switch,
	TextInput,
} from '@mantine/core'
import type { Journal } from '@/types/Journal.ts'
import { switchJournal } from '@/components/layouts/JournalConfig/switchJournal.ts'
import { variables } from '@/components/layouts/JournalConfig/variables.ts'

type JournalConfigProps = {
	journal: Journal
	setJournal: (journal: Journal) => void
}

export default function JournalConfig({
	journal,
	setJournal,
}: JournalConfigProps) {
	return (
		<Stack align={'flex-start'} style={{ textAlign: 'left' }} h='100%'>
			<Radio.Group
				onChange={key => switchJournal(key, journal, setJournal)}
				value={journal.type}
				label='部誌の種類'
			>
				<Group mt='xs'>
					<Radio value='bohemian' label='ぼへみあん' />
					<Radio value='onepiecepuzzle' label='One Piece Puzzle' />
				</Group>
			</Radio.Group>
			<Fieldset
				legend='ぼへみあん'
				hidden={journal.type !== 'bohemian'}
				w='100%'
			>
				<NativeSelect
					label='季節'
					data={variables.seasons}
					w='10em'
					value={
						journal.type === 'bohemian'
							? journal.season ?? ''
							: ''
					}
					onChange={e => {
						if (journal.type === 'bohemian') {
							setJournal({
								...journal,
								season: e.target.value as Journal extends {
									type: 'bohemian'
								}
									? Journal['season']
									: never,
							})
						}
					}}
				/>
			</Fieldset>
			<Fieldset
				legend='One Piece Puzzle'
				hidden={journal.type !== 'onepiecepuzzle'}
				w='100%'
			>
				<TextInput
					label='Vol.'
					w='3em'
					value={
						journal.type === 'onepiecepuzzle'
							? String(journal.volume)
							: ''
					}
					onChange={e => {
						if (journal.type === 'onepiecepuzzle') {
							setJournal({
								...journal,
								volume: Number(e.target.value) || 0,
							})
						}
					}}
				/>
				<Switch
					label='TT傑作選？'
					pt='1em'
					checked={
						journal.type === 'onepiecepuzzle'
							? journal.TTSelection
							: false
					}
					onChange={e => {
						if (journal.type === 'onepiecepuzzle') {
							setJournal({
								...journal,
								TTSelection: e.currentTarget.checked,
							})
						}
					}}
				/>
			</Fieldset>
			<Fieldset legend='発行者情報'>
				<TextInput
					label='氏名'
					w='8em'
					value={journal.publisher?.name ?? ''}
					onChange={e =>
						setJournal({
							...journal,
							publisher: {
								...journal.publisher,
								name: e.target.value,
							},
						})
					}
				/>
				<NativeSelect
					label='学年'
					w='4em'
					data={variables.grades}
					value={String(journal.publisher?.grade ?? '')}
					onChange={e =>
						setJournal({
							...journal,
							publisher: {
								...journal.publisher,
								grade: Number(e.target.value) as 1 | 2 | 3 | 4 | 5,
							},
						})
					}
				/>
				<NativeSelect
					label='学科'
					data={variables.departments}
					value={journal.publisher?.department ?? ''}
					onChange={e =>
						setJournal({
							...journal,
							publisher: {
								...journal.publisher,
								department: e.target.value as 'M' | 'E' | 'J' | 'K' | 'C' | 'AP' | 'AE',
							},
						})
					}
				/>
			</Fieldset>

			<Group>
				<NativeSelect label='発行年' data={variables.years} />
				<NativeSelect label='月' data={variables.months} />
				<NativeSelect label='日' data={variables.days} />
			</Group>
		</Stack>
	)
}
