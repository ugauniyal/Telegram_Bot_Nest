import { Controller, Get, Req, Res, UseGuards, Redirect } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return {msg: "Logged In"};
    }


    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return {msg: "OK"};
    }


    @Get('logout')
    @Redirect('/')
    async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
        // Clear the user session or token, if applicable
        // For example, if you're using session-based authentication:
        req.session.destroy((err) => {
          if (err) {
            console.error('Error destroying session:', err);
          }
        });
    }

    @Get('check-login')
    checkLogin(@Req() req: Request): string {
        // Check if a user is authenticated
        if (req.isAuthenticated()) {
        return 'You are logged in';
        } else {
        return 'You are not logged in';
        }
    }
}
