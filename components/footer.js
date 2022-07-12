import React from 'react'
import Menu from '@components/menu'
import Icon from '@components/icon'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Newsletter from '@components/newsletter'

const Footer = ({ data = {} }) => {
  const { blocks, newsletter } = data
  const router = useRouter()
  return (
    <>
    
      <Newsletter data={newsletter[0]} />

      <footer className="footer" role="contentinfo">
        {blocks.map((block, key) => (
          <div key={key}>
            {block.social && (
              <div className="footer--social">
                <p className="is-h5">follow our progress</p>
                <div className="menu-social">
                  {block.social.map((link, key) => {
                    return (
                      <a
                        key={key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.icon === 'Discord' ? (
                          <Icon name={link.icon} viewBox="0 0 71 55" />
                        ) : (
                          <Icon name={link.icon} />
                        )}
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="footer--container">
          <div className="footer--logo">
            {router.pathname === '/' ? (
              <button
                className="logo--link"
                aria-label="Go Home"
                onClick={() => window.scrollTo(0, 0)}
              >
                <Icon name="Logo" id="header" viewBox="0 0 73 20" />
              </button>
            ) : (
              <Link href="/" scroll={false}>
                <a className="logo--link" aria-label="Go Home">
                  <Icon name="Logo" id="header" viewBox="0 0 73 20" />
                </a>
              </Link>
            )}
          </div>
          <div className="footer--grid">
            {blocks.map((block, key) => (
              <div key={key} className="footer--block">
                {block.title && <p className="is-h5">{block.title}</p>}

                {block.menu?.items && (
                  <Menu items={block.menu.items} className="menu-footer" />
                )}
              </div>
            ))}
          </div>
          <div className="footer--extras">
            <div className="footer--disclaimer">
              <p>
                <span className="site-name">&nbsp;xAlpha</span>
                <span className="copy">&copy;</span><span className="date">{new Date().getFullYear()}. All rights reserved.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
