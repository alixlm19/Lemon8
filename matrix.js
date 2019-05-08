class Matrix2D {

	constructor(m, n = m) {
		this.m = m; //matrix rows
		this.n = n; //matrix columns
		this.items = []; //matrix items

		//Initialize the matrix to 0
		for (let i = 0; i < m * n; i++) {
			this.items.push(0);
		}
	}

	//Adds the current matrix to another matrix
	add(other) {
		if (this.m === other.m && this.n == other.n) {
			for (let i = 0; i < this.m * this.n; i++) {
				this.items[i] += other.items[i];
			}
		} else {
			throw "Invalid matrix size";
		}
	}

	//Subtracts the current matrix to another matrix
	sub(other) {
		if (this.m === other.m && this.n == other.n) {
			for (let i = 0; i < this.m * this.n; i++) {
				this.items[i] -= other.items[i];
			}
		} else {
			throw "Invalid matrix size";
		}
	}

	//Scalar multiplication
	mult(scalar) {
		if (!isNaN(scalar)) {
			for (let i = 0; i < this.m * this.n; i++) {
				this.items[i] *= scalar;
			}
		} else {
			throw "Argument is not a number";
		}
	}

	//Scalar division
	div(scalar) {
		this.mult(1 / scalar);
	}

	//Transposes the matrix
	transpose() {
		if (this.m === this.n) { //Case 1: Square Matrix
			for (let i = 1; i <= this.m; i++) {
				for (let j = i; j > 0; j--) {
					if (i !== j) {
						this.swap(i, j, j, i);
					}
				}
			}
		} else { //Case 2: Non-Square Matrix

			//Stores the entries of what would be the transposed matrix to an array
			let items = [];

			for (let i = 1; i <= this.n; i++) {
				for (let j = 1; j <= this.m; j++) {
					let entry = this.getItem(j, i);
					items.push(entry);
				}
			}

			//Interchanges the number of rows with the number of columns
			let temp = this.m;
			this.m = this.n;
			this.n = temp;

			this.items = items;
		}
	}

	//Returns the determinant of a matrix
	determinant() {
		//The determinant of a triangular matrix is its trace
		if(this.isTriangular() && this.m > 2) {
			return this.mainDiagonalProduct();
		}
		if (this.m == this.n) {
			
			if (this.m === 2) {												//Case 1: Matrix is of size 2 by 2
				let a = this.getItem(1, 1);
				let b = this.getItem(1, 2);
				let c = this.getItem(2, 1);
				let d = this.getItem(2, 2);

				return (a * d) - (b * c);
			} else {														//Case 2: Matrix is of size n by n
				let total = 0;
				for(let j = 1; j <= this.m; j++) {
					let scalar = Matrix2D.parity(1, j) * this.getItem(1, j);
					let newMinor = this.minor(1, j);

					total += scalar * newMinor.determinant();
					
				}

				return total;
			}

		} else {
			throw "Invalid matrix size";
		}
	}

	//Returns the inverse of the current matrix
	inverse() {
		let det = this.determinant();
		let cofactor = this.cofactorMatrix();
		cofactor.transpose();
		cofactor.mult(1 / det);

		return cofactor;
	}
	
	//Returns a minor (submatrix) of the current matrix
	minor(i, j) {
		if(this.m === this.n && this.m > 2) {
			let newMatrix = new Matrix2D(this.m - 1);	//Creates a new matrix with a dimension equal to the current matrix's dimension - 1
			let items = [];

			for(let n = 1; n <= this.m; n++) {

				//Ignore this row
				if(n === i) {
					continue;
				}
				for(let k = 1; k <= this.n; k++) {

					//Ignore this column
					if(k === j) {
						continue;
					} else {
						items.push(this.getItem(n, k));
					}
				}
			}
			
			newMatrix.items = items;	//Updates the entries of the new matrix
			return newMatrix;
		}
	}

	//Returns a cofactor matrix of size n by n
	cofactorMatrix() {
		if(this.m === this.n){
			let newMatrix = new Matrix2D(this.m);
			for(let i = 1; i <= this.m; i++) {
				for(let j = 1; j <= this.n; j++) {
					let newMinor = this.minor(i, j);
					let sign = Matrix2D.parity(i, j);
					newMatrix.setItem(i, j, sign * newMinor.determinant());
				}
			}
			return newMatrix;
		} else {
			throw "Matrix must be a square matrix";
		}
	}

	//Returns the trace of a sqaure matrix (sum of the main diagonal)
	trace() {
		if(this.m === this.n) {
			let total = this.getItem(1, 1);
			for(let i = 2; i <= this.m; i++) { 
				total += this.getItem(i, i);
			}
			return total;
		} else {
			throw "Matrix must be a square matrix";
		}
	}

	//Returns the product of the main diagonal
	mainDiagonalProduct() {
		if(this.m === this.n) {
			let total = this.getItem(1, 1);
			for(let i = 2; i <= this.m; i++) { 
				total *= this.getItem(i, i);
			}
			return total;
		} else {
			throw "Matrix must be a square matrix";
		}
	}
	
	//Returns true if the matrix is a upper or lower triangular matrix
	isTriangular() {
		//Checks if the matrix is a square matrix and if its dimension is greater than 2
		if (this.m === this.n && this.m > 2) {
			let matrixCopy = this.copy();
			//Transpose the matrix if the matrix is not an upper triangular matrix
			if(this.getItem(1, 2) !== 0) {
				matrixCopy.transpose();
			}
			//Case 2:
			for (let j = 2; j <= this.m; j++) {
				for (let i = j - 1; i > 0; i--) {
					if (i == j) {
						continue;
					} else {
						if(matrixCopy.getItem(i, j) !== 0) {
							return false;
						}
					}
				}
			}
			return true;
		}
	}

	//Returns true if the matirx has an inverse
	hasInverse() {
		return this.determinant() !== 0;
	}

	//Returns the item stored at the position i, j of the matrix
	getItem(i, j) {
		let index = (i - 1) * this.n + (j - 1); //Changed this to n (just in case)
		return this.items[index];
	}

	//Sets the item at the position i, j of the matrix to the value specified
	setItem(i, j, item) {
		let index = this.m * (i - 1) + (j - 1);
		this.items[index] = item;
	}

	//Swaps the values of the entries at position (i, j) and (k, l)
	swap(i, j, k, l) {
		let temp = this.getItem(i, j);
		this.setItem(i, j, this.getItem(j, i))
		this.setItem(j, i, temp);
	}
	
	//Returns a copy of the current matrix
	copy() {
		return Matrix2D.fromArray(this.items.slice(0), this.m, this.n);
	}
	
	//Returns an identity matrix
	static identityMatrix(n) {
		let idenMat = new Matrix2D(n, n);
		for (let i = 0; i < n * n; i++) {
			let item = i % (n + 1) == 0 ? 1 : 0;
			idenMat.items[i] = item;
		}
		return idenMat;
	}

	//Returns the sign of an entry at position i, j
	static parity(i, j) {
		return Math.pow((-1), (i + j));
	}

	//Returns the product of two matrices
	static mult(matrix1, matrix2) {
		//Check if the matrices are compatible
		if (matrix1.n === matrix2.m) {
			let newMatrix = new Matrix2D(matrix1.m, matrix2.n);
			newMatrix.items = [];
			for (let i = 1; i <= matrix1.n; i++) {

				for (let offset = 0; offset < matrix2.m; offset++) {
					let sumOfProducts = 0;
					for (let j = 1; j <= matrix2.m; j++) {
						let matrixItem1 = matrix1.getItem(i, j);
						let matrixItem2 = matrix2.getItem(j, 1 + offset);

						sumOfProducts += matrixItem1 * matrixItem2;
					}
					newMatrix.items.push(sumOfProducts);
				}
			}
			return newMatrix;
		} else {
			throw "Incompatible matrices";
		}
	}

	//Returns a matrix from an array
	static fromArray(array, m, n) {
		if (array.length !== m * n) {
			throw "Invalid matrix size";
		} else {
			let newMatrix = new Matrix2D(m, n);
			newMatrix.items = array;

			return newMatrix;
		}
	}

	//Prints the current matrix
	printMatrix() {
		let s = "";
		for (let i = 1; i <= this.m; i++) {
			s += '[';
			let row = [];
			for (let j = 1; j <= this.n; j++) {
				row.push(this.getItem(i, j));
			}
			s += row.join(', ') + ']\n';
		}
		return s;
	}
}