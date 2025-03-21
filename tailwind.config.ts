
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors
				"ai-green": {
					50: "#effef7",
					100: "#d7fbec",
					200: "#b3f5d9",
					300: "#7cebbb",
					400: "#3fd995",
					500: "#1bc077",
					600: "#0f9a5f",
					700: "#107a4e",
					800: "#126141",
					900: "#115037",
					950: "#022d1e",
				},
				"ai-blue": {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#b9e6fe",
					300: "#7cd4fd",
					400: "#36bffa",
					500: "#0da2e7",
					600: "#0181c7",
					700: "#016aa1",
					800: "#065986",
					900: "#0b4a6f",
					950: "#082f4b",
				},
				"ai-purple": {
					50: "#f7f7ff",
					100: "#f0eeff",
					200: "#e3dffe",
					300: "#cdc4fc",
					400: "#b29ef7",
					500: "#9873ef",
					600: "#8651e2",
					700: "#743fc6",
					800: "#6036a0",
					900: "#513182",
					950: "#321c56",
				},
				"ai-neutral": {
					50: "#f8f9fa",
					100: "#f1f3f5",
					200: "#e9ecef",
					300: "#dee2e6",
					400: "#ced4da",
					500: "#adb5bd",
					600: "#868e96",
					700: "#495057",
					800: "#343a40",
					900: "#212529",
					950: "#0d0f12",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"fade-out": {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
				"slide-in-right": {
					from: { transform: "translateX(100%)" },
					to: { transform: "translateX(0)" },
				},
				"slide-out-left": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-100%)" },
				},
				"scale-in": {
					from: { transform: "scale(0.95)", opacity: "0" },
					to: { transform: "scale(1)", opacity: "1" },
				},
				"scale-out": {
					from: { transform: "scale(1)", opacity: "1" },
					to: { transform: "scale(1.05)", opacity: "0" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"pulse-subtle": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.85" },
				},
				"shimmer": {
					from: { backgroundPosition: "0 0" },
					to: { backgroundPosition: "-200% 0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
				"slide-in-right": "slide-in-right 0.5s ease-out",
				"slide-out-left": "slide-out-left 0.5s ease-out",
				"scale-in": "scale-in 0.5s ease-out",
				"scale-out": "scale-out 0.5s ease-out",
				"float": "float 5s ease-in-out infinite",
				"pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
				"shimmer": "shimmer 2s linear infinite",
			},
			backgroundSize: {
				"200%": "200%",
			},
			boxShadow: {
				"glass": "0 4px 30px rgba(0, 0, 0, 0.05)",
				"glass-lg": "0 10px 40px rgba(0, 0, 0, 0.08)",
				"glass-highlight": "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
				"glass-border": "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
				"crisp": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
				"crisp-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.01)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-subtle": "linear-gradient(to right, var(--tw-gradient-stops))",
				"shimmer": "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 20%, transparent 40%, transparent 100%)",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
