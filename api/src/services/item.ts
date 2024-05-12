import prisma from "../db";

const getMaxOrderForItem = async (listId: string) => {
  const maxOrderNum = await prisma.item.aggregate({
    where: { listId },
    _max: {
      order: true,
    },
  });

  return maxOrderNum._max.order;
};

export const createNewItem = async (listId: string, text: string) => {
  const maxOrderNum = await getMaxOrderForItem(listId);
  const newOrder = maxOrderNum || 0;

  return prisma.item.create({
    data: { listId, text, order: newOrder + 1 },
  });
};

export const findItemById = async (id: string) => {
  return prisma.item.findFirst({
    where: { id },
  });
};

export const updateItemData = async (
  id: string,
  text: string,
  completed: boolean,
) => {
  return prisma.item.update({
    where: { id },
    data: { completed, text },
  });
};

export const deleteItemData = async (id: string) => {
  return prisma.item.delete({
    where: { id },
  });
};
