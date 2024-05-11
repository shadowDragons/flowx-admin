// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function roleCreate(
  body: APIV2.CreateRoleDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/role/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function roleFindAll(options?: { [key: string]: any }) {
    return request<any>('/api/role/list', {
      method: 'GET',
      ...(options || {}),
    });
  }

  export async function roleFindOne(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: APIV2.RoleFindOneParams,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/role/detail', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }
  
  export async function roleRemove(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: APIV2.RoleRemoveParams,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/role/delete', {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }

  export async function roleUpdate(
    body: APIV2.UpdateRoleDto,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/role/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }