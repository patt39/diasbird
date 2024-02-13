import { Injectable } from '@nestjs/common';
import {
  CreateDeathsOptions,
  GetDeathsSelections,
  GetOneDeathSelections,
  UpdateDeathsOptions,
  UpdateDeathsSelections,
  DeathSelect,
} from './deaths.type';
import { DatabaseService } from '../../app/database/database.service';
import {
  WithPaginationResponse,
  withPagination,
} from '../../app/utils/pagination';
import { Prisma, Death } from '@prisma/client';

@Injectable()
export class DeathsService {
  constructor(private readonly client: DatabaseService) {}

  async findAll(
    selections: GetDeathsSelections,
  ): Promise<WithPaginationResponse | null> {
    const prismaWhere = {} as Prisma.DeathWhereInput;
    const { search, organizationId, pagination } = selections;

    if (search) {
      Object.assign(prismaWhere, {
        OR: [
          {
            code: { contains: search, mode: 'insensitive' },
          },
        ],
      });
    }

    if (organizationId) {
      Object.assign(prismaWhere, { organizationId });
    }

    const death = await this.client.death.findMany({
      where: { ...prismaWhere, deletedAt: null },
      take: pagination.take,
      skip: pagination.skip,
      select: DeathSelect,
      orderBy: pagination.orderBy,
    });

    const rowCount = await this.client.death.count({
      where: { ...prismaWhere, deletedAt: null },
    });

    return withPagination({
      pagination,
      rowCount,
      value: death,
    });
  }

  /** Find one death in database. */
  async findOneBy(selections: GetOneDeathSelections) {
    const prismaWhere = {} as Prisma.DeathWhereInput;
    const { deathId, organizationId } = selections;

    if (deathId) {
      Object.assign(prismaWhere, { id: deathId });
    }

    if (organizationId) {
      Object.assign(prismaWhere, { organizationId });
    }

    const death = await this.client.death.findFirst({
      where: { ...prismaWhere, deletedAt: null },
      select: DeathSelect,
    });

    return death;
  }

  /** Create one death in database. */
  async createOne(options: CreateDeathsOptions): Promise<Death> {
    const {
      date,
      cause,
      method,
      animalId,
      organizationId,
      userCreatedId,
      note,
    } = options;

    const death = this.client.death.create({
      data: {
        date,
        cause,
        method,
        animalId,
        organizationId,
        userCreatedId,
        note,
      },
    });

    return death;
  }

  /** Update one Death in database. */
  async updateOne(
    selections: UpdateDeathsSelections,
    options: UpdateDeathsOptions,
  ): Promise<Death> {
    const { deathId } = selections;
    const {
      date,
      cause,
      method,
      animalId,
      organizationId,
      userCreatedId,
      note,
      deletedAt,
    } = options;

    const death = this.client.death.update({
      where: {
        id: deathId,
      },
      data: {
        date,
        cause,
        method,
        animalId,
        organizationId,
        userCreatedId,
        note,
        deletedAt,
      },
    });

    return death;
  }
}
