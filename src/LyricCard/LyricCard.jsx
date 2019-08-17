import React from 'react';
import {
  CardWrapper,
  CardTitle,
  CardAuthor,
  TitleAuthorDivider,
} from './elements.jsx';

export const LyricCard = ({ title, author }) => (
  <CardWrapper>
    <CardTitle>{title}</CardTitle>
    <TitleAuthorDivider>{' | '}</TitleAuthorDivider>
    {author && <CardAuthor>{author}</CardAuthor>}
  </CardWrapper>
);
