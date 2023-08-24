/**
 *
 * MyChapters
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import MyChapter from "../../components/Cards/MyChapter";
import Can from "../../components/Can";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import history from "utils/history";
import { permissions } from "utils/permissions";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import reducer from "./reducer";
import "./myChaptersStyle.scss";

export default function MyChapters() {
  useInjectReducer({ key: "myChapters", reducer });
  const dispatch = useDispatch();
  const { chapters, isLoading } = useSelector((state) => selectors.all(state));

  React.useEffect(() => {
    dispatch(operations.fetchChapters());
  }, []);

  const onEdit = (id) => history.push(`/edit-lesson?chapterId=${id}`);

  const onDelete = (id, title) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.onDelete(id)),
      confirmBtnText: "Delete",
      text: (
        <>
          You are about to delete{" "}
          <span className="font-weight-bold font-italic">{title}</span>. Do you
          want to continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const getComponent = () => {
    return chapters.map((chapter, index) => (
      <React.Fragment key={chapter.id}>
        <Col xs="12" md="6" lg="4">
          <MyChapter
            id={chapter.id}
            title={chapter.title}
            type={chapter.type}
            level={chapter.level}
            link={chapter.link}
            updatedAt={chapter.updatedAt}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
        {(index + 1) % 3 === 0 ? (
          <div key={`${chapter.id}-${index}`} className="w-100" />
        ) : null}
      </React.Fragment>
    ));
  };

  return (
    <Can permissions={[permissions.VIEW_MY_LESSONS]}>
      <div className="myChapters mx-3 mx-md-4 ml-lg-7">
        <Helmet>
          <title>MyChapters</title>
          <meta name="description" content="Description of MyChapters" />
        </Helmet>
        <Row className="mt-3">
          <div className="align-items-right ml-auto mr-3 mr-md-5">
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => history.push("/add-lesson")}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add Lesson</span>
            </Button>
          </div>
        </Row>
        <Row className="mt-3">{getComponent()}</Row>
      </div>
    </Can>
  );
}

MyChapters.propTypes = {};
