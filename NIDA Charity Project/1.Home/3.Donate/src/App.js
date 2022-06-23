import React from "react";
import styles from "./App.module.css";
import UniqeButton from "./components/Button/UniqeButton";
import UniqeInput from "./components/Input/UniqeInput";
import Contract from "./contract/contract";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: 0,
      amount: "",
      currentAmount: 0,
      totalAmount: 1000,
      compatible: true,
    };
  }

  render() {
    if (this.state.compatible)
      return (
        <div className={styles.bg}>
          <div className={styles.card} style={{ width: "50%", height: "45%" }}>
            <h1>NIDA CHARITY</h1>
            <h3 style={{ marginTop: -8 }}>บริจาคเพื่อสนับสนุนการศึกษากับ NIDA</h3>
            <div className={styles.container}>
              <div style={{ width: "60%", flex: 3, marginLeft: "20px" }}>
            <img src="https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.6435-9/141359544_3824287854295992_99183296332839293_n.jpg?_nc_cat=103&amp;ccb=1-7&amp;_nc_sid=730e14&amp;_nc_eui2=AeF-M0up_CY1U9B8Jzm2aFN_eyT2Q5VRK3x7JPZDlVErfC9jvq5STYBoq9oO7WeTT_-D9_qSqE3CuegUYMDqlwug&amp;_nc_ohc=4q1O5ckypikAX-dqE4y&amp;_nc_ht=scontent.fbkk2-8.fna&amp;oh=00_AT8xlhmZ28x3yasCIBKYaLeN0lgrQEIcRLYnPRl1hU3YMQ&amp;oe=62C7DE4B" alt = "" width="300" height="140"></img>
                <h3>
                  {this.state.currentAmount.toLocaleString()} ETH raised of{" "}
                  {this.state.totalAmount.toLocaleString()} ETH
                </h3>
                <div className={styles.back}>
                  <div
                    className={styles.front}
                    style={{ width: `${this.state.ratio}%` }}
                  ></div>
                </div>
              </div>
              <div style={{ flex: 2 }}></div>
              <div style={{ marginTop: "0px", flex: 2 }}>
            <img src="https://d25k40v8e40hv8.cloudfront.net/ueditor/php/upload/image/20210504/1620114738909857.jpeg" alt = "" width="100" height="60"></img>
                <UniqeInput
                  onChange={(event) =>
                    this.setState({ amount: event.target.value })
                  }
                  value={this.state.amount}
                  placeholder="       ETH Amount"
                  height="30px"
                  width="150px"
                />
                <div style={{ marginTop: "5px" }}></div>
                <UniqeButton
                  onClick={() => {
                    if (
                      !isNaN(Number(this.state.amount)) &&
                      this.state.amount !== ""
                    ) {
                      Contract.fund(this.state.amount);
                    }
                  }}
                >
                  Fund
                </UniqeButton>
              </div>
            </div>
          </div>
        </div>
      );
    else return <NotCompatible />;
  }
  async getAmount() {
    let current = await Contract.current();
    let total = await Contract.total();
    console.log(current);
    console.log(total);
    this.setState({
      ratio: (current / total) * 100,
      currentAmount: parseFloat(current),
      totalAmount: parseFloat(total),
    });
    console.log(this.state.ratio);
  }

  componentDidMount() {
    //check browser compatibility
    Contract.checkCompatible().then((res) => {
      if (res) {
        this.getAmount();
        setInterval(() => {
          this.getAmount();
        }, 2000);
      } else this.setState({ compatible: false });
    });
  }
}

const NotCompatible = () => {
  return (
    <div
      className={styles.bg}
      style={{
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1>Your browser is not Dapps compatible</h1>
      <a href="https://metamask.io">
        <div style={{ margin: "0 20px" }}>
          <img
            src="https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2022/03/Metamask-cover.png"
            width="100%"
          ></img>
        </div>
      </a>
    </div>
  );
};

export default App;