import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Role } from '../entity/Role';

export class RoleService {
  private roleRepository: Repository<Role>;
  constructor() {
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  async createRole(roleData: Partial<Role>): Promise<Role> {
    const newRole = this.roleRepository.create(roleData);
    return await this.roleRepository.save(newRole);
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
  async deleteRole(id: string): Promise<boolean> {
    const result = await this.roleRepository.delete(id);
    return result.affected !== 0;
  }
}
