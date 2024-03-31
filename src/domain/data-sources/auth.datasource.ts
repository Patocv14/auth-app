import { User } from '../entities/user.entity';
import { RegisterUserDto, LoginUserDto } from '../dtos/';

export abstract class AuthDataSource {
  abstract login(loginUserDto: LoginUserDto): Promise<User>;
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}
