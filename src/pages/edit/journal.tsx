import '../../App.css'

import {
	AppShell,
	createTheme,
	Fieldset,
	Group,
	Image,
	MantineProvider,
	NativeSelect,
	Radio,
	Space,
	Stack,
	Switch,
	Text,
	TextInput,
} from '@mantine/core'
import Tabbar from '../common/Tabbar.tsx'
import { ExportModal } from '@/components/features/works/ExportWorks/ExportModal.tsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UploadImageModal from '@/components/features/journal/UploadImages/UploadImageModal.tsx'

const theme = createTheme({
	fontFamily: 'Yu Gothic, sans-serif',
	headings: { fontFamily: 'Outfit, sans-serif' },
})

type BohemianProps = {
	season: 'spring' | 'summer' | 'autumn' | 'winter' | null
}
type OnePiecePuzzleProps = {
	volume: number
	isTTselection: boolean
}

export type JournalProps = {
	id: number
	title: string
	cover_url: string | null
	backcover_url: string | null
	publish_year: number | null
	publish_month: number | null
	publish_day: number | null
	option?: BohemianProps | OnePiecePuzzleProps
}

export default function Journal() {
	const journalName = useParams()
	const [value, setValue] = useState('bohe')
	const [journalProperty, setJournalProperty] = useState({})
	useEffect(() => {
		fetch(`http://localhost:3000/journal/id/${journalName}`)
			.then(response => response.json())
			.then(data => setJournalProperty(data))
			.catch(error => console.error('Fetching data failed', error))
	}, [])
	return (
		<>
			<MantineProvider theme={theme}>
				<AppShell header={{ height: 60 }}>
					<AppShell.Header
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-end',
						}}
					>
						<Tabbar refreshCompontent={setJournalProperty} />
					</AppShell.Header>
					<AppShell.Main
						style={{
							display: 'flex',
							flexDirection: 'column',
							margin: 0,
							paddingTop: 60,
						}}
					>
						<Group>
							<Stack
								align={'flex-start'}
								style={{ textAlign: 'left' }}
								h='100%'
							>
								<Radio.Group
									value={value}
									onChange={setValue}
									name='favoriteFramework'
									label='部誌の種類'
								>
									<Group mt='xs'>
										<Radio
											value='bohe'
											label='ぼへみあん'
										/>
										<Radio
											value='onepuz'
											label='One Piece Puzzle'
										/>
									</Group>
								</Radio.Group>
								<Fieldset
									legend='ぼへみあん'
									hidden={value !== 'bohe'}
									w='100%'
								>
									<NativeSelect
										label='季節'
										data={[
											'春 / Spring',
											'夏 / Summer',
											'秋 / Fall, Autumn',
											'冬 / Winter',
											'なし',
										]}
										w='10em'
									/>
								</Fieldset>
								<Fieldset
									legend='One Piece Puzzle'
									hidden={value !== 'onepuz'}
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
										data={getSequence(1, 5)}
									></NativeSelect>
									<NativeSelect
										label='学科'
										data={[
											'M / 機械工学科',
											'E / 電子メディア工学科',
											'J / 電子情報工学科',
											'K / 物質工学科',
											'C / 環境都市工学科',
											'AP / 生産システム専攻',
											'AE / 環境工学専攻',
										]}
									></NativeSelect>
								</Fieldset>

								<Group>
									<NativeSelect
										label='発行年'
										data={getSequence(
											2025,
											new Date().getFullYear()
										)}
									></NativeSelect>
									<NativeSelect
										label='月'
										data={getSequence(1, 12)}
									></NativeSelect>
									<NativeSelect
										label='日'
										data={getSequence(1, 31)}
									></NativeSelect>
								</Group>
								<Group>
									<UploadImageModal />
								</Group>
							</Stack>
							<Stack align={'flex-start'}>
								<Space h='1em' />
								<Image
									src='https://placehold.net/400x400.png'
									w='200'
									p='0'
									m='0'
								/>
								<Text>表紙イメージ</Text>
								<Image
									src='https://placehold.net/400x400.png'
									w='200'
									p='0'
									m='0'
								/>
								<Text>背表紙イメージ</Text>
							</Stack>
						</Group>
						<ExportModal />
					</AppShell.Main>
				</AppShell>
			</MantineProvider>
		</>
	)
}

function getSequence(from: number, to: number): string[] {
	return Array(to + 1 - from)
		.fill(0)
		.map((_, i) => i + from)
		.map(i => i.toString())
}
