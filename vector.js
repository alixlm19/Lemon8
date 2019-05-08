class Vector {

    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    //Adds the elements of another vector to this vector
    add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
    }

    //Subtracts the elements of another vector to this vector
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
    }

    //Multiplies the current vector with a scalar
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
    }

    //Returns the magnitude of a vector
    magnitude() {
        let dx2 = Math.pow(this.x, 2);
        let dy2 = Math.pow(this.y, 2);
        let dz2 = Math.pow(this.z, 2);

        return Math.sqrt(dx2 + dy2 + dz2);
    }

    //Returns the dot product of a vector with respect to another vector
    dot(other) {
        return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
    }

    //Returns the cross product of 2 vectors
    cross(other) {
        let x = (this.y * other.z) - (this.z * other.y);
        let y = (this.z * other.x) - (this.x * other.z);
        let z = (this.x * other.y) - (this.y * other.x)

        return new Vector(x, y, z);
    }

    //Returns the scalar projection of the current vector
    scalarProjection(other, theta = null) {
        if(theta == null) {                                     //Case 1: other is a vector
            return this.dot(other) / this.magnitude();
        } else {                                                //Case 2: other is an angle
            return this.magnitude() * Math.cos(other);
        }
    }

    //Returns the vector projection of the current vector
    vectorProjection(other, theta = null) {
        let bHat = other.unit();
        if(theta == null) {                                     //Case 1: other is a vector
            return bHat.mult(this.dot(bHat));
        } else {                                                //Case 2: other is an angle
            return bHat.mult(this.scalarProjection(other, theta));
        }
    }
    
    //Returns the unit vector form of the current vector
    unit(){
        let mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag, this.z / mag);
    }

    //Returns the angle of a vector    
    angle(other = null) {
        if(other == null) {
            other = Vector.zero();
        } else {
            return Math.acos(this.dot(other) / (this.magnitude() * other.magnitude())); 
        }
    }

    //Returns the reverse vector of the current vector
    reverse() {
        let newVector = this.copy();
        return newVector.mult(-1);
    }

    //Returns a new vector with the same elements as the current vector
    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    //Returns the component representation of a vector
    toString() {
        return `${this.x}i + ${this.y}j + ${this.z}k`;
    }

    //Returns a new vector from the addition of two vectors
    static add (vector1, vector2) {
        let x = vector1.x += vector2.x;
        let y = vector1.y += vector2.y;
        let z = vector1.z += vector2.z;
        
        return new Vector(x, y, z);
    }

    //Returns a new vector from the difference of two vectors
    static sub (vector1, vector2) {
        let x = vector1.x -= vector2.x;
        let y = vector1.y -= vector2.y;
        let z = vector1.z -= vector2.z;
        
        return new Vector(x, y, z);
    }

    //Returns the magnitude of a vector going from point p to point q
    static magnitude(vector1, vector2) {
        let dx = vector2.x - vector1.x;
        let dy = vector2.y - vector1.y;
        let dz = vector2.y - vector1.z;

        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
    }

    //Returns the dot product of two vectors
    static dot(vector1, vector2) {
        return (vector1.x * vector2.x) + (vector1.y * vector2.y) + (vector1.z * vector2.z);
    }

    //Returns the angle between two vectors
    static angle(vector1, vector2) {
        return Math.acos(Vector.dot(vector1, vector2) / (vector1.magnitude() * vector2.magnitude())); 
    }

    //Returns a new vector from a 1 angle
    static fromAngle(theta, mag = 1) {
        return new Vector(Math.round(Math.cos(theta) * mag), Math.Math.sin(theta) * mag, 0)
    }

    //Returns a new vector from a 2 angles
    static fromAngle(theta, alpha, mag = 1) {
        let x = Math.cos(theta) * Math.cos(alpha);
        let y = Math.sin(alpha);
        let z = Math.sin(theta) * Math.cos(alpha);

        return new Vector(x, y, z);
    }

    //Returns a random 2D vector
    static random2D() {
        return new Vector(Math.random(), Math.random(), 0);
    }

    //Returns a random 3D vector
    static random3D() {
        return new Vector(Math.random(), Math.random(), Math.random());
    }

    //Returns the zero vector
    static zero() {
        return new Vector(0, 0, 0);
    }

    //Returns the unit vector I
    static unitI() {
        return new Vector(1, 0, 0);
    }

    //Returns the unit vector J
    static unitJ() {
        return new Vector(0, 1, 0);
    }

    //Returns the unit ve
    static unitK() {
        return new Vector(0, 0, 1);
    }
}