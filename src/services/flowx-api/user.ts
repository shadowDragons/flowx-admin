// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function userCreate(
  body: APIV2.CreateUserDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function userFindAll(options?: { [key: string]: any }) {
    return request<any>('/api/user/list', {
      method: 'GET',
      ...(options || {}),
    });
  }
  