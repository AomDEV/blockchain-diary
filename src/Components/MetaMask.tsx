import { useMetaMask } from 'metamask-react';
import React from 'react';
import { Button, Content, Panel } from 'rsuite';

const LoadMetaMask = () => {
    const { status, connect, account } = useMetaMask();
    if(status === 'connected') {
        localStorage.setItem(`account`, account ?? "unknow");
        return(<Content>Connected: <b>{account}</b></Content>);
    }
    if(status === 'connecting') return(<Content>Connecting</Content>);
    if(status === 'initializing') return(<Content>Initializing</Content>);
    if(status === 'notConnected') return(<Button appearance="primary" onClick={async () => await connect()}>Connect to MetaMask</Button>);
    if(status === 'unavailable') return(<Content>MetaMask is unavailable</Content>);
    
    return (null);
}

class MetaMask extends React.Component{
    constructor(props: any){
        super(props);
        this.state = {
            metamask: null
        };
    }
    render(){
        return (
            <Content>
                <Panel bordered shaded>
                <LoadMetaMask />
                </Panel>
            </Content>
        );
    }
}
export default (MetaMask);