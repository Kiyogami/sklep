/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                    hover: 'hsl(var(--card-hover))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    glow: 'hsl(var(--primary-glow))',
                    muted: 'hsl(var(--primary-muted))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))'
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))'
                },
                border: {
                    DEFAULT: 'hsl(var(--border))',
                    gold: 'hsl(var(--border-gold))'
                },
                input: {
                    DEFAULT: 'hsl(var(--input))',
                    focus: 'hsl(var(--input-focus))'
                },
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            boxShadow: {
                'gold': 'var(--shadow-gold)',
                'gold-lg': 'var(--shadow-gold-lg)',
                'card': 'var(--shadow-card)',
                'card-hover': 'var(--shadow-card-hover)',
            },
            backgroundImage: {
                'gradient-gold': 'var(--gradient-gold)',
                'gradient-gold-subtle': 'var(--gradient-gold-subtle)',
                'gradient-dark': 'var(--gradient-dark)',
                'gradient-card': 'var(--gradient-card)',
                'gradient-hero': 'var(--gradient-hero)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'slide-in-right': {
                    from: { opacity: '0', transform: 'translateX(20px)' },
                    to: { opacity: '1', transform: 'translateX(0)' }
                },
                'scale-in': {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' }
                },
                'pulse-gold': {
                    '0%, 100%': { boxShadow: '0 0 0 0 hsla(45, 93%, 47%, 0.4)' },
                    '50%': { boxShadow: '0 0 20px 5px hsla(45, 93%, 47%, 0.2)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
                'scale-in': 'scale-in 0.3s ease-out forwards',
                'pulse-gold': 'pulse-gold 2s ease-in-out infinite'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
