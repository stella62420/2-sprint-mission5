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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const auth_1 = require("../middleware/auth");
const controller = __importStar(require("./authController"));
const authRouter = express_1.default.Router();
function pickHandler(...names) {
    for (const n of names) {
        const fn = controller[n];
        if (typeof fn === 'function')
            return fn;
    }
    throw new Error(`[authRouter] handler not implemented: ${names.join(', ')}`);
}
authRouter.post('/register', (0, withAsync_1.withAsync)(pickHandler('register', 'signup', 'signUp')));
authRouter.post('/signup', (0, withAsync_1.withAsync)(pickHandler('signup', 'register', 'signUp')));
authRouter.post('/login', (0, withAsync_1.withAsync)(pickHandler('login', 'signin', 'signIn', 'logIn')));
const refresh = controller['refresh'];
if (typeof refresh === 'function')
    authRouter.post('/refresh', (0, withAsync_1.withAsync)(refresh));
const logout = controller['logout'];
if (typeof logout === 'function')
    authRouter.post('/logout', auth_1.authenticateUser, (0, withAsync_1.withAsync)(logout));
exports.default = authRouter;
