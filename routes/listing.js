const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");

const ListingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({storage })

router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isloggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(ListingController.createListing)
  );
 

router.get("/new", isloggedIn, ListingController.rendernewForm);


router
  .route("/:id")
  .get(isloggedIn, wrapAsync(ListingController.showListing))
  .put(
    isloggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(ListingController.updateListing)
  )
  .delete(
    isloggedIn,
    isOwner,
    wrapAsync(ListingController.deleteListing)
  );

// new route



//   edit route
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(ListingController.editListing)
);

module.exports = router;
