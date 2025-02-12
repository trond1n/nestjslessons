import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.servise";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('get-all-users')
    getUsers() {
        return this.userService.getUsers()
    }
}
