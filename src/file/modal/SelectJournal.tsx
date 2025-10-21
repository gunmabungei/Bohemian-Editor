import {useDisclosure} from "@mantine/hooks";
import {Button, Modal, Menu, Overlay} from "@mantine/core";
import JournalList from "../JournalList.tsx";
import type {OverlayEvent} from "./OverlayEvent.ts";
import type {ModalClose} from "./NewJournal.tsx";


export default function SelectJournal(props: OverlayEvent) {
    const [opened, {open, close}] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={() =>{
            props.onModalClose();
            close();
            }}
                   title="部誌を選択">
                <JournalList refreshComponent={props.refreshComponent} />
            </Modal>


            <Menu.Item
                onClick={_ => {
                    props.onModalOpen();
                    open();
                }}>
                部誌を選ぶ
            </Menu.Item>
        </>
    )
}