type MessageType = "INFO" | "WARN" | "DEBUG" | "ERROR";

/**
 * Logs out message
 * @param message Message to log out
 * @param type Message type
 */
export const log = (message: string, type: MessageType): void => {
    console.log(`[${type}] ${new Date().toISOString()}\t\t${message}`);
}
