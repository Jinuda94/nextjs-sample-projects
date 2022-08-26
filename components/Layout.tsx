import React from 'react';
import NavBar from './NavBar';
import Seo from './Seo';

interface AppLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: AppLayoutProps) => (
  <div className={'container mx-auto px-64'}>
    <Seo title={'Next'} />
    <NavBar />
    <div>{children}</div>
  </div>
);

export default Layout;
