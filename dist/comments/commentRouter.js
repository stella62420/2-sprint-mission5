"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const auth_1 = require("../middleware/auth");
const commentController_1 = require("./commentController");
const commentsRouter = express_1.default.Router();
commentsRouter.get('/', auth_1.optionalAuthenticateUser, (0, withAsync_1.withAsync)(commentController_1.getCommentList));
commentsRouter.get('/:id', auth_1.optionalAuthenticateUser, (0, withAsync_1.withAsync)(commentController_1.getComment));
commentsRouter.post('/', auth_1.authenticateUser, (0, withAsync_1.withAsync)(commentController_1.createComment));
commentsRouter.patch('/:id', auth_1.authenticateUser, (0, withAsync_1.withAsync)(commentController_1.updateComment));
commentsRouter.delete('/:id', auth_1.authenticateUser, (0, withAsync_1.withAsync)(commentController_1.deleteComment));
exports.default = commentsRouter;
