/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="The most useful rich text editor, Use it for free"
      description="It has only the advantages of a complete editor and a non-completed editor."
      wrapperClassName="tw-items-center"
    >
      <div className="tw-w-full tw-flex tw-flex-col tw-items-center">
        {/* Intro */}
        <div className="tw-w-full ">
          <div className="tw-flex tw-flex-col tw-items-center tw-w-full tw-px-30 tw-pt-70 tw-pb-[482px] tw-bg-100 tw-bg-homepage-1 tw-bg-no-repeat tw-bg-center">
            <h1
              className={
                'tw-text-54 tw-font-800 tw-max-w-[954px] tw-text-center'
              }
            >
              The most useful rich text editor, Use it for free
            </h1>
            <p className={'tw-text-26 tw-font-400 tw-mt-20 tw-text-center'}>
              It has only the advantages of a complete editor and a
              non-completed editor.
            </p>
            <button className="tw-text-26 tw-font-700 tw-py-14 tw-px-24 tw-bg-blue-500 tw-text-white tw-rounded-8 tw-mt-50">
              Download Now!
            </button>
          </div>
        </div>
        {/* Edybara */}
        <div className="tw-bg-white tw-w-full tw-flex tw-items-center tw-flex-col tw-relative">
          <div
            className={
              'tw-flex tw-flex-1 tw-px-20 tw-w-full tw-absolute tw-rounded-8 tw-h-[600px] tw-max-w-[994px] tw-top-[-420px]'
            }
          >
            <BrowserOnly>
              {() => {
                const {
                  Maximum,
                } = require('@site/src/components/examples/getting-started/maximum');
                return <Maximum className={'tw-rounded-8 tw-shadow-black'} />;
              }}
            </BrowserOnly>
          </div>
        </div>
        <div
          className={
            'tw-flex tw-flex-col tw-items-center tw-bg-blue-500 tw-w-full tw-px-20 tw-pb-100 tw-pt-250'
          }
        >
          <h2 className="tw-text-44 tw-font-800 tw-text-white">
            What is <span className="tw-text-yellow-100">Edybara</span>?
          </h2>
          <p className="tw-mt-18 tw-text-22 tw-max-w-[706px] tw-text-white">
            Edim is an open source rich text editor based on proseMirror. It
            provides a predefined format and plug-in for use with proseMirror.
          </p>
          <div className="tw-flex tw-flex-col tw-gap-20 tw-max-w-[954px] tw-w-full tw-mt-100">
            <div className="tw-flex tw-flex-col tw-justify-center tw-rounded-20 tw-bg-blue-100">
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/folder.svg"
              />
              <div className="tw-p-20 tw-flex tw-flex-col">
                <h3 className="tw-text-24">
                  Open Source Rich Text Editor Based on ProsseMirror
                </h3>
                <p className="tw-mt-14 tw-text-16">
                  ProseMirror is a modern toolkit for creating rich text editors
                  that work in your browser. However, ProseMirror has a steep
                  learning curve and a lot of code to write because it is not
                  intended to provide a complete editor, such as Quill.js.
                </p>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-justify-center tw-rounded-20 tw-bg-blue-100">
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/rocket.svg"
              />
              <div className="tw-p-20 tw-flex tw-flex-col">
                <h3 className="tw-text-24">Easy-To-Start</h3>
                <p className="tw-mt-14 tw-text-16">
                  Edim provides ready-to-use forms (Schema) and plugins in these
                  ProseMirror to help enable Easy-To-Start.
                </p>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-justify-center tw-rounded-20 tw-bg-blue-100">
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/book.svg"
              />
              <div className="tw-p-20 tw-flex tw-flex-col">
                <h3 className="tw-text-24">
                  Experience like using ProseMirror
                </h3>
                <p className="tw-mt-14 tw-text-16">
                  Unlike Reminder and Tiptap, Edim does not abstract ProseMirror
                  and exposes all APIs directly. This means that you can refer
                  to ProseMirror's official documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Relationship */}
        <div className="tw-flex tw-flex-col tw-items-center tw-w-full tw-bg-blue-100 tw-py-100 tw-px-25">
          <h1 className="tw-text-44 tw-font-800 tw-max-w-400 tw-text-center">
            Relationship with <span className="tw-text-blue-500">Quill.js</span>
          </h1>
          <div className="tw-mt-60 tw-flex tw-flex-col tw-gap-20 tw-max-w-[954px]">
            <div className="tw-bg-white tw-rounded-20 tw-p-20">
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/document.svg"
              />
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
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/preferences.svg"
              />
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
        {/* Recommand */}
        <div className="tw-bg-white tw-w-full tw-flex tw-flex-col tw-items-center tw-py-100 tw-px-25">
          <h1 className="tw-text-44 tw-font-800 tw-max-w-400 tw-text-center">
            Who do you recommend it to?
          </h1>
          <div className="tw-mt-40 tw-flex tw-flex-col tw-gap-20 tw-max-w-[954px]">
            <div className="tw-bg-blue-200 tw-rounded-20 tw-p-20">
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/bag.svg"
              />
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
            <div className="tw-bg-blue-200 tw-rounded-20 tw-p-20">
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/developer.svg"
              />
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
            <div className="tw-bg-blue-200 tw-rounded-20 tw-p-20">
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/edybara.svg"
              />
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
