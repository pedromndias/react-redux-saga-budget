import { Container, Grid, Icon, Segment } from "semantic-ui-react"
import './App.css';
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";

function App() {
  return (
    <div className="App">
      <Container>
        <MainHeader title="Budget"/>

        <DisplayBalance title="Your Balance:" value="2,550.53" size="small" />

        <DisplayBalances />

        <MainHeader type="h3" title="History"/>

        <Segment color="red">
          <Grid columns={3} textAlign="right">
            <Grid.Row>
              <Grid.Column width={10} textAlign="left">Something</Grid.Column>
              <Grid.Column width={3} textAlign="right">$10.00</Grid.Column>
              <Grid.Column width={3}>
                <Icon name="edit" bordered />
                <Icon name="trash" bordered />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment color="green">
          <Grid columns={3} textAlign="right">
            <Grid.Row>
              <Grid.Column width={10} textAlign="left">Something Else</Grid.Column>
              <Grid.Column width={3} textAlign="right">$15.00</Grid.Column>
              <Grid.Column width={3}>
                <Icon name="edit" bordered />
                <Icon name="trash" bordered />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment color="red">
          <Grid columns={3} textAlign="right">
            <Grid.Row>
              <Grid.Column width={10} textAlign="left">Something</Grid.Column>
              <Grid.Column width={3} textAlign="right">$20.00</Grid.Column>
              <Grid.Column width={3}>
                <Icon name="edit" bordered />
                <Icon name="trash" bordered />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <MainHeader type="h3" title="Add new Transaction" />
        <NewEntryForm />

      </Container>
    </div>
  );
}

export default App;
