import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { Role } from '../entity/Role';
import { RolesEnum } from '../emuns/roles.enum';
interface SimplifiedUser {
  id: string;
  role: {
    id: string;
    name: RolesEnum;
  };
}
export class UserService {
  private userRepository: Repository<User>;
  private roleRepository: Repository<Role>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['role'] });
  }

  async getUserById(id: string): Promise<SimplifiedUser | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) return undefined;
    return {
      id: user.id,
      role: {
        id: user.role.id,
        name: user.role.name as RolesEnum,
      },
    };
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      this.userRepository.merge(user, data);
      return await this.userRepository.save(user);
    }
    return undefined;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected !== 0;
  }

  async getRoleById(id: string): Promise<Role | undefined> {
    const role = await this.roleRepository.findOneBy({ id });
    return role || undefined;
  }
}
