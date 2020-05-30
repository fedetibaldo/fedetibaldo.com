module.exports = {
    purge: [],
    theme: {
        container: {
            center: true,
        },
        screens: {
            /* Original */
            // sm: `640px`,
            // md: `768px`,
            // lg: `1024px`,
            // xl: `1280px`,

            /* Custom */
            sm: `640px`,
            lg: `800px`,
        },
        fontFamily: {
            sans: [
                // custom font
                `Source Sans Pro`,
                // default sans stack
                `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, `Noto Sans`, `sans-serif`, `Apple Color Emoji`, `Segoe UI Emoji`, `Segoe UI Symbol`, `Noto Color Emoji`
            ],
        },
        extend: {},
    },
    variants: {},
    plugins: [],
}
