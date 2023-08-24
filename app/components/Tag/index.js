/**
 *
 * Tag
 *
 */

import React, { memo } from "react";
import classnames from "classnames";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import "./tagStyle.scss";

function Tag({ title, className }) {
  return <div
      className={classnames(`tag bg-gradient-secondary
       px-2 py-1 rounded border border-primary
       ${className}`,
      )}
    >
    <div className="text-xs text-primary">{title}</div>
  </div>;
}

Tag.propTypes = {};

export default memo(Tag);
