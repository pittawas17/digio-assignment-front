import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableSize: 3,
            player1: [],
            player2: [],
            isP1Turn: true,
            winner: null,
        };
    }

    checkHorizontal(array) {
        for (let i = 0; i < this.state.tableSize; i++) {
            let winArray = [];
            for (let j = 0; j < this.state.tableSize; j++) {
                winArray.push(i * this.state.tableSize + j);
            }
            if (winArray.every((child) => array.includes(child))) {
                return true;
            }
        }
        return false;
    }

    checkVertical(array) {
        for (let i = 0; i < this.state.tableSize; i++) {
            let winArray = [];
            for (let j = 0; j < this.state.tableSize; j++) {
                winArray.push(j * this.state.tableSize + i);
            }
            if (winArray.every((child) => array.includes(child))) {
                return true;
            }
        }
        return false;
    }

    checkDiagonal(array) {
        let winArray1 = [];
        let winArray2 = [];

        for (let i = 0; i < this.state.tableSize; i++) {
            winArray1.push((this.state.tableSize - 1) * (i + 1));
        }
        for (let j = 0; j < this.state.tableSize; j++) {
            winArray2.push(this.state.tableSize * j + j);
        }

        if (winArray1.every((child) => array.includes(child))) {
            return true;
        }
        if (winArray2.every((child) => array.includes(child))) {
            return true;
        }
        return false;
    }

    checkResult(player, array) {
        if (this.checkHorizontal(array) || this.checkVertical(array) || this.checkDiagonal(array)) this.setState({ winner: player });
        else console.log("No Winner!");
    }

    selectPosition(i) {
        if (!this.state.winner) {
            if (this.state.isP1Turn) {
                let array = [...this.state.player1, i];
                this.setState({ player1: array, isP1Turn: !this.state.isP1Turn });
                this.checkResult("Player 1", array);
            } else {
                let array = [...this.state.player2, i];
                this.setState({ player2: array, isP1Turn: !this.state.isP1Turn });
                this.checkResult("Player 2", array);
            }
        }
    }

    restart() {
        this.setState({ winner: null, player1: [], player2: [], isP1Turn: true });
    }

    render() {
        let tableArray = [];
        let area = this.state.tableSize * this.state.tableSize;
        for (let i = 0; i < area; i++) {
            tableArray.push(
                <div
                    style={{
                        height: 100 / this.state.tableSize + "%",
                        width: 100 / this.state.tableSize + "%",
                        borderTop: i < this.state.tableSize ? "0" : "5px solid black",
                        borderBottom: i >= area - this.state.tableSize ? "0" : "5px solid black",
                        borderLeft: i % this.state.tableSize === 0 ? "0" : "5px solid black",
                        borderRight: i % this.state.tableSize === this.state.tableSize - 1 ? "0" : "5px solid black",
                    }}
                    key={i}
                >
                    {this.state.player1.includes(i) && (
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                            <Image src="/x.png" layout="fill" />
                        </div>
                    )}
                    {this.state.player2.includes(i) && (
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                            <Image src="/o.png" layout="fill" />
                        </div>
                    )}
                    {!this.state.player1.includes(i) && !this.state.player2.includes(i) && (
                        <div onClick={() => this.selectPosition(i)} style={{ width: "100%", height: "100%" }}>
                            {i}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={styles.container}>
                <Head>
                    <title>Digio Assignment: XO</title>
                    <meta name="XO game" content="Digio Assignment: XO" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
                        crossorigin="anonymous"
                    ></link>
                </Head>

                <main style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ marginBottom: "20px", fontSize: "20px", display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#b4ecb4", paddingTop: "1rem" }}>
                        <label>Table size: </label>
                        <input
                            type="number"
                            name="tableSize"
                            value={this.state.tableSize}
                            onChange={(e) => {
                                e.target.value > 3 ? this.setState({ tableSize: e.target.value }) : this.setState({ tableSize: 3 });
                            }}
                            min="3"
                            style={{ margin: "0 10px 10px 10px", width: "50px" }}
                        />
                        <span>
                            x {this.state.tableSize}
                            {this.state.tableSize === 3 && <span> (Minimum value)</span>}
                        </span>
                    </div>

                    <div style={{ display: "flex", paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                        <div className={styles.table} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", position: "relative" }}>
                            {this.state.winner && (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "rgba(0,0,0,0.8)",
                                        position: "absolute",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        borderRadius: "2%",
                                        zIndex: 2,
                                    }}
                                >
                                    <p style={{ color: "white", fontSize: "5em" }}>{this.state.winner} win!!!</p>
                                    <div onClick={() => this.restart()} class="btn btn-primary btn-lg" style={{ fontSize: "2em" }}>
                                        <Image src="/restart.png" width="19em" height="19em" />
                                        &nbsp;&nbsp;Restart
                                    </div>
                                </div>
                            )}
                            {tableArray}
                        </div>

                        <div className={styles.replay} style={{ backgroundColor: "red", width: "520px", height: "100%", padding: "10px 50px" }}>
                            <p style={{ fontSize: "2rem", textAlign: "center", borderBottom: "3px solid black" }}>History</p>
                        </div>
                        {/* <div>
                            <p>xx zjaklsdjaksjdklasjdklasjdkladlkajdslkasdklfjasldkfjk;asdjflajsdlkfjaskldfjklasjdflkasjldkfjaskldjflkasjdfkl</p>
                        </div> */}
                    </div>
                </main>

                {/* <footer className={styles.footer}>Digio Assignment: XO, June 2021</footer> */}
            </div>
        );
    }
}

export default Home;
