import React from 'react';
import './App.css';
import { Content, FlexboxGrid, Footer } from 'rsuite';
import Home from './Pages/Home';

import "rsuite/dist/rsuite.min.css";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Content style={{margin:'1em', textAlign:'left'}}>
                <Home />
              </Content>
              <Content style={{margin:'1em'}}>
                <Footer>Copy and Paste by <b>@AOM</b></Footer>
              </Content>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </div>
    );
  }
}

export default App;
