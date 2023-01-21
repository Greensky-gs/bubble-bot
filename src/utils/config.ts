const params = {
    createVoiceChannelId: '1037051099363938406',
    ownerId: '911526216341798913',
    levelsRoles: [
        {
            role: '1037439617856700416',
            level: 5
        },
        {
            role: '1037439626866073703',
            level: 10
        },
        {
            role: '1037439629428789358',
            level: 15
        },
        {
            role: '1037439631429468301',
            level: 20
        },
        {
            role: '1037439633455325214',
            level: 25
        },
        {
            role: '1037439635250487316',
            level: 30
        },
        {
            role: '1037439637129535549',
            level: 35
        },
        {
            role: '1037439660265320508',
            level: 40
        },
        {
            role: '1037439667634700389',
            level: 45
        },
        {
            role: '1037439674089754774',
            level: 50
        }
    ],
    levelIncrement: (x: number) => x * 5
};
export default <T extends keyof typeof params>(param: T): (typeof params)[T] => {
    return params[param];
};
