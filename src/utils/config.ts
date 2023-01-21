const params = {
    createVoiceChannelId: '1037051099363938406',
    ownerId: '911526216341798913'
}
export default <T extends keyof typeof params>(param: T): typeof params[T] => {
    return params[param];
};