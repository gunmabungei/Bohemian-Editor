import {
	Fieldset,
	Group,
	NativeSelect,
	Radio,
	Stack,
	Switch,
	TextInput,
} from '@mantine/core'
import UploadImageModal from '@/features/journal/UploadImages/UploadImageModal.tsx'
import type { Journal } from '@/types/Journal.ts'
import { switchJournal } from '@/components/layouts/JournalConfig/switchJournal.ts'
import { variables } from '@/components/layouts/JournalConfig/variables.ts'

type JournalConfigProps = {
	journal: Journal
	setJournal: (journal: Journal) => void
}

type RadioKeys = Journal['type']

export default function JournalConfig({
	journal,
	setJournal,
}: JournalConfigProps) {
	return (
		<Stack align={'flex-start'} style={{ textAlign: 'left' }} h='100%'>
			<Radio.Group onChange={switchJournal} label='部誌の種類'>
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
				<NativeSelect label='季節' data={variables.seasons} w='10em' />
			</Fieldset>
			<Fieldset
				legend='One Piece Puzzle'
				hidden={journal.type !== 'onepiecepuzzle'}
				w='100%'
			>
				<TextInput label='Vol.' w='3em' />
				<Switch label='TT傑作選？' pt='1em' />
			</Fieldset>
			<Fieldset legend='発行者情報'>
				<TextInput label='氏名' w='8em' />
				<NativeSelect
					label='学年'
					w='4em'
					data={variables.grades}
				></NativeSelect>
				<NativeSelect
					label='学科'
					data={variables.departments}
				></NativeSelect>
			</Fieldset>

			<Group>
				<NativeSelect
					label='発行年'
					data={variables.years}
				></NativeSelect>
				<NativeSelect label='月' data={variables.months}></NativeSelect>
				<NativeSelect label='日' data={variables.days}></NativeSelect>
			</Group>
			<Group>
				<UploadImageModal />
			</Group>
		</Stack>
	)
}
