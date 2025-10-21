import { FileInput, Space, Textarea } from '@mantine/core';
import type { Tabs } from './AddWorks.tsx';

type AddWorksFormProps = {
    onChangeTabs: (tabs: string | null) => void;
    setFormValue: (value: FormData) => void;
    tabs: Tabs;
    formValues: FormData;
};

export const AddWorksForm = ({
    onChangeTabs,
    setFormValue,
    tabs,
    formValues,
}: AddWorksFormProps) => {
    return (
        <>
            <Tabs defaultValue='textInput' onChange={onChangeTabs} value={tabs}>
                <Tabs.List>
                    <Tabs.Tab value='fileInput'>ファイル</Tabs.Tab>
                    <Tabs.Tab value='textInput'>テキスト</Tabs.Tab>
                </Tabs.List>
                <Space h='sm'></Space>
                <Tabs.Panel value='fileInput'>
                    <FileInput
                        variant='filled'
                        description='複数ファイルの送信に対応しています'
                        placeholder='クリックでファイルをアップロード'
                        accept='text/plain'
                        multiple
                        value={formValues.files}
                        onChange={(files: File[]) => {
                            setValues({ ...formValues, files: files });
                        }}
                    />
                </Tabs.Panel>
                <Tabs.Panel value='textInput'>
                    <Textarea
                        placeholder='ここに作品をペースト'
                        value={formValues.body}
                        onChange={(event) =>
                            setFormValue({
                                ...formValues,
                                body: event.target.value,
                            })
                        }
                    />
                </Tabs.Panel>
            </Tabs>
        </>
    );
};
