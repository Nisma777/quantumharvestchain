const express = require('express');
const auth = require('../middleware/auth');
const Report = require('../models/Report');
const User = require('../models/User');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { reportedId, reason } = req.body;
  const report = new Report({ reporterId: req.user._id, reportedId, reason });
  await report.save();

  // Flag user
  await User.findByIdAndUpdate(reportedId, { $inc: { reportCount: 1 } });

  res.json({ msg: 'Report submitted' });
});

module.exports = router;