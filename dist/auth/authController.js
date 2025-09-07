"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
const superstruct_1 = require("superstruct");
const auth_structs_1 = require("./auth.structs");
const service = __importStar(require("./authService"));
function pickId(obj) {
    return obj?.id ?? obj?.data?.id ?? obj?.user?.id;
}
function pickToken(obj) {
    return obj?.token ?? obj?.accessToken ?? obj?.data?.token;
}
async function signup(req, res, next) {
    try {
        const body = (0, superstruct_1.create)(req.body ?? {}, auth_structs_1.RegisterBodyStruct);
        const fn = service.signup ??
            service.register ??
            service.signUp;
        if (typeof fn !== 'function')
            throw new Error('authService.signup not implemented');
        const created = await fn(body);
        res.status(201).json({ id: pickId(created) });
    }
    catch (e) {
        if (e?.name === 'StructError') {
            return res.status(400).json({ message: e.message ?? 'Bad Request' });
        }
        const status = typeof e?.status === 'number' ? e.status : 0;
        if (status === 400)
            return res.status(400).json({ message: e.message ?? 'Bad Request' });
        next(e);
    }
}
async function login(req, res, next) {
    try {
        const body = (0, superstruct_1.create)(req.body ?? {}, auth_structs_1.LoginBodyStruct);
        const fn = service.login ??
            service.signin ??
            service.signIn ??
            service.logIn;
        if (typeof fn !== 'function')
            throw new Error('authService.login not implemented');
        const result = await fn(body);
        res.status(200).json({ token: pickToken(result) });
    }
    catch (e) {
        if (e?.name === 'StructError') {
            return res.status(400).json({ message: e.message ?? 'Bad Request' });
        }
        const status = typeof e?.status === 'number' ? e.status : 0;
        if (status === 401)
            return res.status(401).json({ message: 'Unauthorized' });
        if (status === 400)
            return res.status(400).json({ message: e.message ?? 'Bad Request' });
        next(e);
    }
}
exports.default = { signup, login };
