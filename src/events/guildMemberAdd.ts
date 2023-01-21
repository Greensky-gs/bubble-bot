import { AmethystEvent } from "amethystjs";
import config from "../utils/config";

export default new AmethystEvent('guildMemberAdd', (member) => {
    if (!member.user.bot) {
        const channel = member.guild.channels.cache.get(config('joinChannel'))

        if (channel) channel.send({
            
        })
    }
})