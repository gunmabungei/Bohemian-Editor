const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
const uploadWorks = async (journal_name) => (item) => {
    return fetch(`${API_BASE_URL}/journal/${journal_name}/upload_works`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
};

const getWorksList = async (journal_name) => {
    return fetch(`${API_BASE_URL}/journal/works_list/${journal_name}`);
};

export { uploadWorks, getWorksList };
