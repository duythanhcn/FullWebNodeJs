# How to develop

**Let's started with a small API.**

Scenario: We need to code a module Category. This module is have 2 API:

1. query category
2. mutation createCategory

The main purpose of this page is a example. Through it, we hope it will make you understand more this structure. And how to write unit test, e2e test.

# Table of contents:

- [Coding and testing](#coding-and-testing)
- [Writing a simple API](#writing-a-simple-api)
- [Writing unit test]()
- [Writing e2e test]()

## Coding and testing

Scenario: We need to code a module Category. This module is have 2 API:

1. query category
2. mutation createCategory

```bash
- src
  |__app
  |  |__entities
  |    |__category.entity.ts # Define structure of table category.
  |____modules
      |__categories
      |  |__dto
      |  |  |__categories.dto.ts
      |  |__categories.module.ts
      |  |__categories.service.ts
      |  |__category.repository.ts
      |  |__categories.controller.ts
      |  |__ categories.controller.spec.ts # Unit test controller categories

```

### Writing a simple API

1. First of all, we need to define all column relate to table category.
   we create file `src/app/entities/category.entity.ts` with content such as below.

```js
import { Exclude } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ name: 'category_id' })
  categoryId: number;

  @IsNotEmpty({ message: 'Nick name can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false, name: 'category_name' })
  categoryName: string;

  @Exclude()
  @IsNotEmpty({ message: 'Password can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;
}
```

2. Create module category:

- Create modules `src/app/modules/category.module.ts`

```js
import { Module } from '@nestjs/common';

@Module({})
export class CategoriesModule {}
```

- Create repository Category

```js
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../vendors/model/baseRepository';
import { Category } from '../../entities/category.entity';

@EntityRepository(Category)
export class CategoriesRepository extends BaseRepository<Category> {}
```

- Create service Category

```js
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private userRepository: CategoriesRepository
  ) {}
}
```

- Create file controller.

### Writing unit test

- Please read more at `src/app/modules/categories/*spec.ts`

### Writing e2e test

- Please read more at `__tests__/categories/*`
