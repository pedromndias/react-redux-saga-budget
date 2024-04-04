import { Container } from "semantic-ui-react";
import "./App.css";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import { useState } from "react";
import EntryLines from "./components/EntryLines";

let initialEntries = [
    {
        id: 1,
        description: "Work income",
        value: "$1000",
        isExpense: false,
    },
    {
        id: 2,
        description: "Water bill",
        value: "$20",
        isExpense: true,
    },
    {
        id: 3,
        description: "Rent",
        value: "$300",
        isExpense: true,
    },
    {
        id: 4,
        description: "Power bill",
        value: "$50",
        isExpense: true,
    },
];

function App() {
    const [entries, setEntries] = useState(initialEntries);

    const deleteEntry = (id)  => {
      const result = entries.filter(entry => entry.id !== id)
      setEntries(result)
    }

    return (
        <div className="App">
            <Container>
                <MainHeader title="Budget" />

                <DisplayBalance
                    title="Your Balance:"
                    value="2,550.53"
                    size="small"
                />

                <DisplayBalances />

                <MainHeader type="h3" title="History" />

                <EntryLines entries={entries} deleteEntry={deleteEntry} />

                <MainHeader type="h3" title="Add new Transaction" />
                <NewEntryForm />
            </Container>
        </div>
    );
}

export default App;
