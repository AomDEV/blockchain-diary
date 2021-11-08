import Web3 from "web3";
import ABI from "../ABI.json";
import { AbiItem, toWei } from 'web3-utils'

class Contract{
    private ContractAddress: string = "0x719739B1150070296210dcB3E0A22E731992d87a";
    private getWeb3(){
        const web3 = new Web3(Web3.givenProvider || null);
        return web3;
    }
    private getContract() {
        const abi = ABI as AbiItem[];
        const web3 = this.getWeb3();
        const Post = new web3.eth.Contract(abi, this.ContractAddress);
        Post.defaultChain = "rinkeby";
        const Methods = Post.methods;
        return Methods;
    }
    private async getAddress(){
        try{
            const web3 = this.getWeb3();
            const acc = await web3.eth.getAccounts();
            return acc[0];
        } catch (err) {
            return null;
        }
    }
    public async post(message: string): Promise<any>{
        return this.getContract().post(message).send({ from: await this.getAddress(), value: toWei("0.0015", "ether") });
    }
    public get(): Promise<any>{
        return this.getContract().get().call();
    }
    public subscribe(type: any = "logs", callback: ((error: Error, logs: any)=>void | undefined)){
        const web3 = this.getWeb3();
        return web3.eth.subscribe(type, {
            address: this.ContractAddress,
            topics: ['0x08cfa05aa673fecdb4d91e4c5bc4052d6b8e5c9aab2199b0cce53cc178be5ef2']
        }, callback);
    }
}
export default Contract