/**
 *
 * Articles
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button } from "reactstrap";
import { useCookies } from "react-cookie";
import Select from "components/RtDropDown";
import Can from "components/Can";
import ArticleCard, { ArticleCardLoading } from "components/Cards/Article";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import { useInjectReducer } from "utils/injectReducer";
import history from "utils/history";
import { permissions } from "utils/permissions";
import { dropdownOptions, categoryDropDown } from "./helpers";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./articlesStyle.scss";

export default function Articles() {
  useInjectReducer({ key: "articles", reducer });
  const [cookie] = useCookies(["user"]);
  const dispatch = useDispatch();

  const {
    articles,
    articleType,
    isLoading,
    category,
    categories,
  } = useSelector((state) => ({
    articles: selectors.articles(state),
    articleType: selectors.articleType(state),
    isLoading: selectors.isLoading(state),
    categories: selectors.categoryList(state),
    category: selectors.category(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchArticles(articleType, category, cookie));
  }, []);

  React.useEffect(() => {
    dispatch(operations.fetchCategories());
  }, [articleType]);

  const onDelete = (id, title) => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(operations.onDelete(id, articleType, cookie, category)),
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

  const onEdit = (id) => history.push(`/edit-resource?id=${id}`);

  const getComponent = () => {
    if (isLoading)
      return (
        <>
          <Col xs="12" md="6" lg="4">
            <ArticleCardLoading />
          </Col>
          <Col xs="12" md="6" lg="4">
            <ArticleCardLoading />
          </Col>
        </>
      );
    return articles.map((article, index) => (
      <React.Fragment key={article.id}>
        <Col xs="12" md="6" lg="4">
          <ArticleCard
            id={article.id}
            title={article.title}
            description={article.description}
            createdAt={article.createdAt}
            readDurationInMins={article.readDurationInMins}
            writtenBy={article.writtenBy}
            onDelete={onDelete}
            onEdit={onEdit}
            liked={article.isLiked}
            likes={article.likes}
            onLike={(id) =>
              dispatch(operations.onLike(id, articleType, cookie, category))
            }
            onUnlike={(id) =>
              dispatch(operations.onUnlike(id, articleType, cookie, category))
            }
            imageUrl={article.pictureUrl}
          />
        </Col>
        {(index + 1) % 3 === 0 ? (
          <div key={`${article.id}-${index}`} className="w-100" />
        ) : null}
      </React.Fragment>
    ));
  };

  return (
    <div className="articles mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Articles</title>
        <meta name="description" content="Description of Articles" />
      </Helmet>
      <Row className="mt-3 d-flex justify-content-end">
        <Can permissions={[permissions.ADD_AN_ARTICLE]}>
          <Button
            color="primary"
            className="btn-icon btn-3 d-none d-md-block"
            type="button"
            onClick={() => history.push("/add-resource")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Add Article</span>
          </Button>
          <Select
            text={articleType}
            options={dropdownOptions(dispatch, cookie, category)}
          />
        </Can>
        <Select
          text={category}
          options={categoryDropDown(dispatch, cookie, articleType, categories)}
        />
        <Can permissions={[permissions.ADD_AN_ARTICLE]}>
          <Button
            color="primary"
            className="btn-icon btn-3 d-block d-md-none mt-3 mr-2"
            type="button"
            onClick={() => history.push("/add-resource")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Add Article</span>
          </Button>
        </Can>
      </Row>
      <Row className="mt-3">{getComponent()}</Row>
    </div>
  );
}

Articles.propTypes = {};
