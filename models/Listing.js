// // const mongoose = require('mongoose');

// // const ListingSchema = new mongoose.Schema({
// //     placeName: { type: String, required: true },
// //     category: { type: String, required: true },
// //     keywords: { type: String, required: true },
// //     description: { type: String, required: true },
// //     name: { type: String, required: true },
// //     email: { type: String, required: true },
// //     phone: { type: String, required: true },
// //     website: { type: String },
// //     designation: { type: String },
// //     company: { type: String },
// //     facebook: { type: String },
// //     twitter: { type: String },
// //     linkedin: { type: String },
// //     skype: { type: String },
// //     images: { type: [String] },
// //     video: { type: String },
// //     amenities: { type: [String] },
// //     openingHours: { type: Map, of: String }
// // });

// // module.exports = mongoose.model('Listing', ListingSchema);



// const mongoose = require('mongoose');

// const listingSchema = new mongoose.Schema({
//     placeName: String,
//     category: String,
//     keywords: String,
//     description: String,
//     name: String,
//     email: String,
//     phone: String,
//     website: String,
//     designation: String,
//     company: String,
//     facebook: String,
//     twitter: String,
//     linkedin: String,
//     skype: String,
//     image: String,
//     video: String,
//     amenities: { type: [String] },
//    openingHours: { type: Map, of: String }
// });

// const Listing = mongoose.model('Listing', listingSchema);

// module.exports = Listing;



// models/Listing.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    placeName: { type: String, required: true },
    category: { type: String, required: true },
    keywords: { type: String, required: true },
    description: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: String,
    designation: String,
    company: String,
    facebook: String,
    twitter: String,
    linkedin: String,
    skype: String,
    image: [{ type: String }], // Changed to array of strings
    video: [{ type: String }]  // Changed to array of strings
});

module.exports = mongoose.model('Listing', listingSchema);