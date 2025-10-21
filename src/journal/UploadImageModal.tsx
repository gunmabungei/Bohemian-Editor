import {Button, FileInput, Group, Image, Modal, Stack} from "@mantine/core";
import DnDList from "../editor/DnDList.tsx";
import {useDisclosure} from "@mantine/hooks";

export default function UploadImageModal() {
    const [opened, {open, close}] = useDisclosure(false);
    return (
        <>
            <Modal opened={opened} onClose={close} size="md" title="表紙画像をアップロード">
                <Image src="https://placehold.net/400x400.png" w="200" size="md"/>
                <FileInput
                    pt="1em"
                    placeholder="ファイルをアップロード"
                    variant="filled"
                />
                <Group pt="1em" justify={"flex-end"}>
                    <Button variant="outline" color="pink">取消</Button>
                    <Button variant="outline" color="lime">保存</Button>
                </Group>
            </Modal>

            <Button
                variant="default"
                onClick={open}
                w="fit-content"
                mt="1em"
            >
                表紙画像をアップロード
            </Button>

        </>
    )
}