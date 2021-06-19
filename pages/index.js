import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableSize: 3,
            player1: null,
            player2: null,
        };
    }

    render() {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Digio Assignment: XO</title>
                    <meta name="XO game" content="Digio Assignment: XO" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div style={{ width: "100%", height: "100%", backgroundColor: "red" }}></div>

                <footer className={styles.footer}>Digio Assignment: XO, June 2021</footer>
            </div>
        );
    }
}

export default Home;
