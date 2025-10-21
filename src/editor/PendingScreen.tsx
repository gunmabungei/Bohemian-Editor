import { useDisclosure } from '@mantine/hooks';
import { Modal, Overlay, Button } from '@mantine/core';
import { useEffect } from 'react';

export default function PendingScreen(props: { open: boolean }) {
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        if (props.open) {
            open();
        } else {
            close();
        }
    });

    return (
        <>
            {opened && (
                <Overlay color='#000' backgroundOpacity={0.35} blur={3} />
            )}
        </>
    );
}
