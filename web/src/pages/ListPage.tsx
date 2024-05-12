import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import { isValidUUID } from "../services/utils";
import NotFound from "./NotFound";
import List from "../components/List";

export default function ListPage() {
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { loading, fetchItems } = useTodoContext();

  useEffect(() => {
    setNotFound(false);
    if (!id || !isValidUUID(id)) {
      setNotFound(true);
      return;
    }

    fetchItems(id).then((data) => {
      if (!data) {
        setNotFound(true);
        return;
      }
    });
  }, [id]);

  if (notFound) {
    return <NotFound />;
  }

  if (loading || !id) {
    return;
  }

  return <List id={id} />;
}
