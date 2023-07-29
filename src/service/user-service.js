import { prisma } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { createUserSchema, loginSchema } from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/response-error.js";
import jwt from "jsonwebtoken";


const create = async (params) => {
    const reqBody = validate(createUserSchema, params);

    const usernameExists = await findByUsername(reqBody.username);
    if (usernameExists) {
        throw new ResponseError(400, 'Username already taken');
    }

    const emailExists = await findByEmail(reqBody.email);
    if (emailExists) {
        throw new ResponseError(400, 'Email already taken')
    }
    
    reqBody.password = await bcrypt.hash(reqBody.password,10);
    reqBody.refresh_token = '';

    return prisma.user.create({
        data: reqBody,
        select: {
            id: true,
            username: true,
            email: true,
            name: true
        }
    });    
}

const findByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {email}
    });
}

const findByUsername = async (username) => {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    });
}

const jwtSign = (username, email, name) => {
    const accessToken = jwt.sign({username, name, email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h'});
    const refreshToken = jwt.sign({ username, name, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d'});

    return { accessToken, refreshToken }
}

const createTokens = async (params) => {
    const reqBody = validate(loginSchema, params);
    const user = await findByUsername(reqBody.username);

    const passwordValid = await bcrypt.compare(reqBody.password, user.password);
    if (!passwordValid) {
        throw new ResponseError(401, 'Incorect username or password')
    }

    const { accessToken, refreshToken } = jwtSign(user.username, user.email, user.name);

    await prisma.user.update({
        where: {
            username: user.username
        },
        data: {
            refresh_token: refreshToken
        },
    });

    return {
        accessToken,
        refreshToken
    };
}

const refreshToken = async (refreshToken) => {    
    if (!refreshToken) {
        throw new ResponseError(401, 'Unauthorized');
    }
    
    const user = await prisma.user.findFirst({
        where: {
            refresh_token: refreshToken
        }
    });

    if (!user) {
        throw new ResponseError(403, 'Forbidden');
    }

    let accessToken;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new ResponseError(403, 'Forbidden');
        }
        const tokens = jwtSign(user.username, user.email, user.name);
        accessToken = tokens.accessToken;
    });  

    return accessToken;
}

export default {
    create,
    findByUsername,
    createTokens,
    refreshToken
}