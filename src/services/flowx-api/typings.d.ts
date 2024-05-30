import { UploadFile } from "antd";

declare namespace APIV2 {
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type SelectItemDto = {
    label: string;
    value: number;
  };
  
  type CreateProjectDto = {
    /** 项目标题 */
    title: string;
    /** 项目描述 */
    description: string;
    /** 标签 */
    tags: number[];
    /** 图片 */
    imgs: number[];
    /** 技能 */
    skills: number[];
  };

  type UpdateProjectDto = {
    /** 项目标题 */
    title: string;
    /** 项目描述 */
    description: string;
    /** 标签 */
    tags: number[];
    /** 图片 */
    imgs: number[];
    fileList: UploadFile[];
    /** 技能 */
    skills: number[];
    /** id */
    id: number;
  };

  type ProjcetListItem = {
    /** 项目标题 */
    title: string;
    /** 项目描述 */
    description: string;
    /** 标签 */
    tags: ProjcetTagListItem[];
    /** 图片 */
    imgs: ProjectImgListItem[];
    /** 技能 */
    skills: SkillListItem[];
    /** id */
    id: number;
  };

  interface ProjectFindAllParams extends PageParams {
    name?: string;
    ids: number[];
  };

  
  type ProjectImgListItem = {
    id: number;
    path: string;
  };


  type CreateRoleDto = {
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
    status: string,
    type: string,
    access_token?: string;
  };

  type CurrentUser = {
    name?: string;
    roles?: string[]
  };



  type RoleFindOneParams = {
    /** id */
    id: number;
  };

  type RoleRemoveParams = {
    /** id */
    id: number;
  };

  type UpdateRoleDto = {
    /** 名称 */
    name: string;
    /** id */
    id: number;
  };

  interface ProjectTagFindAllParams extends PageParams {
    name?: string;
    ids: number[];
  };

  type ProjectTagRemoveParams = {
    /** id */
    id: number;
  };

  type ProjcetTagListItem = {
    id: number;
    name: string;
  };

  type CreateProjectTagDto = {
    /** 名称 */
    name: string;
  };

  type UpdateProjectTagDto = {
    /** 名称 */
    name: string;
    /** id */
    id: number;
  };

  interface SkillFindAllParams extends PageParams {
    name?: string;
    ids: number[];
  };

  type SkillRemoveParams = {
    /** id */
    id: number;
  };

  type SkillListItem = {
    id: number;
    name: string;
  };

  type CreateSkillDto = {
    /** 名称 */
    name: string;
  };

  type UpdateSkillDto = {
    /** 名称 */
    name: string;
    /** id */
    id: number;
  };

  interface RoleFindAllParams extends PageParams {
    name?: string;
    ids: number[];
  };

  type RoleRemoveParams = {
    /** id */
    id: number;
  };

  type RoleListItem = {
    id: number;
    name: string;
  };

  type CreateRoleDto = {
    /** 名称 */
    name: string;
  };

  type UpdateRoleDto = {
    /** 名称 */
    name: string;
    /** id */
    id: number;
  };

}
