export default {
    padding: [0, 5, 10, 15, 20],
    breakpoints: ['540px', '720px', '960px', '1140px'], // box width array
    mqLabels: {
        small: 540,
        medium: 720,
        large: 960,
        xl: 1140,
    },
    mq: Object.keys({
        s: 540,
        m: 720,
        l: 960,
        xl: 1140,
    }).reduce((accumulator, label) => {
        const verzamelaar = { ...accumulator };
        const prefix =
            typeof {
                s: 540,
                m: 720,
                l: 960,
                xl: 1140,
            }[label] === 'string'
                ? ''
                : 'max-width:';
        const suffix =
            typeof {
                s: 540,
                m: 720,
                l: 960,
                xl: 1140,
            }[label] === 'string'
                ? ''
                : 'px';
        verzamelaar[label] = (cls) => css`
            @media (${prefix +
                {
                    s: 540,
                    m: 720,
                    l: 960,
                    xl: 1140,
                }[label] +
                suffix}) {
                ${cls};
            }
        `;
        return verzamelaar;
    }, {}),
};
