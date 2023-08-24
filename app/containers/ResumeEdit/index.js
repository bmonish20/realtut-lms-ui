/**
 *
 * ResumeEdit
 *
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
import { Container, Row, Button } from "reactstrap";
import "./resumeEditStyle.scss";
import * as operations from "./actions";
import reducer from "./reducer";
import { accept } from "./constants";
import * as selectors from "./selectors";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import NotificationAlert from "react-notification-alert";

export default function ResumeEdit() {
  useInjectReducer({ key: "resumeEdit", reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);
  const loggedUserEmail = selectors.loggedUserEmail(cookie);
  const resumeUploadState = useSelector((state) =>
    get(state, "resumeEdit", {})
  );
  const [isUploadResumeSuccess, changeUploadResumeSuccess] = useState(false);
  const [resumeUrl, changeResumeUrl] = useState("");
  const [isLoading, changeLoading] = useState(false);
  const uploadFile = (e) => {
    dispatch(operations.uploadResume({ file: e[0], email: loggedUserEmail }));
  };

  const onDrop = useCallback((acceptedFiles) => {}, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDrop, accept, multiple: false });

  let acceptedFileItems =
    acceptedFiles != undefined
      ? acceptedFiles.map((file, i) => <a key={file.path}>{file.path}</a>)
      : [];

  var options = {};
  options = {
    place: "br",
    message: (
      <div className="alert-text">
        <span className="alert-title" data-notify="title">
          {" "}
          Resume uploaded successfully!
        </span>
      </div>
    ),
    type: "success",
    autoDismiss: 7,
  };
  const notificationAlertRef = useRef(null);

  useEffect(() => {
    if (resumeUploadState.isUploadResumeSuccess) {
      changeUploadResumeSuccess(
        selectors.isUploadResumeSuccess(resumeUploadState)
      );
    }
    changeResumeUrl(selectors.resumeUrl(resumeUploadState));
  }, [resumeUploadState]);

  useEffect(() => {
    return function cleanup() {
      dispatch(operations.resetState());
    };
  }, []);

  const openDocument = (e) => {
    if (isEmpty(resumeUrl)) {
      e.preventDefault();
      return;
    }
    window.open(resumeUrl, "_blank");
  };

  useEffect(() => {
    if (isUploadResumeSuccess) {
      notificationAlertRef.current.notificationAlert(options);
    }
  }, [isUploadResumeSuccess]);

  return (
    <>
      <Container>
        <div className="rna-wrapper">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <div
          {...getRootProps({ className: "dropzone" })}
          className="m-6  dz-drag-hover dz-preview-img  dz-message dropzone"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag and drop your resume here, or click to select files. (Maximum
              file size: 5MB)
            </p>
          )}
        </div>

        <div>
          {!isEmpty(resumeUrl) && (
            <div>(click on the file name to view/download the document)</div>
          )}
          {acceptedFiles.length > 0 && (
            <>
              Uploaded File -{" "}
              <Button color="link" onClick={(e) => openDocument(e)}>
                {" "}
                {acceptedFileItems}{" "}
              </Button>
            </>
          )}
        </div>
        <Row className="mb-6 pl-3 mt-3">
          <Button
            type="submit"
            color="primary"
            onClick={() => uploadFile(acceptedFiles)}
          >
            Upload
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={(e) => console.log()}
          >
            Cancel
          </Button>
        </Row>
      </Container>{" "}
    </>
  );
}

ResumeEdit.propTypes = {};
