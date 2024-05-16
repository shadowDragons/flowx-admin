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

  export async function roleFindAll(params ?: APIV2.RoleFindAllParams, options?: { [key: string]: any }) {
    const res = await request<any>('/api/role/list', {
      method: 'GET',
      params: params,
      ...(options || {}),
    });
    return res;
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

  export async function roleDelete(
    body: APIV2.RoleFindAllParams,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/role/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }