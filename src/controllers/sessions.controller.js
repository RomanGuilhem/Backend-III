import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { errorDictionary } from "../utils/errors.js";

const register = async (req, res) => {
    try {
        const { first_name, email, password } = req.body;
        if (!first_name|| !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await usersService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            email,
            password: hashedPassword
        }
        let result = await usersService.create(user);
        console.log(result);
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const user = await usersService.getUserByEmail(email);
        if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });
        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const current = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie']
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user)
            return res.send({ status: "success", payload: user })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const unprotectedLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }

        const user = await usersService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ status: "error", error: "User doesn't exist" });
        }

        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            return res.status(400).send({ status: "error", error: "Incorrect password" });
        }

        const userForToken = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(userForToken, 'tokenSecretJWT', { expiresIn: "1h" });

        res
            .cookie('unprotectedCookie', token, { maxAge: 3600000, httpOnly: true })
            .send({ status: "success", message: "Unprotected Logged in", token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const unprotectedCurrent = async (req, res) => {
    try {
        const cookie = req.cookies['unprotectedCookie'];
        if (!cookie) {
            return res.status(401).send({ status: "error", error: "No token provided" });
        }

        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            return res.send({ status: "success", payload: user });
        }

        return res.status(401).send({ status: "error", error: "Invalid token" });
    } catch (error) {
        console.error(error);
        res.status(401).send({ status: "error", error: "Invalid or expired token" });
    }
};
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
}
