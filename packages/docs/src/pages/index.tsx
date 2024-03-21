/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Translate, { translate } from '@docusaurus/Translate';

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
              <Translate description="Main Title">home.main.title</Translate>
            </h1>
            <p
              className={
                'tw-text-26 tw-font-400 tw-mt-20 tw-text-center tw-max-w-[584px]'
              }
            >
              <Translate description="Main Description">
                home.main.description
              </Translate>
            </p>
            <button className="tw-text-26 tw-font-700 tw-py-14 tw-px-24 tw-bg-blue-500 tw-text-white tw-rounded-8 tw-mt-50">
              <Translate description="Main Start Button">
                home.main.start
              </Translate>
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
            <Translate description="What is Edybara title">
              home.whatIs.title
            </Translate>
          </h2>
          <p className="tw-mt-18 tw-text-22 tw-max-w-[706px] tw-text-white tw-text-center">
            <Translate>home.whatIs.description</Translate>
          </p>
          <div className="tw-grid md:tw-grid-rows-2 tw-grid-cols-1 md:tw-grid-cols-none md:tw-grid-flow-col tw-gap-20 tw-max-w-[954px] tw-w-full tw-mt-100">
            <div className="md:tw-row-span-2 tw-flex tw-flex-col tw-justify-center tw-rounded-20 tw-bg-blue-100">
              <img
                className="tw-w-full md:tw-object-cover tw-max-h-[180px] md:tw-max-h-none tw-flex-1"
                src="img/ilusts/folder.svg"
              />
              <div className="tw-p-20 tw-flex tw-flex-col">
                <h3 className="tw-text-22 tw-font-700">
                  <Translate>home.whatIs.card.basedOn.title</Translate>
                </h3>
                <p className="tw-mt-14 tw-text-16">
                  <Translate>home.whatIs.card.basedOn.description</Translate>
                </p>
              </div>
            </div>
            <div className="md:tw-col-span-2 tw-flex tw-flex-col tw-justify-center tw-rounded-20 tw-bg-blue-100">
              <img
                className="tw-w-full tw-max-h-[180px] md:tw-max-h-[250px] tw-px-20 tw-pt-20"
                src="img/ilusts/rocket.svg"
              />
              <div className="tw-p-20 tw-flex tw-flex-col">
                <h3 className="tw-text-22 tw-font-700">
                  <Translate>home.whatIs.card.easyToStart.title</Translate>
                </h3>
                <p className="tw-mt-14 tw-text-16">
                  <Translate>
                    home.whatIs.card.easyToStart.description
                  </Translate>
                </p>
              </div>
            </div>
            <div className="md:tw-col-span-2 tw-flex tw-flex-col tw-justify-center tw-rounded-20 tw-bg-blue-100">
              <img
                className="tw-w-full tw-max-h-[180px] md:tw-max-h-[250px] tw-px-20 tw-pt-20"
                src="img/ilusts/book.svg"
              />
              <div className="tw-p-20 tw-flex tw-flex-col">
                <h3 className="tw-text-22 tw-font-700">
                  <Translate>home.whatIs.card.experience.title</Translate>
                </h3>
                <p className="tw-mt-14 tw-text-16">
                  <Translate>home.whatIs.card.experience.description</Translate>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Relationship */}
        <div className="tw-flex tw-flex-col tw-items-center tw-w-full tw-bg-blue-100 tw-py-100 tw-px-25">
          <h1 className="tw-text-44 tw-font-800 tw-max-w-400 tw-text-center">
            <Translate>home.quill.title</Translate>
          </h1>
          <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 md:tw-grid-flow-col md:tw-grid-cols-none tw-mt-60 tw-gap-20 tw-max-w-[954px] tw-w-full">
            <div className="md:tw-col-span-2 tw-bg-white tw-rounded-20 tw-p-20">
              <img
                className="tw-w-full tw-max-h-[180px] tw-px-20 tw-pt-20"
                src="img/ilusts/document.svg"
              />
              <div className="tw-flex tw-flex-col tw-mt-20">
                <h3 className="tw-text-22 tw-font-700">
                  <Translate>home.quill.card.migrate.title</Translate>
                </h3>
                <p className="tw-mt-14">
                  <Translate>home.quill.card.migrate.description</Translate>
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
                  <Translate>home.quill.card.api.title</Translate>
                </h3>
                <p className="tw-mt-14">
                  <Translate>home.quill.card.api.description</Translate>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Recommend */}
        <div className="tw-bg-white tw-w-full tw-flex tw-flex-col tw-items-center tw-py-100 tw-px-25">
          <h1 className="tw-text-44 tw-font-800 tw-max-w-400 tw-text-center">
            <Translate>home.recommend.title</Translate>
          </h1>
          <div className="tw-grid md:tw-grid-rows-3 tw-grid-cols-1 md:tw-grid-cols-none md:tw-grid-flow-col tw-mt-40 tw-gap-20 tw-max-w-[954px] tw-w-full">
            <div className="md:tw-col-span-3 tw-flex tw-flex-col md:tw-flex-row-reverse tw-justify-center tw-bg-blue-200 tw-rounded-20">
              <img
                className="tw-w-full tw-max-h-[180px] md:tw-max-h-[260px] md:tw-self-end tw-px-20 tw-pt-20 md:tw-px-0"
                src="img/ilusts/bag.svg"
              />
              <div className="tw-flex tw-flex-col tw-p-20">
                <h3 className="tw-text-22 tw-font-700">
                  <Translate>home.recommend.card.business.title</Translate>
                </h3>
                <p className="tw-mt-14">
                  <Translate>
                    home.recommend.card.business.description
                  </Translate>
                </p>
              </div>
            </div>
            <div className="md:tw-col-span-2 md:tw-row-span-2 tw-flex tw-flex-col tw-justify-center tw-bg-blue-200 tw-rounded-20 tw-p-20">
              <img
                className="tw-w-full tw-max-h-[180px] md:tw-max-h-none md:tw-flex-1"
                src="img/ilusts/developer.svg"
              />
              <div className="tw-flex tw-flex-col tw-mt-20">
                <h3 className="tw-text-22 tw-font-700">
                  <Translate>home.recommend.card.editor.title</Translate>
                </h3>
                <p className="tw-mt-14">
                  <Translate>home.recommend.card.editor.description</Translate>
                </p>
              </div>
            </div>
            <div className="md:tw-row-span-2 tw-flex tw-flex-col tw-justify-center tw-bg-blue-200 tw-rounded-20 tw-p-20">
              <img
                className="tw-w-full tw-max-h-[180px] md:tw-max-h-none md:tw-flex-1"
                src="img/ilusts/edybara.svg"
              />
              <div className="tw-flex tw-flex-col tw-mt-20">
                <h3 className="tw-text-22 tw-font-700">
                  <Translate>home.recommend.card.ready.title</Translate>
                </h3>
                <p className="tw-mt-14">
                  <Translate>home.recommend.card.ready.description</Translate>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-bg-blue-500 tw-w-full tw-flex tw-flex-col tw-items-center tw-py-100 tw-px-20">
          <h1 className="tw-text-38 tw-font-800 tw-text-white">
            <Translate>home.try.title</Translate>
          </h1>
          <button className="tw-bg-white tw-text-blue-500 tw-py-8 tw-px-14 tw-rounded-8 tw-text-20 tw-font-600 tw-mt-40">
            <Translate>home.try.start</Translate>
          </button>
        </div>
      </div>
    </Layout>
  );
}
