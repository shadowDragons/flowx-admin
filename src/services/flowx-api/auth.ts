// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/auth/login */
export async function login(body: APIV2.LoginDto, options?: { [key: string]: any }) {
  return request<any>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      "username": body.username,
      "pass": body.password,
    },
    ...(options || {}),
  });
}
