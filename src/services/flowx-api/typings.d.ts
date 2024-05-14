declare namespace APIV2 {
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  
  type CreateProjectDto = {
    /** 项目标题 */
    title: string;
    /** 项目描述 */
    description: string;
    /** 标签 */
    tags: string[];
    /** 图片 */
    imgs: string[];
    /** 技能 */
    skills: string[];
  };

  type CreateProjectTagDto = {
    /** 名称 */
    name: string;
  };

  type CreateRoleDto = {
    /** 名称 */
    name: string;
  };

  type CreateSkillDto = {
    /** 名称 */
    name: string;
  };

  type CreateUserDto = {
    /** 姓名 */
    username: string;
    /** 密码 */
    pass: string;
    /** 角色 */
    roles: string[];
  };

  type LoginDto = {
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 类型 */
    type?: string;
    /** 自动登录 */
    autoLogin?: boolean;
  };

  type LoginResult = {
    access_token: string;
  };

  type CurrentUser = {
    name?: string;
    roles?: string[]
  };

  
  interface ProjectTagFindAllParams extends PageParams {
    name?: string;
    ids: number[];
  };

  type ProjectTagFindOneParams = {
    /** id */
    id: number;
  };

  type ProjectTagRemoveParams = {
    /** id */
    id: number;
  };

  type ProjcetTagListItem = {
    id: number;
    name: string;
  };

  type RoleFindOneParams = {
    /** id */
    id: number;
  };

  type RoleRemoveParams = {
    /** id */
    id: number;
  };

  type SkillFindOneParams = {
    /** id */
    id: number;
  };

  type SkillRemoveParams = {
    /** id */
    id: number;
  };

  type UpdateProjectTagDto = {
    /** 名称 */
    name: string;
    /** id */
    id: number;
  };

  type UpdateRoleDto = {
    /** 名称 */
    name: string;
    /** id */
    id: number;
  };

  type UpdateSkillDto = {
    /** 名称 */
    name: string;
    /** id */
    id: number;
  };
}
