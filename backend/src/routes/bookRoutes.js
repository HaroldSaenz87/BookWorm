import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js"
import protectRoute from "../middleware/auth.middleware.js";

// Initialize express router
const router = express.Router();


// create
router.post("/", protectRoute, async(req, res) => {
    
    try{

        // Destructure required feilds from the request body
        const { title, caption, rating, image } = req.body;

        // Basic validation to ensure no required fields are missing
        if(!title || !caption || !rating || !image){
            return res.status(400).json({ message: "Please provide all fields" });
        }


        // upload to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageURL = uploadResponse.secure_url

        // create a new instance of book model
        const newBook = new Book({
            title, 
            caption, 
            rating, 
            image: imageURL, // store cloudinary link 
            user: req.user._id, // Associate the book with authenticated user ID
        });

        // sent to the db
        await newBook.save()

        // return new creation status
        res.status(201).json(newBook)

        
    } 
    catch (error){

        // log the server side error and return response
        console.log("Error creating book", error);
        res.status(500).json({ message: error.message });
    
    }


});


// get books and load as being scrolled
router.get("/", protectRoute, async(req, res) => {

    try {

        const page = req.query.page || 1;

        const limit = req.query.limit || 5;

        const skip = (page - 1 ) * limit;



        const books = await Book.find().sort({ createdAt: -1 }) // descending
        .skip(skip)
        .limit(limit)
        .populate("user", "username profileImage");


        const totalBooks = await Book.countDocuments();

        res.send({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
        });

        
    } 
    catch (error) {
        
        console.log("Error in get all books route", error);
        res.status(500).json({ message: "Internal server error" });

    }
});



// delete
router.delete("/:id", protectRoute, async(req, res) => {

    try {

        // find the book 
        const book = await Book.findById(req.params.id);

        // check if it exists
        if(!book){

            return res.status(404).json({ message: "Book not found" });

        }

        // check if user is the creator of book
        if(book.user.toString() !== req.user._id.toString()){

            return res.status(401).json({ message: "Unauthorized" });

        }

        //delete from cloudinary
        if(book.image && book.image.includes("cloudinary")){

            try{

                const publicId = book.image.split("/").pop().split(".")[0];
                
                await cloudinary.uploader.destroy(publicId);

            }
            catch(deleteError){

                console.log("Error deleting image from cloudinary", deleteError);
            }
        }

        // deleted
        await book.deleteOne();

        res.json({ mesage: "Book deleted successfully" });
        
    } 
    catch (error) {
        
        console.log("Error deleting book", error);

        res.status(500).json({ message: "Internal server error" });
    }

});


// user recommended
router.get("/user", protectRoute, async(req, res) => {

    try{

        const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.json(books);

    }
    catch(error){

        console.error("Get user books error:", error.mesage);

        res.status(500).json({ message: "Server error" });
    }
});


export default router;

