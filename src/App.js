import { useState, useRef } from "react";
import "./App.css";

import { Button } from "antd";
import "antd/dist/antd.css";
import { Input, Space, Table, Popconfirm, Modal } from "antd";

function App() {
  const [data, setData] = useState([
    { noteId: 1, title: "lorem", content: "lỏem" },
    { noteId: 2, title: "Ivanka", content: "Female" },
    { noteId: 3, title: "Kushner", content: "Male" },
  ]);
  const [tInput, setTInput] = useState("");
  const [CInput, setCInput] = useState("");
  const textInput = useRef(null);
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState({});

  const showModal = (model) => {
    console.log(textInput)
    setIsModalVisible(true);
    setEditModal(model);
  };

  const handleOk = () => {
    let newData = [...data];
    let index = -1;
    index = newData.indexOf(editModal);
    if (index !== -1)
      newData[index].content =
        textInput.current.resizableTextArea.textArea.value;
    setData(newData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a className="titleCol">{text}</a>,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space style={{ marginLeft: "-2%" }} size="middle">
          <Button onClick={() => showModal(record)}>Edit</Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteNote(record.noteId)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const deleteNote = (id) => {
    let newData = [...data];
    newData.forEach((e) => {
      if (e.noteId === id) newData.splice(newData.indexOf(e), 1);
    });
    setData(newData);
  };
  const handleClick = () => {
    let newNoteId = data[data.length - 1].noteId + 1;
    setData((prevVals) => [
      ...prevVals,
      { noteId: newNoteId, title: tInput, content: CInput },
    ]);
  };

  return (
    <div className="App">
      <div className="InputBar">
        <Input
          style={{ width: "20%", margin: "10px" }}
          placeholder="Title"
          onBlur={(e) => setTInput(e.target.value)}
        />
        <TextArea
          style={{ width: "60%", margin: "1%" }}
          placeholder="Content"
          onBlur={(e) => setCInput(e.target.value)}
        />
        <Button style={{ width: "10%" }} type="primary" onClick={handleClick}>
          Add
        </Button>
      </div>
      <div>
        <Table
          className="dataTable"
          columns={columns}
          dataSource={data}
          bordered
        />
      </div>
      <Modal
        title={editModal.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea ref={textInput} defaultValue={editModal.content}></TextArea>
      </Modal>
    </div>
  );
}

export default App;
