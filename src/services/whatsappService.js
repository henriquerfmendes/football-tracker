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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppService = void 0;
const venom = __importStar(require("venom-bot"));
class WhatsAppService {
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    multidevice: true,
                    folderNameToken: 'tokens',
                    headless: "new",
                    puppeteerOptions: {
                        args: [
                            "--no-sandbox",
                            "--disable-setuid-sandbox",
                            "--disable-dev-shm-usage",
                            "--disable-accelerated-2d-canvas",
                            "--no-first-run",
                            "--no-zygote",
                            "--single-process",
                            "--disable-gpu"
                        ],
                    }
                };
                const client = yield venom.create(Object.assign({ session: 'football-matches-tracker' }, options));
                return client;
            }
            catch (error) {
                console.error("Error creating WhatsApp client: ", error);
                throw error;
            }
        });
    }
    sendMessage(message_1) {
        return __awaiter(this, arguments, void 0, function* (message, testMode = false) {
            var _a;
            try {
                const client = yield this.initialize();
                let phoneNumbers = ((_a = process.env.PHONE_NUMBERS) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
                const results = [];
                if (testMode && phoneNumbers.length > 0) {
                    phoneNumbers = [phoneNumbers[0]];
                }
                for (const phone of phoneNumbers) {
                    try {
                        const result = yield client.sendText(`${phone.trim()}@c.us`, message);
                        results.push({ phone, success: true });
                    }
                    catch (error) {
                        console.error(`Error sending message to ${phone}: `, error);
                        results.push({
                            phone,
                            success: false,
                            error: error instanceof Error ? error.message : 'Unknown error'
                        });
                    }
                }
                return results;
            }
            catch (error) {
                console.error("Error sending messages: ", error);
                throw error;
            }
        });
    }
}
exports.WhatsAppService = WhatsAppService;
