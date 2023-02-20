import { v4 as uuidv4 } from "uuid";
import api from "../../functions/api";
import alertProc from "../../functions/alertProc";
import TodoList from "../TodoList/TodoList";
import AddTodoListButton from "./AddTodoListButton";

const BoardArea = ({ boardState, setBoardStateWrapper }) => {
  // move these into App.js
  const fxAddTodoList = async () => {
    const listName = prompt("Enter List Name");
    if (!listName) return;
    const listId = uuidv4();
    const listObject = { listName, listId, listItems: [], editingName: false };
    const newState = [...boardState, listObject];
    await alertProc(api.createList(listObject));
    setBoardStateWrapper(newState);
  };

  const fxDeleteList = (x) => async () => {
    const promptValue = prompt(
      `Are you sure you want to delete list ${x.listName}? Type ${x.listName} to confirm`
    );
    if (promptValue === x.listName) {
      setBoardStateWrapper(boardState.filter((y) => y.listId !== x.listId));
      await alertProc(api.deleteList(x.listId));
    }
  };

  const fxAddListItem = (listId) => async () => {
    const listItem = prompt("Enter new item");
    if (!listItem) return;
    const newState = [];
    boardState.forEach((i) => {
      if (i.listId === listId) i.listItems.push(listItem);
      newState.push(i);
    });
    await alertProc(api.createListItem(listId, listItem));
    setBoardStateWrapper(newState);
  };

  const fxDeleteListItem = (listId) => (listItem) => async () => {
    const newState = [];
    boardState.forEach((x) => {
      if (x.listId === listId) {
        const newListObject = { ...x };
        newListObject.listItems = newListObject.listItems.filter(
          (y) => y !== listItem
        );
        console.log(newListObject);
        newState.push(newListObject);
      } else newState.push(x);
    });
    console.log(newState);
    await alertProc(api.deleteListItem(listId, listItem));
    setBoardStateWrapper(newState);
  };

  return (
    <div className="BoardArea">
      {boardState.map((x) => (
        <TodoList
          data={x}
          key={x.listId}
          turnOnEditing={() => {
            const newState = [...boardState].map((i) =>
              i.listId === x.listId ? { ...i, editingName: true } : i
            );
            setBoardStateWrapper(newState);
          }}
          turnOffEditing={(newListName) => {
            const newState = [...boardState].map((i) =>
              i.listId === x.listId
                ? { ...i, editingName: false, listName: newListName }
                : i
            );
            setBoardStateWrapper(newState);
          }}
          addListItem={fxAddListItem(x.listId)}
          deleteList={fxDeleteList(x)}
          deleteListItem={fxDeleteListItem(x.listId)}
        />
      ))}
      <AddTodoListButton onClick={fxAddTodoList} />
    </div>
  );
};

export default BoardArea;
