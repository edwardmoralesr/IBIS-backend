import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        {
            IdUsuario: user.IdUsuario.toString(),
            Documento: user.Documento,
            IdRole: user.IdRole,
            Activo: user.Activo,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};