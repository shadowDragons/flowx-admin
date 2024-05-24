// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

  export async function skillCreate(
    body: APIV2.CreateSkillDto,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/skill/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }

  export async function skillFindAll(params ?: APIV2.SkillFindAllParams, options?: { [key: string]: any }) {
    const res = await request<any>('/api/skill/list', {
      method: 'GET',
      params: params,
      ...(options || {}),
    });
    return res;
  }
  

  export async function skillSelect() {
    const res = await request<any>('/api/skill/select', {
      method: 'GET'
    });
    return res;
  }

  export async function skillUpdate(
    body: APIV2.UpdateSkillDto,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/skill/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }

  export async function skillDelete(
    body: APIV2.SkillFindAllParams,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/skill/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }