import { Injectable, Logger } from '@nestjs/common';

const TelegramBot = require('node-telegram-bot-api');

const token = "6435928563:AAFkMyveQVUaPnvyiu6QDjdspWf3fvl8kYA";

const request = require('request');

@Injectable()
export class TelegramService {
    private readonly bot:any;

    private logger = new Logger(TelegramService.name)

    constructor() {
        this.bot = new TelegramBot(token, {polling: true});

        this.bot.on("message",this.onReceiveMessage);
    }

    sendMessageToUser = (userId:string,message:string)=>{
        this.bot.sendMessage(userId, message);
    }

    onReceiveMessage = (msg:any)=>{

        const TEST_USER_ID = msg.chat.id;

        console.log(TEST_USER_ID);

        this.logger.debug(msg);

        const city = msg.text;

        const UrlID = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=dd6c78e623ca0fdd3d02505b22f92226`;

        this.bot.sendMessage(TEST_USER_ID, `Hello`);

        request(UrlID, (error, response, body) => { // Use an arrow function here

            if (!error && response.statusCode === 200) {
                const bodyData = JSON.parse(body);

                if (bodyData.error) {
                    this.bot.sendMessage(TEST_USER_ID, `Data not found.`);
                    return;
                }

                const temperature = (bodyData.main.temp - 273.15).toFixed(2);
                const description = bodyData.weather[0].description;

                // console.log(temperature);
                // console.log(description);

                this.bot.sendMessage(TEST_USER_ID, `Weather in ${city}: `);
                this.bot.sendMessage(TEST_USER_ID, `Temperature: ${temperature} °C`);
                this.bot.sendMessage(TEST_USER_ID, `Description: ${description}`);
            } else {
                this.bot.sendMessage(TEST_USER_ID, `Error fetching the data.`);
                console.log("Error: ", error);
            }
        });
    }
}
