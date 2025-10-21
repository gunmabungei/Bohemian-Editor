import {Button, Stack, Text} from "@mantine/core";
import type { Works } from "./EditorUI";

export function WorksList(props: {works: Works[], onClickedButton: (id: number) => void, selection: number}) {
    const titleElem = (title: string) => {
        return (<Text size="md" fw={600} truncate>{title}</Text>)
    }
    const authorElem = (author: string, last_update: string) =>
        (<Stack gap="0">
            <Text size="xs" ta="right" c="black">{author}</Text>
            <Text size="xs" ta="right" c="gray" style={{whiteSpace: "nowrap"}}>{last_update}</Text>
        </Stack>)
    const buttons =
        ("map" in props.works) ?
        props.works.map(x => (
            <Button
                h={50}
                variant={props.selection + 1 === x.id ? "light" : "outline"}
                color="gray"
                radius="xs"
                justify="space-between"
                rightSection={authorElem(x.author, x.pages)}
                key={x.id}
                onClick={() => props.onClickedButton(x.id)}
            >
                <Text c={"black"}>{titleElem(x.title)}</Text>
            </Button>
        )) :
            (<Text>Loading...</Text>)
    return (
        <>
            <Stack
                align="stretch"
                justify="flex-start"
                gap="xs"
                h={"80vh"}
            >
                {buttons}
            </Stack>
        </>
    )
}