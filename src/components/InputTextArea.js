import React, { useState } from "react";
import { Input, Button } from "antd";

const { TextArea } = Input;

const InputTextArea = ({ handleSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = e => {
    if (e.target.value.trim().length <= 140) {
      setInputValue(e.target.value);
    }
  };

  return (
    <div>
      <TextArea rows={4} onChange={handleChange} value={inputValue} />
      <span className="float-right">
        {inputValue.length === 140
          ? "You can't add more words"
          : `${140 - inputValue.length} to go`}
      </span>
      <Button
        className="flex-center mt-1"
        onClick={() => handleSubmit(inputValue)}
      >
        Post Tweet
      </Button>
    </div>
  );
};

export default InputTextArea;
