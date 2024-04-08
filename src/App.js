import { Container } from "semantic-ui-react";
import "./App.css";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import { useEffect, useState } from "react";
import EntryLines from "./components/EntryLines";
import ModalEdit from "./components/ModalEdit";

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

    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [isExpense, setIsExpense] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [entryId, setEntryId] = useState(null);

    useEffect(() => {
        if (!isOpen && entryId) {
            const index = entries.findIndex((entry) => entry.id === entryId);
            const newEntries = [...entries];
            newEntries[index].description = description;
            newEntries[index].value = value;
            newEntries[index].isExpense = isExpense;
            setEntries(newEntries);
            resetEntry();
        }
    }, [isOpen]);

    const deleteEntry = (id) => {
        const result = entries.filter((entry) => entry.id !== id);
        setEntries(result);
    };

    const addEntry = () => {
        const result = entries.concat({
            id: entries.length + 1,
            description,
            value,
            isExpense,
        });
        setEntries(result);
        resetEntry()
    };

    const editEntry = (id) => {
        console.log("Edit entry with id ", id);
        if (id) {
            const index = entries.findIndex((entry) => entry.id === id);
            const entry = entries[index];
            setEntryId(id);
            setDescription(entry.description);
            setValue(entry.value);
            setIsExpense(entry.isExpense);
            setIsOpen(true);
        }
    };

    const resetEntry = () => {
        setDescription("");
        setValue("");
        setIsExpense(true);
    };

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

                <EntryLines
                    entries={entries}
                    deleteEntry={deleteEntry}
                    setIsOpen={setIsOpen}
                    editEntry={editEntry}
                />

                <MainHeader type="h3" title="Add new Transaction" />
                <NewEntryForm
                    addEntry={addEntry}
                    description={description}
                    setDescription={setDescription}
                    value={value}
                    setValue={setValue}
                    isExpense={isExpense}
                    setIsExpense={setIsExpense}
                />
                <ModalEdit
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    addEntry={addEntry}
                    description={description}
                    setDescription={setDescription}
                    value={value}
                    setValue={setValue}
                    isExpense={isExpense}
                    setIsExpense={setIsExpense}
                />
            </Container>
        </div>
    );
}

export default App;
