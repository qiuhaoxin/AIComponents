const { NODE_ENV, BABEL_ENV } = process.env

const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test'
module.exports = {
	"presets": [
		[
			'@babel/env',
			{
				targets: {
					firefox: '60',
					chrome: '67',
					safari: '11.1',
					edge: '17'
				},
			}
		],
		"@babel/react",
		"react-app",
	],
	"plugins": [
		'@babel/transform-modules-commonjs',
		'@babel/plugin-proposal-class-properties',
	]
}