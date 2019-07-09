module.exports =  {
	parser:  "babel-eslint",  // Specifies the ESLint parser
	extends:  ["airbnb", "prettier"],
	parserOptions:  {
			ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
			sourceType:  'module',  // Allows for the use of imports
			ecmaFeatures:  {
					jsx:  true,  // Allows for the parsing of JSX
			}
	},
	rules:  {
			"max-len": ["error", {"code": 100}],
			"prefer-promise-reject-errors": ["off"],
			"react/jsx-filename-extension": ["off"],
			"react/prop-types": ["warn"],
			"no-return-assign": ["off"]
	},
	settings:  {
		react:  {
			version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
};
