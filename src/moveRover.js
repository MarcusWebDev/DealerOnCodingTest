let Exceptions = require("./Exceptions");
let OutOfBoundsException = Exceptions.OutOfBoundsException;
let InvalidInstructionException = Exceptions.InvalidInstructionException;
let InvalidDirectionException = Exceptions.InvalidDirectionException;
let InvalidSizeException = Exceptions.InvalidSizeException;
let MissingInputException = Exceptions.MissingInputException;
let InvalidStartingPosition = Exceptions.InvalidStartingPosition;

const moveRover = (inputString) => {
	//Checks that the inputString exists
	if (inputString == "" || inputString == null) {
		throw new MissingInputException("Missing Input: Size of plateau, rover initial position, rover instructions.");
	}
	inputString = inputString.toUpperCase();
	let inputArray = inputString.split("\n");
	let sizeOfPlateau = inputArray[0].split(" ");
	let plateauWidth = parseInt(sizeOfPlateau[0]);
	let plateauLength = parseInt(sizeOfPlateau[1]);
	let outputString = "";
	//Checks that the size is a number
	if (Number.isNaN(plateauWidth) || Number.isNaN(plateauLength)) {
		throw new InvalidSizeException("The size of the plateau entered was invalid. Length: " + plateauLength + ", width: " + plateauWidth + ".");
	}
	//Checks that there is a starting position in the input string
	if (inputArray.length < 2) {
		throw new MissingInputException("Missing Input: Rover 1 initial position, rover 1 instructions.")
	}
	//This loop handles the movement of the rover
	for (let i = 1; i < inputArray.length; i += 2) {
		let startingPosition = inputArray[i].split(" ");
		let x = parseInt(startingPosition[0]);
		let y = parseInt(startingPosition[1]);
		let direction = startingPosition[2];
		//Checks for valid input for the x and y coordinates as well as the direction of the inital rover position
		if (Number.isNaN(x) || Number.isNaN(y) || (direction != 'N' && direction != 'E' && direction != 'S' && direction != 'W')) {
			throw new InvalidStartingPosition("Invalid starting position for rover " + (Math.floor(i / 2) + 1) + ". Starting x coordinate: " + x + ", starting y coordiante: " + y + ", starting direction: " + direction + ".");
		}
		//Checks that instructions for the rover were supplied
		if (inputArray[i + 1] == null) {
			throw new MissingInputException("Missing rover " + (Math.floor(i / 2) + 1) +" instructions.")
		}
		let instructions = inputArray[i+1].split('');
		//This switch converts the compass directions to integer representations for easier rotation.
		switch (direction) {
			case 'N':
				direction = 0;
				break;
			case 'E':
				direction = 1;
				break;
			case 'S':
				direction = 2;
				break;
			case 'W':
				direction = 3;
				break;
			default: 
				throw new InvalidDirectionException("Invalid direction: " + direction);
		}
		//this loop executes the instructions for the current rover.
		for(let j = 0; j < instructions.length; j++) {
			//this switch handles the current instruction
			switch (instructions[j]) {
				case 'L':
					if (direction - 1 < 0) {
						direction = 3;
					} else {
						direction -= 1;
					}
					break; 
				case 'R':
					direction = (direction + 1) % 4;
					break;
				case 'M':
					//this switch checks to make sure that the movement doesn't take the rover out of bounds, and if it does take the rover out of bounds an error is thrown.
					switch (direction) {
						case 0:
							if (y + 1 <= plateauLength) {
								y += 1;
							} else {
								throw new OutOfBoundsException("The proposed move would be out of bounds. Proposed y position: " + (y + 1) + ". Length of plateau: " + (plateauLength + 1) + ". Problem rover: " + (Math.floor(i / 2) + 1) + ". Instruction: " + j + ".");
							}
							break;
						case 1:
							if (x + 1 <= plateauWidth) {
								x += 1;
							} else {
								throw new OutOfBoundsException("The proposed move would be out of bounds. Proposed x position: " + (x + 1) + ". Width of plateau: " + (plateauLength + 1) + ". Problem rover: " + (Math.floor(i / 2) + 1) + ". Instruction: " + j + ".");
							}
							break;
						case 2:
							if (y - 1 >= 0) {
								y -= 1;
							} else {
								throw new OutOfBoundsException("The proposed move would be out of bounds. Proposed y position: " + (y - 1) + ". Length of plateau: " + (plateauLength + 1) + ". Problem rover: " + (Math.floor(i / 2) + 1) + ". Instruction: " + j + ".");
							}
							break;
						case 3:
							if (x - 1 >= 0) {
								x -= 1;
							} else {
								throw new OutOfBoundsException("The proposed move would be out of bounds. Proposed x position: " + (x - 1) + ". Width of plateau: " + (plateauLength + 1) + ". Problem rover: " + (Math.floor(i / 2) + 1) + ". Instruction: " + j + ".");
							}
							break;
						default:
							throw new InvalidDirectionException("Invalid direction: " + direction);
					}
					break;
				default:
					throw new InvalidInstructionException("Invalid instruction: " + instructions[j] + ". Valid Instructions are 'L', 'R', and 'M'.");
			}
		}
		//this switch converts the compass direction of the rover from its integer reprsentation to its character representation
		switch (direction) {
			case 0:
				direction = 'N';
				break;
			case 1:
				direction = 'E';
				break;
			case 2:
				direction = 'S';
				break;
			case 3:
				direction = 'W';
				break;
			default: 
				throw new InvalidDirectionException("Invalid direction: " + direction);
		}
		outputString += x + " " + y + " " + direction + "\n";
	}
	return outputString;
}

export default moveRover;