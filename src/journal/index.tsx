import {
    Group,
    Radio,
    Stack,
    Text,
    TextInput,
    Fieldset,
    NativeSelect,
    Switch,
    Container,
    Grid,
    FileInput,
    Image,
    Space,
} from '@mantine/core';
import { useState } from 'react';
import UploadImageModal from './UploadImageModal.tsx';
import { type JournalProps } from '../JournalUI.tsx';

export default function JournalProps(props: JournalProps) {
    const [value, setValue] = useState('bohe');
    return (
        <>
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
                            <Radio value='bohe' label='ぼへみあん' />
                            <Radio value='onepuz' label='One Piece Puzzle' />
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
                            data={getSequence(2025, new Date().getFullYear())}
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
        </>
    );
}

function getSequence(from: number, to: number): string[] {
    return Array(to + 1 - from)
        .fill(0)
        .map((_, i) => i + from)
        .map((i) => i.toString());
}
