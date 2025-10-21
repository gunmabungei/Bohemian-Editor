export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@lib': path.join(__dirname, '/src/lib'),
        },
    },
});