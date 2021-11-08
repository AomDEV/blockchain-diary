import moment from 'moment';
import React from 'react';
import { Badge, Content, Panel } from 'rsuite';

class Post extends React.Component<any, any>{
    render(){
        return (
            <Content style={{margin:'1em'}}>
                <Panel bordered header={<h4><Badge color="blue" content={`#${this.props.index}`} /> {this.props.message}</h4>}>
                    <span style={{fontSize:'0.75em'}}><i>From <b>{this.props.from}</b> ({moment.unix(this.props.timestamp).fromNow()})</i></span>
                </Panel>
            </Content>
        );
    }
}
export default Post;