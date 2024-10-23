// // const express = require('express');
// // const multer = require('multer');
// // const Listing = require('../models/Listing');
// // const router = express.Router();

// // // Multer setup for image and video uploads
// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //         cb(null, 'uploads/');  // Upload both images and videos to the same directory
// //     },
// //     filename: function (req, file, cb) {
// //         cb(null, Date.now() + '-' + file.originalname);
// //     }
// // });

// // const upload = multer({
// //     storage: storage,
// //     fileFilter: function (req, file, cb) {
// //         if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
// //             cb(null, true);
// //         } else {
// //             cb(new Error('Only images and videos are allowed'), false);
// //         }
// //     }
// // });

// // // Handle both image and video uploads
// // const fileUpload = upload.fields([
// //     { name: 'Image', maxCount: 1 },  // Only 1 image
// //     { name: 'Video', maxCount: 1 }   // Only 1 video
// // ]);

// // // GET route to render the listing form
// // router.get('/', (req, res) => {
// //     res.render('listing'); // Assuming you have a listing.ejs file in your views directory
// // });

// // // POST route to handle listing submission
// // router.post('/', fileUpload, async (req, res) => {
// //     try {
// //         const { name, placeName, category, keywords, description, email, phone, website, designation, company, facebook, twitter, linkedin, skype } = req.body;

// //         const listingData = {
// //             placeName,
// //             category,
// //             keywords,
// //             description,
// //             name,
// //             email,
// //             phone,
// //             website,
// //             designation,
// //             company,
// //             facebook,
// //             twitter,
// //             linkedin,
// //             skype,
// //             image: req.files['Image'] ? req.files['Image'][0].path : null, // Handling single image
// //             video: req.files['Video'] ? req.files['Video'][0].path : null, // Handling single video
// //         };

// //         console.log(listingData);

// //         const listing = new Listing(listingData);
// //         await listing.save();

// //         console.log(listing);

// //         res.status(201).json({ message: 'Listing created successfully!', listing });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Error creating listing', error });
// //     }
// // });

// // module.exports = router;






// const express = require('express');
// const multer = require('multer');
// const Listing = require('../models/Listing');

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only images and videos are allowed'), false);
//         }
//     }
// });

// router.get('/', (req, res) => {
//     res.render('listing');
// });

// router.post('/', upload.fields([
//     { name: 'Image', maxCount: 5 },  // Allow multiple images
//     { name: 'Video', maxCount: 5 }   // Allow multiple videos
// ]), async (req, res) => {
//     try {
//         const { placeName, category, keywords, description, name, email, phone, website, designation, company, facebook, twitter, linkedin, skype } = req.body;

//         const listingData = {
//             placeName,
//             category,
//             keywords,
//             description,
//             name,
//             email,
//             phone,
//             website,
//             designation,
//             company,
//             facebook,
//             twitter,
//             linkedin,
//             skype,
//             image: req.files['Image'] ? req.files['Image'].map(file => file.path) : [], // Handling multiple images
//             video: req.files['Video'] ? req.files['Video'].map(file => file.path) : [], // Handling multiple videos
//         };

//         const listing = new Listing(listingData);
//         await listing.save();

//         res.status(201).json({ message: 'Listing created successfully!', listing });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating listing', error });
//     }
// });

// module.exports = router;




// routes/listingRoutes.js
const express = require('express');
const multer = require('multer');
const Listing = require('../models/Listing');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images and videos are allowed'), false);
        }
    }
});

router.get('/', (req, res) => {
    res.render('listing');
});

router.post('/', upload.fields([
    { name: 'Image', maxCount: 5 },
    { name: 'Video', maxCount: 5 }
]), async (req, res) => {
    try {
        const { 
            placeName, 
            category, 
            keywords, 
            description, 
            name, 
            email, 
            phone, 
            website, 
            designation, 
            company, 
            facebook, 
            twitter, 
            linkedin, 
            skype 
        } = req.body;

        // Create arrays of file paths
        const imagePaths = req.files['Image'] ? req.files['Image'].map(file => file.path) : [];
        const videoPaths = req.files['Video'] ? req.files['Video'].map(file => file.path) : [];

        const listingData = {
            placeName,
            category,
            keywords,
            description,
            name,
            email,
            phone,
            website,
            designation,
            company,
            facebook,
            twitter,
            linkedin,
            skype,
            image: imagePaths,
            video: videoPaths
        };

        const listing = new Listing(listingData);
        const savedListing = await listing.save();

        res.status(201).json({ 
            message: 'Listing created successfully!', 
            listing: savedListing 
        });
    } catch (error) {
        console.error('Error creating listing:', error);
        res.status(500).json({ 
            message: 'Error creating listing', 
            error: error.message 
        });
    }
});

module.exports = router;