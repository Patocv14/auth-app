import { User } from '../entities/user.entity';
import { LoginUserDto, RegisterUserDto } from '../dtos';

export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<User>;
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}
