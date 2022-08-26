import React from 'react';
import Head from 'next/head';

interface SeoTypes {
  title: string;
}

const Seo = ({ title }: SeoTypes) => (
  <Head>
    <link rel="shortcut icon" href="/favicon.ico" />
    <title>{title} | PockeMon</title>
  </Head>
);

export default Seo;
