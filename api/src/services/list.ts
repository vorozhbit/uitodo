import prisma from "../db";

export const createNewList = async (title: string) => {
  return prisma.list.create({
    data: { title },
  });
};

export const findListById = async (id: string, includeItems = false) => {
  const query = {
    where: { id },
    include: {},
  };

  if (includeItems) {
    query.include = {
      items: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          text: true,
          order: true,
          completed: true,
        },
      },
    };
  }

  return prisma.list.findFirst(query);
};

export const updateListData = async (id: string, title: string) => {
  return prisma.list.update({
    where: { id },
    data: { title },
  });
};

export const findAllLists = async () => {
  return prisma.list.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
};
