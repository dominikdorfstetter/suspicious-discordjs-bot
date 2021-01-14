export const log = (message: string, type: string) => {
    console.log(`[${type}] ${new Date().toISOString()}\t\t${message}`);
}
