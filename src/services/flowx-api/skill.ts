// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/skill/create */
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

export async function skilFindAll(options?: { [key: string]: any }) {
    return request<any>('/api/skill/list', {
      method: 'GET',
      ...(options || {}),
    });
  }
  

  export async function skillFindOne(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: APIV2.SkillFindOneParams,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/skill/detail', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }

  export async function skillRemove(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: APIV2.SkillRemoveParams,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/skill/delete', {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    });
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