import { useTodoContext } from "../context/TodoContext";

export default function IndexPage() {
  const { lists } = useTodoContext();
  return (
    <>
      <div className="py-5 font-uibold text-[26px]">Hey! 👋</div>
      {lists.length > 0 ? (
        <div>
          Select a <strong>To-Do List</strong> or create a new one to start.
        </div>
      ) : (
        <div>
          Create a new <strong>To-Do List</strong> to start.
        </div>
      )}
    </>
  );
}
