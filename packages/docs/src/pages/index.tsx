/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.scss';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
      wrapperClassName={styles.EditorContainer}
    >
      <div className={styles.Wrapper}>
        <div className={styles.HeaderBackgroundWrapper}>
          <div className={styles.HeaderWrapper}>
            <h1 className={styles.Title}>
              The most useful rich text editor, Use it for free
            </h1>
            <p className={styles.Description}>
              It has only the advantages of a complete editor and a
              non-completed editor.
            </p>
            <button
              className={[
                'button',
                'button--primary',
                styles.DownloadButton,
              ].join(' ')}
            >
              Download Now!
            </button>
          </div>
        </div>
        <div className={styles.IntroWrapper}>
          <div className={styles.EditorWrapper}>
            <BrowserOnly>
              {() => {
                const {
                  Maximum,
                } = require('@site/src/components/examples/getting-started/maximum');
                return <Maximum className={styles.Editor} />;
              }}
            </BrowserOnly>
          </div>
        </div>
        <div className={styles.WhatIsWrapper}>
          <h2 className={styles.WhatIsHeader}>What is Edybara?</h2>
          <p className={styles.WhatIsDescription}>
            Edim is an open source rich text editor based on proseMirror. It
            provides a predefined format and plug-in for use with proseMirror.
          </p>
          <div className={styles.WhatIsGridWrapper}>
            <div className={styles.WhatIsGridItemLeft}>
              <img
                className={styles.GridLeftImage}
                src="img/what-is-left.svg"
              />
              <div className={styles.GridItemTextWrapper}>
                <h3 className={styles.GridItemHeader}>
                  Open Source Rich Text Editor Based on ProsseMirror
                </h3>
                <p className={styles.GridItemDescription}>
                  ProseMirror is a modern toolkit for creating rich text editors
                  that work in your browser. However, ProseMirror has a steep
                  learning curve and a lot of code to write because it is not
                  intended to provide a complete editor, such as Quill.js.
                </p>
              </div>
            </div>
            <div className={styles.WhatIsGridItemTopRight}>
              <img
                className={styles.GridTopRightImage}
                src="img/what-is-top-right.svg"
              />
              <div className={styles.GridItemTextWrapper}>
                <h3 className={styles.GridItemHeader}>Easy-To-Start</h3>
                <p className={styles.GridItemDescription}>
                  Edim provides ready-to-use forms (Schema) and plugins in these
                  ProseMirror to help enable Easy-To-Start.
                </p>
              </div>
            </div>
            <div className={styles.WhatIsGridItemBottomRight}>
              <img
                className={styles.GridBottomRightImage}
                src="img/what-is-bottom-right.svg"
              />
              <div className={styles.GridItemTextWrapper}>
                <h3 className={styles.GridItemHeader}>
                  Experience like using ProseMirror
                </h3>
                <p className={styles.GridItemDescription}>
                  Unlike Reminder and Tiptap, Edim does not abstract ProseMirror
                  and exposes all APIs directly. This means that you can refer
                  to ProseMirror's official documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.RelationQuillWrapper}>
          <h1 className={styles.RelationQuillHeader}>
            Relationship with Quill.js
          </h1>
          <div className={styles.RelationQuillGridWrapper}>
            <div className={styles.RelationQuillGridItemBottomRight}>
              <img
                className={styles.RelationQuillGridBottomRightImage}
                src="img/what-is-bottom-right.svg"
              />
              <div className={styles.GridItemTextWrapper}>
                <h3 className={styles.GridItemHeader}>
                  Experience like using ProseMirror
                </h3>
                <p className={styles.GridItemDescription}>
                  Unlike Reminder and Tiptap, Edim does not abstract ProseMirror
                  and exposes all APIs directly. This means that you can refer
                  to ProseMirror's official documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
