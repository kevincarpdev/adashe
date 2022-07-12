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
import PageBreak from "../public/PageBreak.svg";
import * as Scroll from 'react-scroll';
import PageBreakBottom from "../public/PageBreakBottom.svg";
import { motion } from "framer-motion";
import Sticky from 'react-stickynode';
import NativeBalance from "../components/NativeBalance";
import Account from "../components/Account/Account";
import DEX from "../components/DEX";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import { MdSpaceDashboard, MdClose, MdGeneratingTokens } from 'react-icons/md';
import { useSpring, animated } from "react-spring";
// import Ramper from "../components/Ramper";


export default function Home() {
  const [stickyNav, setStickyNav] = useState(false)
  const ref = React.createRef()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);
  const [openBar, setOpenBar] = useState();
  const { authenticate, isAuthenticated, Moralis } = useMoralis();
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

  const data01 = [
    { name: 'Holders', value: 5 },
    { name: 'Treasury', value: 5 },
    { name: 'Burn', value: 15 },
    { name: 'Unallocated', value: 7 },
    { name: 'TBD', value: 4 },
  ];

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      document.body.classList.add('sticky-nav');
    }
    else {
      document.body.classList.remove('sticky-nav');
    }
    return;
  };

  const { left } = useSpring({
    from: { left: "-105%" },
    left: openBar ? "0" : "-105%"
  });

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
        <meta name="description" content="Adashe is cheaper, faster and more efficient than traditional DeFi platforms, making it more accessible to everyone. Learn more here." />
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

      <button className="menuButton" onClick={() => setOpenBar(openBar => !openBar)}>
        {!openBar ? <MdSpaceDashboard /> : <MdClose />}
      </button>

      <main className="flex flex-col justify-center align-items-center text-center">
        <Sticky onStateChange={handleStateChange}>
          <div className={cn(!stickyNav ? 'stuck' : '', 'tertiary-nav')}>
            <div className="container">
              <ul>
                <li><a onClick={() => setIsBuyModalVisible(true)}>Buy</a></li>
                <li><a onClick={() => setOpenSideBar(true)}>Exchange</a></li>
              </ul>
            </div>
          </div>
          <section className={cn(!stickyNav ? 'tab-stuck' : '', 'tabs')} ref={ref}>
            <div id="topGraphic">
              <PageBreak />
            </div>
            <div className="container">
              <div className="tab-container">
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
                  <li><ScrollLink to='distribution' activeClass='selected' spy={true}><span>Fair</span> Distribution</ScrollLink></li>
                  <li><ScrollLink to='allocation' activeClass='selected' spy={true}><span>Token</span> Allocaton</ScrollLink></li>
                </ul>
                <div className="utility-nav">
                  {/* <NativeBalance /> */}
                  <Account />
                </div>
              </div>
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
                  <div className="pieContainer">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={300} height={300}>
                        <Pie
                          dataKey="value"
                          isAnimationActive={false}
                          data={data01}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#275dba"
                          label
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
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

      <animated.div style={{ left: left }} className="sidebar">
        <button className="menuButton" onClick={() => setOpenBar(openBar => !openBar)}>
          {!openBar ? <MdSpaceDashboard /> : <MdClose />}
        </button>

        <div className="sidebar-menu">
          <div className="tile">
            <ScrollLink to='supply' activeClass='selected' spy={true}>
              <MdGeneratingTokens />
              Supply
            </ScrollLink>
          </div>
          <div className="tile">
            <ScrollLink to='terms' activeClass='selected' spy={true}>
              <MdGeneratingTokens />
              Terms
            </ScrollLink>
          </div>
          <div className="tile">
            <ScrollLink to='distribution' activeClass='selected' spy={true}>
              <MdGeneratingTokens />
              <span>Fair</span> Distribution
              <p>No front-running</p>
            </ScrollLink>
          </div>
          <div className="tile">
            <ScrollLink to='allocation' activeClass='selected' spy={true}>
              <MdGeneratingTokens />
              <span>Token</span> Allocaton
            </ScrollLink>
          </div>
        </div>
      </animated.div>

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
      <Modal
        visible={isBuyModalVisible}
        footer={null}
        onCancel={() => setIsBuyModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="500px"
      >
        Buy
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
            minHeight: "300px",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          {/* <Ramper /> */}
          <p className="coming-soon">Coming Soon</p>
        </Card>
      </Modal>
    </div>

  );
}

