import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';

export abstract class AuthDataSource {
  // abstract login(loginUserDto: LoginUserDto): Promise<User>;
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}
