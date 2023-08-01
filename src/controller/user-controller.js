import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const user = await userService.create(req.body);

        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = await userService.createTokens(req.body);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        });

        res.status(200).json({
            data: { accessToken }
        });
    } catch (error) {
        next(error);
    }
}

const profile = async (req, res, next) => {
    try {
        const username = req.user.username;
        const user = await userService.findByUsername(username);
        delete user.password;
        delete user.refresh_token;

        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error);
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const accessToken = await userService.refreshToken(req.cookies.refreshToken);
        res.status(200).json({
            data: { accessToken }
        });
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    
    try {
        const username = req.user.username;
        await userService.logout(username);
        res.clearCookie('refreshToken')

        res.status(200).json({
            message: "User has been logged out"
        });
    } catch (error) {
        next(error)
    }
}

const uploadAvatar = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "Avatar has been uploaded"
        });
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login,
    profile,
    refreshToken,
    logout,
    uploadAvatar
}