/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.scss';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { classes } from '@edybara/ui';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
      wrapperClassName={styles.EditorContainer}
    >
      <div className={styles.Wrapper}>
        <div className={styles.HeaderWrapper}>
          <h1 className={styles.Title}>The most useful rich text editor,</h1>
          <h1 className={styles.Title}>Use it for free </h1>
          <p className={styles.Description}>
            It has only the advantages of a complete editor and a non-completed
            editor.
          </p>
          <button
            className={classes('button button--primary', styles.DownloadButton)}
          >
            Download Now!
          </button>
        </div>
        <div className={styles.WhatIsWrapper}>
          <div className={styles.EditorWrapper}>
            <BrowserOnly fallback={<div>loading</div>}>
              {() => {
                const {
                  Maximum,
                } = require('@site/src/components/examples/getting-started/maximum');
                return <Maximum className={styles.Editor} />;
              }}
            </BrowserOnly>
          </div>
        </div>
      </div>
    </Layout>
  );
}
