import { UserModel } from '../../data/mongodb';
import { BcryptAdapter } from '../../config/bcrypt';
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  User,
} from '../../domain';
import { UserMapper } from '../mappers/user.mapper';
import { LoginUserDto } from '../../domain/dtos';

type HashFunction = (password: string) => string;
type CompareFuntion = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFuntion = BcryptAdapter.compare
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (!exists) throw CustomError.badRequest('Usuario no encontrado');

      const isPasswordValid = this.comparePassword(password, exists.password);
      if (!isPasswordValid)
        throw CustomError.badRequest('Contraseña o correo incorrecto');

      return UserMapper.userEntityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('Prueba con otro correo');

      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
