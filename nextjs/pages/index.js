import React, { useState, useEffect } from 'react';
import cn from 'classnames'
import Head from "next/head";
import { useMoralis } from "react-moralis";
import { Card, Modal } from "antd";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import mainLogo from '../public/logo.png'
import menuLogo from '../public/menuLogo.png'
import Image from 'next/image'
import { PieChart } from 'react-minimal-pie-chart';
import PageBreak from "../public/PageBreak.svg";
import * as Scroll from 'react-scroll';
import PageBreakBottom from "../public/PageBreakBottom.svg";
import { motion } from "framer-motion";
import { MdSpaceDashboard } from 'react-icons/md';
import Sticky from 'react-stickynode';
import NativeBalance from "../components/NativeBalance";
import Account from "../components/Account/Account";
import DEX from "../components/DEX";
// import Chains from "../components/Chains";

export default function Home() {
  const [stickyNav, setStickyNav] = useState(false)
  const ref = React.createRef()
  const { authenticate, isAuthenticated, Moralis } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  Moralis.getSigningData = () => "Adashe (ADSE)";
  let ScrollLink = Scroll.Link;

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate()
        .then(function (user) {
          console.log(Moralis.User.current().get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };
  const shiftSize = 7;
  const [open, setOpen] = useState(false)

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      document.body.classList.add('sticky-nav');
    }
    else {
      document.body.classList.remove('sticky-nav');
    }
    return;
  };

  useEffect(() => {
    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      ([e]) => setStickyNav(e.intersectionRatio < 1),
      { threshold: [1] }
    )
    observer.observe(cachedRef)
    return () => observer.unobserve(cachedRef)
  }, [ref])

  return (
    <div>
      <Head>
        <title>Adashe</title>
        <meta name="description" content="Adashe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#060B19",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#382C53",
            },
            links: {
              color: "#382C53",
              distance: 250,
              enable: true,
              opacity: 1.0,
              width: 2,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1920,
              },
              value: 100,
            },
            opacity: {
              value: 1.0,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <header id="hero" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>Buy Adashe (ADSE)</h1>
              <div>
                <span className='subheader'>Adashe is the primary utility token of our ecosystem and enables you to participate in our upcoming generation staking rewards program as well as earn by providing stability to the ADSE Stablecoin.</span>
                <p><span className="price"><span className="highlight">1 ADSE = $0.00025 USD</span></span></p>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 1.0 }}
                  className="btn"
                  onClick={login}
                >
                  {isAuthenticated ? <NativeBalance /> : <Account />}


                </motion.button>
              </div>
            </div>
            <div className="logo">
              <Image
                src={mainLogo}
                alt="Logo"
                quality="85"
                layout="intrinsic"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col justify-center align-items-center text-center">
        <Sticky onStateChange={handleStateChange}>
          <section className={cn(stickyNav ? 'tab-stuck' : '', 'tabs')} ref={ref}>
            <div id="topGraphic">
              <PageBreak />
            </div>
            <div className="menuLogo">
              <ScrollLink to='hero'>
                <Image
                  src={menuLogo}
                  alt="Logo"
                  quality="85"
                  layout="intrinsic"
                />
              </ScrollLink>
            </div>
            <ul>
              <li><ScrollLink to='supply' activeClass='selected' spy={true}>Supply</ScrollLink></li>
              <li><ScrollLink to='terms' activeClass='selected' spy={true}>Terms</ScrollLink></li>
              <li><ScrollLink to='distribution' activeClass='selected' spy={true}>Fair Distribution</ScrollLink></li>
              <li><ScrollLink to='allocation' activeClass='selected' spy={true}>Token Allocaton</ScrollLink></li>
              <li><a onClick={() => setIsModalVisible(true)}>Exchange</a></li>
            </ul>
            <div className="utility-nav">

              {/* <TokenPrice
                  address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
                  chain="eth"
                  image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
                  size="40px"
                /> */}

              {/* <Chains /> */}

              <NativeBalance />
              <Account />

              <button className="menuButton"><MdSpaceDashboard /></button>
            </div>
          </section>
        </Sticky>
        <section id="supply">
          <div className="flex items-center justify-center">
            <div className="panel-layout">
              <motion.div
                className="panel"
              >
                <div className="panel-content">
                  <span className='subheader'><h3>Supply</h3></span>
                  <p>A total of a 750,000,000 ADSE (7.5% of the supply) is available for the presale event. The total ADSE supply is 10,000,000,000.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="terms">
          <div className="flex items-center justify-center">
            <div className="panel-layout">
              <motion.div
                className="panel"
              >
                <div className="panel-content">
                  <span className='subheader'><h3>Terms</h3></span>
                  <p>The contract accepts MATIC and the token price will begin at $0.000025 or 3200 ADSE per MATIC. The event will run until all tokens are sold.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
        <section id="distribution">
          <div className="flex items-center justify-center">
            <div className="panel-layout">
              <motion.div
                className="panel"
              >
                <div className="panel-content">
                  <span className='subheader'><h3>Fair Distribution</h3></span>
                  <p>There is no front-running and being first or last doesn&apos;t matter. All participants will receive ADSE at the same rate depending on how much is purchased.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="allocation">
          <div className="flex items-center justify-center">
            <div className="panel-layout">
              <motion.div
                className="panel"
              >
                <div className="panel-content">
                  <span className='subheader'><h3>Token Allocation</h3></span>
                  <p>Check that graph out, yo.</p>
                  <PieChart
                    data={[
                      { title: '30%', value: 30, color: '#775BB4' },
                      { title: '30%', value: 30, color: '#2E52E1' },
                      { title: '9.5%', value: 9.5, color: '#775BB4' },
                      { title: '9.5%', value: 9.5, color: '#2E52E1' },
                      { title: '3%', value: 3, color: '#775BB4' },
                      { title: '5%', value: 5, color: '#3174C7' },
                    ]}
                    radius={PieChart.defaultProps.radius - shiftSize}
                    segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                      ...defaultLabelStyle,
                    }}
                    className="pieChart"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* <div className="disclaimer">
          <p>Please make sure you are connected to the right network Mumbai mainnet and the correct address.</p>
          <p>NOTE: you may need to <Link href={'/'}>bridge</Link> or <Link href={'/'}>swap</Link> assets.</p>
          <p>We have set the gas limit to 1000000 for the contract to successfully process your order.</p>
          <p>We recommend that you don&apos;t lower the gas limit.</p>
        </div> */}
      </main>
      <footer id="footer">
        <div id="bottomGraphic">
          <PageBreakBottom />
        </div>
        <div className="footerLogo">
          <ScrollLink to='hero' activeClass='selected' spy={true}>
            <Image
              src={mainLogo}
              alt="Logo"
              quality="85"
              layout="intrinsic"
            />
          </ScrollLink>
        </div>
        <ul>
          <li><ScrollLink to='supply' activeClass='selected' spy={true}>Supply</ScrollLink></li>
          <li><ScrollLink to='terms' activeClass='selected' spy={true}>Terms</ScrollLink></li>
          <li><ScrollLink to='distribution' activeClass='selected' spy={true}>Fair Distribution</ScrollLink></li>
          <li><ScrollLink to='allocation' activeClass='selected' spy={true}>Token Allocaton</ScrollLink></li>
        </ul>
      </footer>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="500px"
      >
        Exchange
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <DEX chain="eth" />

        </Card>
      </Modal>
    </div>

  );
}

