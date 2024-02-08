import { Animal } from '@prisma/client';
import { PaginationType } from '../../app/utils/pagination/with-pagination';

export type GetAnimalsSelections = {
  search?: string;
  organizationId: string;
  pagination?: PaginationType;
};

export type GetOneAnimalsSelections = {
  animalId?: Animal['id'];
  code?: Animal['code'];
  gender?: Animal['gender'];
  electronicCode?: Animal['electronicCode'];
  type?: Animal['type'];
  deletedAt?: Animal['deletedAt'];
  status?: Animal['status'];
  productionPhase?: Animal['productionPhase'];
  organizationId?: Animal['organizationId'];
};

export type UpdateAnimalsSelections = {
  animalId: Animal['id'];
};

export type CreateAnimalsOptions = Partial<Animal>;

export type UpdateAnimalsOptions = Partial<Animal>;

export const AnimalSelect = {
  createdAt: true,
  id: true,
  code: true,
  type: true,
  gender: true,
  weight: true,
  status: true,
  birthday: true,
  codeFather: true,
  codeMother: true,
  productionPhase: true,
  electronicCode: true,
  locationId: true,
  location: {
    select: {
      number: true,
      type: true,
      productionPhase: true,
    },
  },
  breedId: true,
  breed: {
    select: {
      name: true,
    },
  },
  _count: {
    select: {
      milkings: true,
      weanings: true,
      gestations: true,
      farrowings: true,
      treatments: true,
    },
  },
};
