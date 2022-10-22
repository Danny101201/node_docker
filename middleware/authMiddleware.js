const isAuth = async (req, res, next) => {
  try {
    const { user } = req.session
    if (!user) {
      return res.status(401).json({ message: 'unauthorized' })
    }
    req.user = user
    next();
  } catch (err) {
    console.log(err)
  }
}
export default isAuth