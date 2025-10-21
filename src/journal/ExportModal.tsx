import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Container, Stack, Text, Checkbox, Flex, Grid} from '@mantine/core';
import ExportButton from "./ExportButton.tsx";

export function ExportModal() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} size="md" title="ファイルをダウンロードする">
                <Stack>
                    <Text>書き出すページ</Text>
                    <Grid>
                        <Grid.Col span={4}><Checkbox defaultChecked onChange={() => {}} label="表紙" /></Grid.Col>
                        <Grid.Col span={4}><Checkbox defaultChecked onChange={() => {}} label="もくじ" /></Grid.Col>
                        <Grid.Col span={4}><Checkbox defaultChecked onChange={() => {}} label="本文" /></Grid.Col>
                        <Grid.Col span={4}><Checkbox defaultChecked onChange={() => {}} label="あとがき" /></Grid.Col>
                        <Grid.Col span={4}><Checkbox defaultChecked onChange={() => {}} label="編集後記" /></Grid.Col>
                        <Grid.Col span={4}><Checkbox defaultChecked onChange={() => {}} label="背表紙" /></Grid.Col>
                    </Grid>
                    <Text>Wordファイル(.docx)</Text>
                    <ExportButton />
                    <Text>Pdfファイル(.pdf)</Text>
                    <Button variant="filled" color="pink">ダウンロード</Button>
                </Stack>
            </Modal>

            <Button
                variant="default"
                onClick={open}
                w="fit-content"
                mt="1em"
            >
                エクスポート
            </Button>
        </>
    );
}