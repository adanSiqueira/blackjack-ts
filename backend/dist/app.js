"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const health_routes_1 = __importDefault(require("./api/routes/health.routes"));
const game_routes_1 = __importDefault(require("./api/routes/game.routes"));
const error_middleware_1 = require("./api/middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/health', health_routes_1.default);
app.use('/api/game', game_routes_1.default);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
