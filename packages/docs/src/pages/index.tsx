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
            <h1 className={`tw-text-54 tw-font-800 ${styles.Title}`}>
              The most useful rich text editor, Use it for free
            </h1>
            <p className={`tw-text-26 tw-font-400 ${styles.Description}`}>
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
        <div className="tw-flex tw-flex-col tw-items-center tw-w-full tw-bg-blue-100 tw-py-100 tw-px-25">
          <h1 className="tw-text-44 tw-font-800 tw-max-w-400 tw-text-center">
            Relationship with <span className="tw-text-blue-500">Quill.js</span>
          </h1>
          <div className="tw-mt-60 tw-flex tw-gap-20 tw-max-w-954">
            <div className="tw-bg-white tw-rounded-20 tw-p-20">
              <img className="" src="img/what-is-bottom-right.svg" />
              <div className="tw-flex tw-flex-col tw-mt-20">
                <h3 className="tw-text-22 tw-font-700">
                  Experience like using ProseMirror
                </h3>
                <p className="tw-mt-14">
                  Unlike Reminder and Tiptap, Edim does not abstract ProseMirror
                  and exposes all APIs directly. This means that you can refer
                  to ProseMirror's official documentation.
                </p>
              </div>
            </div>
            <div className="tw-bg-white tw-rounded-20 tw-p-20">
              <img className="" src="img/what-is-bottom-right.svg" />
              <div className="tw-flex tw-flex-col tw-mt-20">
                <h3 className="tw-text-22 tw-font-700">
                  Experience like using ProseMirror
                </h3>
                <p className="tw-mt-14">
                  Unlike Reminder and Tiptap, Edim does not abstract ProseMirror
                  and exposes all APIs directly. This means that you can refer
                  to ProseMirror's official documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-bg-white tw-w-full tw-flex tw-flex-col tw-items-center tw-py-100 tw-px-25">
          <h1 className="tw-text-44 tw-font-800 tw-max-w-400 tw-text-center">
            Who do you recommend it to?
          </h1>
          <div className="tw-mt-40 tw-flex tw-gap-20 tw-max-w-954">
            <div className="tw-bg-blue-200 tw-rounded-20 tw-p-20">
              <img className="" src="img/what-is-bottom-right.svg" />
              <div className="tw-flex tw-flex-col tw-mt-20">
                <h3 className="tw-text-22 tw-font-700">
                  Experience like using ProseMirror
                </h3>
                <p className="tw-mt-14">
                  Unlike Reminder and Tiptap, Edim does not abstract ProseMirror
                  and exposes all APIs directly. This means that you can refer
                  to ProseMirror's official documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-bg-blue-500 tw-w-full tw-flex tw-flex-col tw-items-center tw-py-100 tw-px-20">
          <h1 className="tw-text-38 tw-font-800 tw-text-white">
            Try Edybara today
          </h1>
          <button className="tw-bg-white tw-text-blue-500 tw-py-8 tw-px-14 tw-rounded-8 tw-text-20 tw-font-600 tw-mt-40">
            Download Now
          </button>
        </div>
      </div>
    </Layout>
  );
}
