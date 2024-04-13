import { Container } from "semantic-ui-react";
import "./App.css";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import { useEffect, useState } from "react";
import EntryLines from "./components/EntryLines";
import ModalEdit from "./components/ModalEdit";
import { useSelector } from 'react-redux'

function App() {
    
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [isExpense, setIsExpense] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [entryId, setEntryId] = useState(null);

    const [incomeTotal, setIncomeTotal] = useState(0)
    const [expensesTotal, setExpensesTotal] = useState(0)
    const [total, setTotal] = useState(0)

    const entries = useSelector(state => state.entries)
    const isOpenRedux = useSelector(state => state.modals.isOpen)

    useEffect(() => {
        if (!isOpen && entryId) {
            const index = entries.findIndex((entry) => entry.id === entryId);
            const newEntries = [...entries];
            newEntries[index].description = description;
            newEntries[index].value = value;
            newEntries[index].isExpense = isExpense;
            // setEntries(newEntries);

            resetEntry();
        }
    }, [isOpen]);

    useEffect(() => {
      let totalIncome = 0
      let totalExpenses = 0
      entries.forEach(entry => {
        if(entry.isExpense) {
          return totalExpenses += Number(entry.value)
        } else {
          return totalIncome += Number(entry.value)
        }
      })
      setTotal(totalIncome - totalExpenses)
      setExpensesTotal(totalExpenses)
      setIncomeTotal(totalIncome)
    }, [entries])

    const addEntry = () => {
        const result = entries.concat({
            id: entries.length + 1,
            description,
            value,
            isExpense,
        });
        // setEntries(result);
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
                    value={total}
                    size="small"
                />

                <DisplayBalances expensesTotal={expensesTotal} incomeTotal={incomeTotal}/>

                <MainHeader type="h3" title="History" />

                <EntryLines
                    entries={entries}
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
                    isOpen={isOpenRedux}
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
