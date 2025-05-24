import { Router } from "express";
import passport from "./passport";

const router = Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, err => {
      if (err) return next(err);
      res.json({ id: user.id, username: user.username, fullName: user.fullName, email: user.email, role: user.role });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/user", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
  const user = req.user as any;
  res.json({ id: user.id, username: user.username, fullName: user.fullName, email: user.email, role: user.role });
});

export default router;
