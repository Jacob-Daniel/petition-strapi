module.exports = {
	level: "debug",
	transports: [
		new (require("winston").transports.Console)({
			format: require("winston").format.combine(
				require("winston").format.colorize(),
				require("winston").format.simple(),
			),
		}),
	],
};
