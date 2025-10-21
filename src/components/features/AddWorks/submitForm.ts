import type { FormParam } from './AddWorks.tsx';
import readFiles from './readFiles.ts';
import type { SendData } from './SendData.ts';
import { uploadWorks } from '@lib/HttpRequest';

export const submitForm = async (journal_name: string, param: FormParam) => {
    const onFileInput = async () => {
        if (param.files === undefined) return;
        const contents = await readFiles(param.files);
        const sendData: SendData[] = contents.map(([b, t]) => {
            return {
                author: 'Not Set',
                postscript: '',
                title: t,
                body: b,
            };
        });
        for (const item of sendData) {
            await uploadWorks(journal_name, item);
        }
    };
    const onTextInput = async () => {
        await uploadWorks(journal_name, param);
    };
    return param.files === undefined
        ? await onFileInput()
        : await onTextInput();
};
