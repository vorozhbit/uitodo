import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useTodoContext } from "../context/TodoContext";

export const wsUrl: string =
  import.meta.env.VITE_WS_URL || "http://localhost:5000";

type PropsType = {
  id?: string;
};

export default function useSocket({ id }: PropsType) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { addItem, updateItemInList, removeItemFromList, updateListInLists } =
    useTodoContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    const socketInstance = io(wsUrl, { query: { id } });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("item", (dt) => addItem(dt));
    socket.on("item-update", (dt) => updateItemInList(dt));
    socket.on("item-delete", (id) => removeItemFromList(id));
    socket.on("list-update", (list) => updateListInLists(list));

    return () => {
      socket.off("item");
      socket.off("item-update");
      socket.off("item-delete");
      socket.off("list-update");
    };
  }, [socket]);

  return socket;
}
