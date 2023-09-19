import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('api/auth')
export class AuthController {

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return {msg: "Logged in"};
    }


    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return {msg: "OK"};
    }
}
