import { Injectable } from '@nestjs/common';
import { Location, Prisma } from '@prisma/client';
import { DatabaseService } from '../../app/database/database.service';
import {
  WithPaginationResponse,
  withPagination,
} from '../../app/utils/pagination';
import {
  CreateLocationsOptions,
  GetLocationsSelections,
  GetOneLocationsSelections,
  LocationsSelect,
  UpdateLocationsOptions,
  UpdateLocationsSelections,
} from './locations.type';

@Injectable()
export class LocationsService {
  constructor(private readonly client: DatabaseService) {}

  async findAll(
    selections: GetLocationsSelections,
  ): Promise<WithPaginationResponse | null> {
    const prismaWhere = {} as Prisma.LocationWhereInput;
    const { search, pagination } = selections;

    if (search) {
      Object.assign(prismaWhere, {
        OR: [
          {
            productionPhase: { contains: search, mode: 'insensitive' },
          },
          {
            type: { contains: search, mode: 'insensitive' },
          },
        ],
      });
    }

    const locations = await this.client.location.findMany({
      where: { ...prismaWhere, deletedAt: null },
      take: pagination.take,
      skip: pagination.skip,
      select: LocationsSelect,
      orderBy: pagination.orderBy,
    });

    const rowCount = await this.client.location.count({
      where: { ...prismaWhere, deletedAt: null },
    });

    return withPagination({
      pagination,
      rowCount,
      value: locations,
    });
  }

  /** Find one location in database. */
  async findOneBy(selections: GetOneLocationsSelections) {
    const prismaWhere = {} as Prisma.LocationWhereInput;

    const { locationId, type, number, productionPhase, organizationId } =
      selections;

    if (locationId) {
      Object.assign(prismaWhere, { id: locationId });
    }

    if (organizationId) {
      Object.assign(prismaWhere, { organizationId });
    }

    if (type) {
      Object.assign(prismaWhere, { type });
    }

    if (number) {
      Object.assign(prismaWhere, { number });
    }

    if (productionPhase) {
      Object.assign(prismaWhere, { productionPhase });
    }

    const location = await this.client.location.findFirst({
      where: { ...prismaWhere, deletedAt: null },
      select: LocationsSelect,
    });

    return location;
  }

  /** Create one location in database. */
  async createOne(options: CreateLocationsOptions): Promise<Location> {
    const {
      squareMeter,
      manger,
      through,
      number,
      type,
      productionPhase,
      organizationId,
    } = options;

    const location = this.client.location.create({
      data: {
        squareMeter,
        manger,
        through,
        number,
        type,
        productionPhase,
        organizationId,
      },
    });

    return location;
  }

  /** Update one location in database. */
  async updateOne(
    selections: UpdateLocationsSelections,
    options: UpdateLocationsOptions,
  ): Promise<Location> {
    const { locationId } = selections;
    const { squareMeter, manger, through, number, organizationId, deletedAt } =
      options;

    const location = this.client.location.update({
      where: {
        id: locationId,
      },
      data: {
        squareMeter,
        manger,
        through,
        number,
        organizationId,
        deletedAt,
      },
    });

    return location;
  }
}
