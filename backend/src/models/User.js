import mongoose from "mongoose";
import bcrypt from "bcryptjs";


// user schema that defines the structure for user documents in DB
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true, // prevent dups
    },
    email: {
        type: String,
        required: true,
        unique: true, // prevents multiple accounts with same email
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  // basic validation for password strenght
    },
    profileImage: {
        type: String,
        default:"",  // Default to empty string if no image is provided
    }
    
}, {timestamps: true});  // Automatically adds createAt and updatedAt fields

// Pre saved middleware that hashes the passwords automatically before saving to DB
userSchema.pre("save", async function(next){

    // if password hasnt changed, skip the hashing to prevent double hashing
    if(!this.isModified("password")){
        return next();
    }

    // Generate a salt with a cost factor of 10
    const salt = await bcrypt.genSalt(10);
    
    // replace the plain text password with the hashed version
    this.password = await bcrypt.hash(this.password, salt);

    next()

});

// compare plain text with hashed password 
userSchema.methods.comparePassword = async function(userPassword){

    return await bcrypt.compare(userPassword, this.password);

};

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

export default User;