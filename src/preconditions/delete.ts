import { Precondition } from "amethystjs";

export default new Precondition('deleteMessage')
.setMessageRun(({ message }) => {
    message.delete().catch(() => {})

    return {
        ok: true,
        channelMessage: message,
        isChatInput: false
    }
})