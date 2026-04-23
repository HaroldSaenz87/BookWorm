import mongoose from "mongoose";

// establish connection to mongoDB
export const connectDB = async() => {

    // states 
    const states = {

        0: "Disconnected",
        1: "Connected",
        2: "Connecting",
        3: "Disconnecting",
    
    };
    

    // Event listeneres
    mongoose.connection.on("Connected", () => {

        console.log(`Pass: ${states[1]}`);
    
    });

    mongoose.connection.on("error", (err) => {

        console.log(`Error: ${err.message}`);
    
    });

    mongoose.connection.on("disconnected", () => {

        console.log(`Warning: ${states[0]}`);
    
    });

    mongoose.connection.on("connecting", () => {

        console.log(`Progress toward: ${states[2]}`);
    
    });



    try{

        // attempt to connect
        await mongoose.connect(process.env.MONGO_URI);


        // confirm the state after await finishes
        const currentState = mongoose.connection.readyState;

        // Log to confirm 
        console.log(`Database Status: ${states[currentState]}`);
        
    } 
    catch (error) {

        // Log if error for the connection 
        console.log("Error connecting", error);

        // stop server from running in a broken state
        process.exit(1);

    }
};