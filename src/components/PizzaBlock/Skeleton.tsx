import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={464}
    viewBox="0 0 280 464"
    backgroundColor="#e1d47f"
    foregroundColor="#f4fbfb"
    {...props}>
    <circle cx="130" cy="135" r="120" />
    <rect x="0" y="290" rx="0" ry="0" width="280" height="30" />
    <rect x="0" y="330" rx="13" ry="13" width="280" height="80" />
    <rect x="0" y="419" rx="18" ry="18" width="85" height="30" />
    <rect x="128" y="420" rx="23" ry="23" width="146" height="40" />
  </ContentLoader>
);

export default Skeleton;
