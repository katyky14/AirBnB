// backend/routes/index.js
const express = require('express');
const router = express.Router();

// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

/*This route should not be available in production,
but it will not be exclusive to the production application
until you implement the frontend of the application later.
So for now, it will remain available to both the development and production environments. */
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
  // ...



module.exports = router;
