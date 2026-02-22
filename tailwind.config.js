/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
            },
            colors: {
                // Simplified 5-color system with clear roles
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',  // Main primary
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                success: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',  // Main success
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                warning: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316',  // Main warning
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                danger: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',  // Main danger
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
                neutral: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            fontSize: {
                // Typography scale
                'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],      // 40px
                'h1': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],            // 32px
                'h2': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],           // 24px
                'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],          // 20px
                'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],           // 16px
                'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],      // 14px
                'tiny': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],        // 12px
            },
            spacing: {
                // Consistent spacing system
                'xs': '0.25rem',   // 4px
                'sm': '0.5rem',    // 8px
                'md': '1rem',      // 16px
                'lg': '1.5rem',    // 24px
                'xl': '2rem',      // 32px
                '2xl': '3rem',     // 48px
                '3xl': '4rem',     // 64px
            },
            boxShadow: {
                // Professional shadow system (4 levels)
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                // Glass effect shadows
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            },
            borderRadius: {
                'sm': '0.375rem',   // 6px
                'DEFAULT': '0.5rem', // 8px
                'md': '0.75rem',    // 12px
                'lg': '1rem',       // 16px
                'xl': '1.5rem',     // 24px
                '2xl': '2rem',      // 32px
            },
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                DEFAULT: '8px',
                md: '12px',
                lg: '16px',
                xl: '24px',
            },
            animation: {
                // Purposeful animations only
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'count-up': 'countUp 0.5s ease-out',
                'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                countUp: {
                    '0%': { transform: 'translateY(5px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseSubtle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transitionDuration: {
                'fast': '150ms',
                'normal': '200ms',
                'slow': '300ms',
            },
        },
    },
    plugins: [],
}
