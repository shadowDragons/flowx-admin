// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/auth/login */
export async function login(body: APIV2.LoginDto, options?: { [key: string]: any }) {
  return request<APIV2.LoginResult>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      "username": body.username,
      "password": body.password,
    },
    ...(options || {}),
  });
}

export function setToken(token:string): void {
  localStorage.setItem('token', token);
}

export function getToken(): string {
  var tk = localStorage.getItem('token');
  if (tk) {
    return tk as string;
  }

  return '';
}
