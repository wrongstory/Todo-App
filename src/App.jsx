import { useState } from 'react';
import './App.css';

function App() {
  // 2-1. 변경점 : 할 일 완료 체크를 위해 기본 상태에 isDone 추가
  const [todoList, setTodoList] = useState([
    { id: 0, content: '123', isDone: false },
    { id: 1, content: '코딩 공부하기', isDone: false },
    { id: 2, content: '잠 자기', isDone: false },
  ]);

  return (
    <div className="app-container">
      <h1>Todo Check List App</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="input-area">
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
    </div>
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
  // 1-5. 변경점 : useState() -> useState('') _ uncontrolled 에서 controlled로 상태 전환
  const [inputValue, setInputValue] = useState('');

  // 1-4. 변경점 : 토글 기능
  const handleEditToggle = () => {
    setShowEdit((prev) => !prev);
  };

  // 추가 변경점 : 수정 완료 함수 생성
  const handleEditDone = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: inputValue } : el
      )
    );
  };

  // 추가 변경점 : 체크박스 상태에 따라 isDone 변경 함수 생성
  const handleDoneChecked = () => {
    setTodoList((prev) =>
      prev.map((el) => (el.id === todo.id ? { ...el, isDone: !el.isDone } : el))
    );
  };

  // 추가 변경점 : 삭제 함수 생성
  const handleDelete = () => {
    setTodoList((prev) => {
      return prev.filter((el) => el.id !== todo.id);
    });
  };

  return (
    <li key={todo.id} className="listform">
      {/* 2. 변경점 : 체크박스 추가 */}
      <input
        className="checkbox"
        type="checkbox"
        checked={todo.isDone}
        onChange={() => {
          handleDoneChecked();
        }}
      />
      <span className={`text ${todo.isDone ? 'checked' : ''}`}>
        {todo.content}
      </span>
      {/* 1-2. 변경점 : 초기에 input 안보이게 */}
      {/* 1-5. 변경점 : props 추가에 맞게 여기도 props 전달 추가 */}
      {showEdit && (
        <InputToDo inputValue={inputValue} setInputValue={setInputValue} />
      )}
      <div className="button-group">
        <button
          onClick={() => {
            if (showEdit) {
              handleEditDone();
            }
            // 1-3. 변경점 : 토글 기능 (warring! input에 수정문을 넣어도 내용이 초기화됨)
            handleEditToggle();
          }}
        >
          {showEdit ? '수정완료' : '수정'}
        </button>
        <button
          className={todo.isDone ? 'delete-button active' : 'delete-button'}
          onClick={() => {
            // 추가 변경점 : 삭제 함수화
            handleDelete();
          }}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

// 1-5. 변경점 : input 기능을 컴포넌트화 -> 1-3 warring 해결을 위해 props 추가
function InputToDo({ inputValue, setInputValue }) {
  return (
    <input
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
}

export default App;
