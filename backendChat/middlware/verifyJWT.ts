import * as jwt from 'jsonwebtoken';
export function verifyJWT(req, res, next)  {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    // return res.json({ authHeader });

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }
            req.userID = decoded.user_id;
            next();
        }
    )
};