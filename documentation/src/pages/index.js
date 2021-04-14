import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

const references = [
  {
    link: '/docs/api/',
    title: '🎯 Documentation',
    description: (
      <>
        Go through our <strong>API</strong>
      </>
    ),
  },
  {
    link: '/docs/guides/',
    title: '⛰ Getting Started',
    description: (
      <>
        Follow the <strong>guides</strong>
      </>
    ),
  },
  {
    link: 'https://www.npmjs.com/package/react-jitsi-hooks',
    title: '🔎 NPM',
    description: <>Check out the lib</>,
  },
]

const InlineLink =( {href, children}) => {
  return <a href={useBaseUrl(href)}>{children}</a>
}
const features = [
  {
    title: 'Easy to Use',
    imageUrl: 'img/Online games addiction-cuate.svg',
    description: (
      <>
        API designed to be easy to use, iframes-free.
        <br />
        No limitation to your creativity,{' '}
        <InlineLink href={"/docs/guides"}>just need to get started</InlineLink>
      </>
    ),
  },
  {
    title: 'Experiment',
    imageUrl: 'img/Video call-amico.svg',
    description: (
      <>
        Mix and remix layout for video call,
        <br />
        Design <strong>breaking room</strong> experiences, create new{' '}
        <strong>facilitated</strong> digital spaces.
      </>
    ),
  },
  {
    title: 'Jitsi ❤ React hooks',
    imageUrl: 'img/Maintenance-cuate.svg',
    description: (
      <>
        Created with awesome services of Jitsi and their low level api
        lib-jitsi-meet.
        <br />
        <InlineLink href={"/docs/api/"}>Discover our API</InlineLink>
      </>
    ),
  },
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
function Reference({ link, title, description }) {
  return (
    <a
      href={link.startsWith("/") ? useBaseUrl(link) : link}
      className={clsx('col col--2', styles.referenceItem)}
      style={{ paddingTop: '1em' }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  )
}

export default function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Jitsi low level API, made it easy.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/guides/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        {references && references.length > 0 && (
          <section className={styles.references}>
            <div className="container">
              <header>
                <h2 className={styles.referenceHeading}>
                  Hey, can you hear me?
                </h2>
                <span className={styles.referenceSubHeading}>
                  Good! Here some tips to start
                </span>
              </header>
              <div className={'row ' + styles.referenceRow}>
                {references.map((props, idx) => (
                  <Reference key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}
