import { Controller, Get, Param, Render, Res, Post, Body, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as fs from 'fs';


@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get()
  @Render('admin')
  async adminPanel() {
    const users = await this.userRepository.find();
    return { title: 'Admin Panel', users };
  }

  @Get('block/:id')
  async blockUser(@Param('id') id: number, @Res() res: Response) {
    try {
      // Fetch the user by ID from the database
      const user = await this.userRepository.findOneBy({id});

      if (!user) {
        // Handle user not found
        return res.status(404).send('User not found');
      }

      // Update the user's status to 'blocked' (or set an appropriate flag in your entity)
      user.status = 'blocked';

      // Save the updated user to the database
      await this.userRepository.save(user);

      // Redirect back to the admin panel or user list
      return res.redirect('/admin');
    } catch (error) {
      // Handle errors (e.g., database errors)
      console.error('Error blocking user:', error);
      return res.status(500).send('Internal server error');
    }
  }

  @Get('delete/:id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    try {
      // Fetch the user by ID from the database
      const user = await this.userRepository.findOneBy({id});

      if (!user) {
        // Handle user not found
        return res.status(404).send('User not found');
      }

      // Delete the user from the database
      await this.userRepository.remove(user);

      // Redirect back to the admin panel or user list
      return res.redirect('/admin');
    } catch (error) {
      // Handle errors (e.g., database errors)
      console.error('Error deleting user:', error);
      return res.status(500).send('Internal server error');
    }
  }

  @Post('api-key')
  updateApiKey(@Body() newApiKey: { apiKey: string }): string {

    const updatedApiKey = newApiKey.apiKey;
    console.log(updatedApiKey);

    try {

      const envFileContent = fs.readFileSync('.env', 'utf-8');

      const lines = envFileContent.split('\n');
      let updatedEnvContent = '';
      for (const line of lines) {
        console.log(line);
        if (line.startsWith('TELEGRAM_TOKEN')) {
          updatedEnvContent += `TELEGRAM_TOKEN = ${updatedApiKey}\n`;
        } else {
          updatedEnvContent += `${line}\n`;
        }
      }
      fs.writeFileSync('.env', updatedEnvContent);

    } catch (error) {

        console.error('Error updating .env file:', error);
        return 'API key update failed';
    }

    return 'API key updated successfully';
  }
}