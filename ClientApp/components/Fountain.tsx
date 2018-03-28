import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as StellarSdk from 'stellar-sdk';

import { Tabs, Tab } from 'react-bootstrap';
import Instructions from './Instructions/Instructions';

interface IState {
    selectedToken: string;
    issuerAccountId: string;
    address?: string;
    addressIsValid?: boolean;
    hasEnoughXlm: boolean;
    canAcceptToken: boolean;
    key?: number;
    onSelect?: Function;

}

interface MyObj {
    balances: number[];
}

interface IProps extends RouteComponentProps<{}> {
    address?: string;
    addressIsValid?: boolean;
    meow: (address: string) => any;
    // handleSelect: (tabKey: number) => any;
    onSelect?: Function;
    key: number;

}

export default class Fountain extends React.Component<IProps, IState>  {
    constructor(props: IProps, context: any) {
        super(props, context);
        // set initial state
        this.state = {
            selectedToken: "SECOND",
            issuerAccountId: "",
            address: "",
            addressIsValid: false,
            hasEnoughXlm: false,
            canAcceptToken: false,
            key: 1
        }

        // this.handleSelect = this.handleSelect.bind(this);
    }

    meow = (address: string) => {
        // console.log(address);

        if (StellarSdk.StrKey.isValidEd25519PublicKey(address)) {
            this.setState({ addressIsValid: true });
            // console.log("corr")
            let server = new StellarSdk.Server('https://horizon.stellar.org');
            server.accounts()
                .accountId(address)
                .call().then((r) => {
                    console.log(r);

                    // console.log(typeof r);
                    // console.log(Object.getOwnPropertyNames(r));
                    // console.log(JSON.stringify(r));
                    // console.log(JSON.parse(JSON.stringify(r)));
                    let result = JSON.parse(JSON.stringify(r));
                    // console.log("result.id", result.id);
                    // console.log("result.balances", result.balances);

                    // alert(result.id);

                    if (result.balances[result.balances.length - 1].balance >= 4.5) {
                        this.setState({ hasEnoughXlm: true });
                        // alert("more than 4.5");

                    } else {
                        this.setState({ hasEnoughXlm: false });
                        // alert("less than 4.5");
                    }


                    // I moved this entire chunk from outter to inner. Not 100% sure if that was correct.
                    let canAcceptToken = false;
                    result.balances.forEach((b: any) => {
                        if (b.asset_code) {
                            // console.log("typeof b.asset_code", typeof b.asset_code);
                            console.log("compare balances accepted vs. tab's token", this.state.selectedToken.toUpperCase(), b.asset_code.toUpperCase());
                            if (this.state.selectedToken.toUpperCase() === b.asset_code.toUpperCase()) {
                                canAcceptToken = true;
                                // There's no built-in ability to break in forEach. https://stackoverflow.com/a/2641374
                            }
                        }
                    });
                    console.log(canAcceptToken);
                    if (canAcceptToken) {
                        this.setState({ canAcceptToken: true });
                    } else {
                        this.setState({ canAcceptToken: false });
                    }



                });
        } else { // if query entered into field isn't a valid public key
            console.log("query entered into field isn't a valid public key")
            this.setState({ addressIsValid: false, hasEnoughXlm: false, canAcceptToken: false });
        }

        this.setState({ address: address });
    }

    handleSelect = (key: any) => {
        // alert(`selected ${key}`);

        switch (key) {
            case 1: {
                this.setState({ key: key, selectedToken: "SECOND" });
                break;
            }
            case 2: {
                this.setState({ key: key, selectedToken: "MINUTE" });
                break;
            }
            case 3: {
                this.setState({ key: key, selectedToken: "HOUR" });
                break;
            }
            case 4: {
                this.setState({ key: key, selectedToken: "DAY" });
                break;
            }
            case 5: {
                this.setState({ key: key, selectedToken: "WEEK" });
                break;
            }
            case 6: {
                this.setState({ key: key, selectedToken: "MONTH" });
                break;
            }
            case 7: {
                this.setState({ key: key, selectedToken: "YEAR" });
                break;
            }
            default: {
                //statements; 
                break;
            }
        }

    }


    public render() {
        return <div>
            {/* <Tabs defaultActiveKey={3} id="uncontrolled-tab-example" animation={false}> */}

            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="uncontrolled-tab-example" animation={false}>

                {/* <Tabs activeKey={this.state.key} onSelect={this.handleSelect} animation={false} id="controlled-tab-example"> */}

                <Tab eventKey={1} title="SECOND">
                    <Instructions tokenName="SECOND" issuerAccountId="GAYZT6ZQCWRSUYUYKTTMX2BACITUQRXZPBXLY7H5PJ4WUNJU6ZET42W5" address={this.state.address} addressIsValid={this.state.addressIsValid} hasEnoughXlm={this.state.hasEnoughXlm} canAcceptToken={this.state.canAcceptToken} meow={this.meow} />
                </Tab>
                <Tab eventKey={2} title="MINUTE">
                    <Instructions tokenName="MINUTE" issuerAccountId="GCLU3JPHTGA6KTWP77VZ44VJKCYA2K2F7CDLWBYL5KQQ6XC27F44XWGM" address={this.state.address} addressIsValid={this.state.addressIsValid} hasEnoughXlm={this.state.hasEnoughXlm} canAcceptToken={this.state.canAcceptToken} meow={this.meow} />
                </Tab>
                <Tab eventKey={3} title="HOUR">
                    <Instructions tokenName="HOUR" issuerAccountId="GA2L7HVLDVJ76HKSPGR3IRD2ZX2AWHRPGA7PKAEGNUIAPKIL72GX5UEG" address={this.state.address} addressIsValid={this.state.addressIsValid} hasEnoughXlm={this.state.hasEnoughXlm} canAcceptToken={this.state.canAcceptToken} meow={this.meow} />
                </Tab>
                <Tab eventKey={4} title="DAY">
                    <Instructions tokenName="DAY" issuerAccountId="GAELLKQPLBQVZZURK7JT45U22RQIU2DN57HPGBOGQYJLPGN25NEZKT7U" address={this.state.address} addressIsValid={this.state.addressIsValid} hasEnoughXlm={this.state.hasEnoughXlm} canAcceptToken={this.state.canAcceptToken} meow={this.meow} />
                </Tab>
                <Tab eventKey={5} title="WEEK">
                    <Instructions tokenName="WEEK" issuerAccountId="GAKMD63LOOLWXNJOQPIZ6IF2MW3ABHT2N6RE4H3ECU57JQMUGDIBP5X2" address={this.state.address} addressIsValid={this.state.addressIsValid} hasEnoughXlm={this.state.hasEnoughXlm} canAcceptToken={this.state.canAcceptToken} meow={this.meow} />
                </Tab>
                <Tab eventKey={6} title="MONTH">
                    <Instructions tokenName="MONTH" issuerAccountId="GAHOPLW6VEXFCZK4PC3RZHDQIASRA4NM7IUXLBSLNUUZ2CL4F5ITYDLF" address={this.state.address} addressIsValid={this.state.addressIsValid} hasEnoughXlm={this.state.hasEnoughXlm} canAcceptToken={this.state.canAcceptToken} meow={this.meow} />
                </Tab>
                <Tab eventKey={7} title="YEAR">
                    <Instructions tokenName="YEAR" issuerAccountId="GAHE3PVC4QE5TBOMXKVOQF56ZMOPSDJ6WSLQJPDNSPROVRCXRBUPGLFU" address={this.state.address} addressIsValid={this.state.addressIsValid} hasEnoughXlm={this.state.hasEnoughXlm} canAcceptToken={this.state.canAcceptToken} meow={this.meow} />
                </Tab>
            </Tabs>
        </div>;
    }
}