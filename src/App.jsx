import { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: '123' },
    { id: 1, content: '코딩 공부하기' },
    { id: 2, content: '잠 자기' },
  ]);

  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue('');
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  // 1. 변경점 : 수정 버튼을 클릭한 경우에만 input 이 보이게
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState();

  return (
    <li>
      {todo.content}

      {/* 1-2. 변경점 : 초기에 input 안보이게 */}
      {showEdit && <InputToDo />}

      <button
        onClick={() => {
          // 1-3. 변경점 : 토글 기능 (warring! input에 수정문을 넣어도 내용이 초기화됨)
          setShowEdit((prev) => !prev);
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, content: inputValue } : el
            )
          );
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

// 1-1. 변경점 : input 기능을 컴포넌트화
function InputToDo() {
  const [inputValue, setInputValue] = useState('');

  return (
    <input
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
}

export default App;
