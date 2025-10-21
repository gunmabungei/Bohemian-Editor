import ReactCodeMirror from '@uiw/react-codemirror';
import './editor.css';
import { EditorView } from '@codemirror/view';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import type { Works } from './EditorUI';

export default function Editor(props: {
    works: Works;
    editWorks: (works: Works) => void;
    onSave: () => void;
}) {
    return (
        <Stack w='100%' h='100%' justify='flex-start' gap='0'>
            <ReactCodeMirror
                value={props.works.body}
                onChange={(body) =>
                    props.editWorks({ ...props.works, body: body })
                }
                extensions={[EditorView.lineWrapping]}
                theme='light'
                className='articleField'
                height='100%'
            />
            <Stack
                bg={'#e7e7e7'}
                gap='0'
                pr='1em'
                pb='0.5em'
                pl='1em'
                m='0'
                style={{
                    textAlign: 'left',
                    justifyContent: '',
                }}
            >
                <TextInput
                    value={props.works.postscript}
                    onChange={(postscript) =>
                        props.editWorks({
                            ...props.works,
                            postscript: postscript.target.value,
                        })
                    }
                    label='あとがき'
                    w='100%'
                />
                <Group style={{ textAlign: 'left' }} grow w='100%'>
                    <TextInput
                        value={props.works.title}
                        onChange={(title) =>
                            props.editWorks({
                                ...props.works,
                                title: title.target.value,
                            })
                        }
                        label='タイトル'
                    />
                    <TextInput
                        value={props.works.author}
                        onChange={(author) =>
                            props.editWorks({
                                ...props.works,
                                author: author.target.value,
                            })
                        }
                        label='ペンネーム'
                    />
                    <Button mt='1.6em' variant='default' onClick={props.onSave}>
                        保存
                    </Button>
                </Group>
            </Stack>
        </Stack>
    );
}
