export function setToken(token:string): void {
    localStorage.setItem('token', token);
  }
  
  export function getToken(): string {
    let tk = localStorage.getItem('token');
    if (tk) {
      return tk as string;
    }
  
    return '';
  }