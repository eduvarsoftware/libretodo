import { unicodeCrossMark } from "../../constants/characters";
import { v4 } from "uuid";
const TodoList = ({
  data,
  deleteList,
  addListItem,
  deleteListItem,
  turnOnEditing,
  turnOffEditing,
}) => (
  <div className="TodoList">
    <div className="TodoListHeader">
      {data.editingName ? (
        <input
          defaultValue={data.listName}
          onKeyUp={(e) =>
            e.key === "Enter" ? turnOffEditing(e.target.value) : null
          }
        ></input>
      ) : (
        <div className="TodoListHeaderText">
          {data.listName} <span class="TodoListHeaderEditButton" onClick={turnOnEditing}>[edit]</span>
        </div>
      )}
      <div className="TodoListAddItemButton" onClick={addListItem}>
        +
      </div>
      <div className="TodoListDeleteButton" onClick={deleteList}>
        {unicodeCrossMark}
      </div>
    </div>
    {data.listItems
      // .map((x) => ({ key: x, item: x }))
      .map((x) => ({ key: v4(), item: x }))
      .map((x) => (
        <div className="TodoListItem" key={x.key}>
          <div className="TodoListItemText">{x.item}</div>
          <div className="TodoListItemDelete" onClick={deleteListItem(x.item)}>
            {unicodeCrossMark}
          </div>
        </div>
      ))}
  </div>
);

export default TodoList;
