import { Button, FormGroup, Input, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export const InputMessage = () => {
  const [title, setTitle] = useState("title");
  const [body, setBody] = useState("body");

  const submit = async () => {
    await axios.post("http://localhost:3030/send-message", { title, body });
  };
  return (
    <div className="container mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="flex justify-center">
          <FormGroup className=" mt-[5rem]  w-full rounded-lg bg-white p-[5rem] shadow-2xl md:w-2/3">
            <TextField
              label={"Title"}
              id="title"
              margin="normal"
              value={title}
              onChange={({ target: { value } }) => {
                setTitle(value);
              }}
            />
            <TextField
              label={"Body"}
              id="body"
              margin="normal"
              value={body}
              onChange={({ target: { value } }) => {
                setBody(value);
              }}
            />
            <div className="mt-5 flex justify-center">
              <Button type="submit" variant="text">
                <span className="text-[5rem]">✉️</span>
              </Button>
            </div>
          </FormGroup>
        </div>
      </form>
    </div>
  );
};
