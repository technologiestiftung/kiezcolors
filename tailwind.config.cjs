const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		colors: {
			gray: {
				100: '#EDEDED',
				200: '#E0E0E0',
				300: '#C7C7C7',
				400: '#ADADAD',
				500: '#949494'
			},
			secondary: '#277da1'
		}
	},

	plugins: []
};

module.exports = config;
