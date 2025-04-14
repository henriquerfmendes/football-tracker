import { SendResult } from "../types";

export interface IWhatsAppService {
  initialize: () => Promise<any>;
  sendMessage: (message: string, testMode: boolean) => Promise<SendResult[]>;
}
