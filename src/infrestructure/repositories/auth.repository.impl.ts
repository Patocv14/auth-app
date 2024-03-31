import {
  AuthDataSource,
  AuthRepository,
  RegisterUserDto,
  User,
} from '../../domain';
import { LoginUserDto } from '../../domain/dtos';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDataSource) {}
  login(loginUserDto: LoginUserDto): Promise<User> {
    return this.authDatasource.login(loginUserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.authDatasource.register(registerUserDto);
  }
}
