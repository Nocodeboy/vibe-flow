/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#98e710",
                background: "#030303",
                surface: "#0A0A0A",
            },
            fontFamily: {
                display: ['"Space Mono"', 'monospace'],
                body: ['"Inter"', 'sans-serif'],
            },
            borderRadius: {
                'lg': '1.5rem',
                'xl': '2rem',
                '2xl': '2.5rem',
            }
        },
    },
    plugins: [],
}
