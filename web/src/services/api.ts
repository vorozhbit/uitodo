import { ListType, ListWithItemsType, TodoItem } from "../types";

export const apiUrl: string =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createNewList = async (title: string) => {
  try {
    const response = await fetch(`${apiUrl}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });

    if (!response.ok) {
      console.log(
        `Unable to submit data. ${response.status}: ${response.statusText}`,
        { status: response.status },
      );
      return;
    }

    const data = (await response.json()) as ListType;

    if (!data) {
      console.log("No data in response");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateListById = async (id: string, title: string) => {
  try {
    const response = await fetch(`${apiUrl}/lists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });

    if (!response.ok) {
      console.log(
        `Unable to update list. ${response.status}: ${response.statusText}`,
        { status: response.status },
      );
      return;
    }

    const data = (await response.json()) as ListType;

    if (!data) {
      console.log("No data in response");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getListById = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/lists/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(
        `Unable to fetch data. ${response.status}: ${response.statusText}`,
        { status: response.status },
      );
      return;
    }

    const data = (await response.json()) as ListWithItemsType;

    if (!data) {
      console.log("No data in response");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLists = async () => {
  try {
    const response = await fetch(`${apiUrl}/lists/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(
        `Unable to fetch data. ${response.status}: ${response.statusText}`,
        { status: response.status },
      );
      return;
    }

    const data = (await response.json()) as ListType[];

    if (!data) {
      console.log("No data in response");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewItem = async (listId: string, text: string) => {
  try {
    const response = await fetch(`${apiUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listId,
        text,
      }),
    });

    if (!response.ok) {
      console.log(
        `Unable to submit data. ${response.status}: ${response.statusText}`,
        { status: response.status },
      );
      return;
    }

    const data = (await response.json()) as TodoItem;

    if (!data) {
      console.log("No data in response");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateItemById = async (
  id: string,
  completed: boolean,
  text: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed,
        text,
      }),
    });

    if (!response.ok) {
      console.log(
        `Unable to update item. ${response.status}: ${response.statusText}`,
        { status: response.status },
      );
      return;
    }

    const data = (await response.json()) as TodoItem;

    if (!data) {
      console.log("No data in response");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemById = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(
        `Unable to delete item. ${response.status}: ${response.statusText}`,
        { status: response.status },
      );
      return;
    }

    const data = (await response.json()) as TodoItem;

    if (!data) {
      console.log("No data in response");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
