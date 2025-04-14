import { IWhatsAppService } from '../interfaces/IWhatsAppService';
import { SendResult } from '../types';
import * as venom from 'venom-bot';

export class WhatsAppService implements IWhatsAppService {
  async initialize(): Promise<any> {
    try {
      const options: any = {
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
      
      const client = await venom.create({
        session: 'football-matches-tracker',
        ...options
      });
      return client;
    } catch (error) {
      console.error("Error creating WhatsApp client: ", error);
      throw error;
    }
  }
  
  async sendMessage(message: string, testMode: boolean = false): Promise<SendResult[]> {
    try {
      const client = await this.initialize();
      let phoneNumbers = process.env.PHONE_NUMBERS?.split(',') || [];
      const results: SendResult[] = [];
      
      if (testMode && phoneNumbers.length > 0) {
        phoneNumbers = [phoneNumbers[0]];
      }
      
      for (const phone of phoneNumbers) {
        try {
          await client.sendText(`${phone.trim()}@c.us`, message);
          results.push({ phone, success: true });
        } catch (error) {
          console.error(`Error sending message to ${phone}: `, error);
          results.push({ 
            phone, 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error("Error sending messages: ", error);
      throw error;
    }
  }
} 