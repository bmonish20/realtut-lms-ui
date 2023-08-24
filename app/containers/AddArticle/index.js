/**
 *
 * AddArticle
 *
 */

import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Spinner,
} from 'reactstrap';
import RtInput from "components/RtInput";
import TextEditor from "components/TextEditor";
import RtCreatableSelect from "components/RtCreatableSelect";
import RtUpload from "components/RtUploadFile";
import { useInjectReducer } from "utils/injectReducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import reducer from "./reducer";
import "./addArticleStyle.scss";

export default function AddArticle() {
  useInjectReducer({ key: "addArticle", reducer });
  const dispatch = useDispatch();
  const {
    title,
    category,
    description,
    isDraft,
    isEdit,
    isSubmitting,
    validations,
    categoryList,
    imgUrl,
    imgData
  } = useSelector(state => ({
    title: selectors.title(state),
    category: selectors.category(state),
    description: selectors.description(state),
    isDraft: selectors.isDraft(state),
    isEdit: selectors.isEdit(state),
    isSubmitting: selectors.isSubmitting(state),
    validations: selectors.validationError(state),
    categoryList: selectors.categoryList(state),
    imgUrl: selectors.imgUrl(state),
    imgData: selectors.imgData(state)
  }));

  React.useEffect(() => {
    dispatch(operations.fetchCategoryList());
    const id = qs.parse(location.search).id;
    if(id) {
      dispatch(operations.fetchArticle(id));
    }
    return () => dispatch(operations.addArticleInit());
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.onEdit(id, {
          title,
          isDraft,
          category,
          description
        }, imgData)
      );
    } else {
      dispatch(
        operations.onCreate({
          title,
          isDraft,
          category,
          description
        }, imgData)
      );
    }
  };

  const getSubmitButton = () => {
    if (isSubmitting)
      return (
        <Button
          type="button"
          color="primary"
          className="btn-icon"
          disabled={true}
        >
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>
          <span className="btn-inner-text">
            {isEdit ? "Save/Edit Article" : "Add Article"}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        {isEdit ? "Save/Edit Article" : "Add Article"}
      </Button>
    );
  };

  return (
    <div className="addArticle mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>AddArticle</title>
        <meta name="description" content="Description of AddArticle" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Article" : "Add an Article"}
          </div>
        </Col>
      </Row>
      <Row className="mb-3 mx-3">
        <Col sm="1">
          {imgUrl ? (
            <img
              width="100%"
              alt="..."
              src={imgUrl}
            />
          ) : (
            <img
              src={require("assets/img/icons/common/course.svg")} />
          )}
        </Col>
        <Col sm="3">
          <RtUpload
            name="profile-img"
            onChange={(e) => dispatch(operations.uploadImage(e))}
            labelText="Upload a new photo"
            value=""
            className=""
          />
        </Col>
      </Row>
      <Form role="form">
        <FormGroup row>
          <Col sm={7} className="d-none d-md-block">
            <RtInput
              placeholder="Title"
              type="text"
              name="title"
              value={title}
              error={validations}
              onChange={(e) => dispatch(operations.changeTitle(e))}
            />
          </Col>
          <Col sm={2} className="text-right">
            <label className="mr-2">Publish</label>
            <label className="custom-toggle custom-toggle-success mr-1 align-middle">
              <input
                checked={!isDraft}
                onChange={() => {
                  dispatch(operations.togglePublish())
                }}
                type="checkbox"
              />
              <span
                className="custom-toggle-slider rounded-circle"
                data-label-off="No"
                data-label-on="Yes"
              />
            </label>
          </Col>
          <Col sm={4} className="d-block d-md-none mt-1">
            <RtInput
              placeholder="Title"
              type="text"
              name="title"
              value={title}
              error={validations}
              onChange={(e) => dispatch(operations.changeTitle(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={9}>
            <RtCreatableSelect
              name="category"
              className="text-sm"
              isMulti={false}
              value={category}
              error={validations}
              options={categoryList}
              placeholder="Category"
              onChange={(e) => dispatch(operations.changeCategory(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row className="h-75">
          <Col sm={9}>
            <TextEditor
              name="description"
              theme="snow"
              placeholder="Type here"
              value={description}
              error={validations}
              onChange={(e) => dispatch(operations.changeDescription(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

AddArticle.propTypes = {};
