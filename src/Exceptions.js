class InvalidDirectionException extends Error {
	constructor(message) {
		super(message);
		this.name = "INVALID_DIRECTION_EXCEPTION";
		this.message = message;
	}
}
class OutOfBoundsException extends Error {
	constructor(message) {
		super(message);
		this.name = "OUT_OF_BOUNDS_EXCEPTION";
		this.message = message;
	}
}
class InvalidInstructionException extends Error {
	constructor(message) {
		super(message);
		this.name = "INVALID_DIRECTION_EXCEPTION";
		this.message = message;
	}
}
class InvalidSizeException extends Error {
	constructor(message) {
		super(message);
		this.name = "INVALID_SIZE_EXCEPTION";
		this.message = message;
	}
}
class MissingInputException extends Error {
	constructor(message) {
		super(message);
		this.name = "MISSING_INPUT_EXCEPTION";
		this.message = message;
	}
}
class InvalidStartingPosition extends Error {
	constructor(message) {
		super(message);
		this.name = "MISSING_INPUT_EXCEPTION";
		this.message = message;
	}
}
module.exports = {InvalidInstructionException, InvalidDirectionException, InvalidSizeException, OutOfBoundsException, MissingInputException, InvalidStartingPosition};