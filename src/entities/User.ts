import { IsEmail, Length } from "class-validator";
import { Index } from "typeorm";
import { BeforeInsert } from "typeorm";
import { UpdateDateColumn } from "typeorm";
import { CreateDateColumn } from "typeorm";
import { BaseEntity } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

@Entity("users")
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Length(3, 255, { message: "Username must be at least 3 characters long" })
  @Column({ unique: true })
  username: string;

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  @Length(6, 255, { message: "Password must be at least 6 characters long" })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  toJSON() {
    return classToPlain(this);
  }
}
