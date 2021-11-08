import React from 'react';
import { Button, ButtonToolbar, Content, Form, Input, InputProps, Loader, Panel } from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';
import Contract from '../Controllers/Contract';

interface PostFormState {
    value: string,
    isLoading: boolean
}
class PostForm extends React.Component<any, PostFormState>{
    Textarea: React.ForwardRefExoticComponent<any>;
    constructor(props: any){
        super(props);

        this.Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => <Input {...props} as="textarea" ref={ref} />);
        this.state = {
            value: "",
            isLoading: false
        }
        this.onMessageChanged = this.onMessageChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(){
        this.setState({isLoading: true});
        try{
            const c = new Contract();
            const result = await c.post(this.state.value);
            console.log(result);
        } catch(err){
            console.log(err);
        } finally {
            this.setState({isLoading: false});
        }
    }
    
    onMessageChanged(value: string, event: React.ChangeEvent<HTMLInputElement>){
        this.setState({value: value});
    }

    render(){
        return (
            <Content>
                <Panel>
                    <Form fluid disabled={this.state.isLoading}>
                        <FormGroup controlId="textarea">
                            <Form.ControlLabel>Message</Form.ControlLabel>
                            <Form.Control name="textarea" onChange={this.onMessageChanged} value={this.state.value} accepter={this.Textarea} placeholder="Type your message (0.0015 ETH)" />
                        </FormGroup>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button appearance="primary" onClick={this.onSubmit} disabled={this.state.isLoading}>Submit</Button>
                                <Button appearance="default" onClick={() => this.setState({value: ""})} disabled={this.state.isLoading}>Clear</Button>
                                {(this.state.isLoading)?<Loader />:null}
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Panel>
            </Content>
        );
    }
}
export default PostForm;