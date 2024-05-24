// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';


  export async function projectTagCreate(
    body: APIV2.CreateProjectTagDto,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/project-tag/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }

  export async function projectTagFindAll(params ?: APIV2.ProjectTagFindAllParams, options?: { [key: string]: any }) {
    const res = await request<any>('/api/project-tag/list', {
      method: 'GET',
      params: params,
      ...(options || {}),
    });
    return res;
  }

  export async function projectTagSelect() {
    const res = await request<any>('/api/project-tag/select', {
      method: 'GET'
    });
    return res;
  }

  export async function projectTagUpdate(
    body: APIV2.UpdateProjectTagDto,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/project-tag/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }

  export async function projectTagDelete(
    body: APIV2.ProjectTagFindAllParams,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/project-tag/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }


  export async function projectCreate(
    body: APIV2.CreateProjectDto,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }

  export async function projectFindAll(params ?: APIV2.ProjectFindAllParams, options?: { [key: string]: any }) {
    const res = await request<any>('/api/project/list', {
      method: 'GET',
      params: params,
      ...(options || {}),
    });
    return res;
  }

  export async function projectUpdate(
    body: APIV2.UpdateProjectDto,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/project/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }

  export async function projectDelete(
    body: APIV2.ProjectFindAllParams,
    options?: { [key: string]: any },
  ) {
    return request<any>('/api/project/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }