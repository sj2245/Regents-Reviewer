export const Roles = {
  Quiz_Taker: {
    level: 1,
    name: `Quiz Taker`,
  },
  Quiz_Maker: {
    level: 2,
    name: `Quiz Maker`,
  },
  Developer: {
    level: 3,
    name: `Developer`,
  },
}

export class User {
  id: string = ``;
  uid: string = ``;
  index: number = 1;
  email: string = ``;
  displayName: string = ``;
  provider: string = `Firebase`;
  role: string = Roles.Quiz_Taker.name;
  level: number = Roles.Quiz_Taker.level;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
    let currentTimeStampNoSpaces = new Date().toLocaleString().replaceAll(` `, `_`).replaceAll(`,`, `_`).replaceAll(`/`, `_`).replaceAll(`:`, `_`);
    if (!this.displayName || this.displayName == ``) this.displayName = this.email.split(`@`)[0];
    if (!this.id || this.id == ``) this.id = `User_${this.index}_${this.displayName}_${currentTimeStampNoSpaces}_${this.uid}`;
  }
}