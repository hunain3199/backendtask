const authMiddleware = require('../middleware/authMiddleware');

// Profile Route
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    const tasks = await Task.find({ assignedTo: req.userId });

    res.json({ user, tasks });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
