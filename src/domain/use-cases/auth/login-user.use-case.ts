import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);

    const token = await this.signToken({ id: user.id }, '30d');
    if (!token) throw CustomError.internalServer('Hubo un error');

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
