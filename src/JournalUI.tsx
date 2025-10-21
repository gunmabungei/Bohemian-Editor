import './App.css'

import {AppShell, createTheme, Group, MantineProvider} from '@mantine/core';
import JournalProps from "./journal";
import Tabbar from "./Tabbar.tsx";
import {ExportModal} from "./journal/ExportModal.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const theme = createTheme({
    fontFamily: "Yu Gothic, sans-serif",
    headings: { fontFamily: 'Outfit, sans-serif' }
});

type BohemianProps = {
    season: "spring" | "summer" | "autumn" | "winter" | null
}
type OnePiecePuzzleProps = {
    volume: number;
    isTTselection: boolean;
}

export type JournalProps = {
    id: number;
    title: string;
    cover_url: string | null;
    backcover_url: string | null;
    publish_year: number | null;
    publish_month: number | null;
    publish_day: number | null;
    option?: BohemianProps | OnePiecePuzzleProps;
}

export default function JournalUI() {
    const journalName = useParams();
    const [update, setUpdate] = useState<void>();
    const [journalProperty, setJournalProperty] = useState({});
    useEffect(() => {
        fetch(`http://localhost:3000/journal/id/${journalName}`)
            .then(response => response.json())
            .then(data => setJournalProperty(data))
            .catch(error => console.error("Fetching data failed", error));
    }, []);
    return (
        <>
            <MantineProvider theme={theme}>
                <AppShell
                    header={{ height: 60 }}
                >
                    <AppShell.Header
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"flex-end"
                    }}>
                        <Tabbar refreshCompontent={setJournalProperty} />
                    </AppShell.Header>
                    <AppShell.Main
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: 0,
                            paddingTop: 60,
                        }}
                    >
                        <JournalProps />
                        <ExportModal />
                    </AppShell.Main>
                </AppShell>
            </MantineProvider>
        </>
    )
}
