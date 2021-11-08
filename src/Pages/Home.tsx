import React from 'react';
import { Panel } from 'rsuite';
import MetaMask from '../Components/MetaMask';
import Post from '../Components/Post';
import PostForm from '../Components/PostForm';
import Contract from '../Controllers/Contract';

interface HomeState {
    data: any[]
};
class Home extends React.Component<any, HomeState>{
    constructor(props: any){
        super(props);
        this.state = {
            data: []
        };
    }
    async componentDidMount(){
        await this.getList();
        this.Subscribe();
    }
    async Subscribe(){
        const c = new Contract();
        c.subscribe("logs", (e,r) => {
            console.log(`Logs received`, r);
        }).on("data", async (data) => {
            console.log(`Data received`, data);
            await this.getList();
        });
    }
    async getList(){
        const c = new Contract();
        let result: any[] = await c.get();
        const cResult = [...result];
        this.setState({
            data: cResult.reverse()
        });
    }
    render () {
        return (
            <Panel header={<h3>AOM's Diary</h3>} shaded bordered>
                <MetaMask />
                <PostForm />
                {
                    this.state.data.map((x,i) => {
                        const sortIndex = this.state.data.length - i;
                        return <Post key={i} index={sortIndex} message={x.Message} from={x.Sender} timestamp={x.Timestamp} />;
                    })
                }
            </Panel>
        );
    }
}
export default Home;