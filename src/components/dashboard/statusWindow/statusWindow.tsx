import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import "./statusWindow.css";
import { updateUserStatus } from "../../../actions/user.action";
import { AppStateType } from "../../../store";
import { connect } from "react-redux";
import { updateStatusFormDataType } from "../../../actions/user.action";

interface IStatusWindow {
  status: string;
  updateUserStatus: (obj: updateStatusFormDataType) => void;
  isStatusWindow: boolean;
  setIsStatusWindow: any;
}

const StatusWindow: React.FC<IStatusWindow> = ({
  status,
  updateUserStatus,
  isStatusWindow,
  setIsStatusWindow,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(status);
  if (inputValue.length > 60) {
    setInputValue((state) => state.substr(0, 60));
  }
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isStatusWindow && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStatusWindow]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsStatusWindow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsStatusWindow]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await updateUserStatus({ status: inputValue });
    setIsLoading(false);
    setIsStatusWindow(false);
  };

  return (
    <div className="editor" ref={divRef}>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
              e.target.select();
            }}
            autoFocus
            className="editor-input"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            }}
          />
        </Form.Field>
        <div className="editor-panel">
          <Button loading={isLoading} type="submit">
            Save
          </Button>
          <p className="editor-panel__message">
            Left {60 - inputValue.length} symbols
          </p>
        </div>
      </Form>
    </div>
  );
};
const mapStateToProps = (state: AppStateType) => ({
  status: state.user.status,
});
export default connect(mapStateToProps, { updateUserStatus })(StatusWindow);
