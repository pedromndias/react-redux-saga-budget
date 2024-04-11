import { Container } from "semantic-ui-react";
import "./App.css";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import { useEffect, useState } from "react";
import EntryLines from "./components/EntryLines";
import ModalEdit from "./components/ModalEdit";
import { createStore } from "redux"

let initialEntries = [
    {
        id: 1,
        description: "Work income",
        value: 1000,
        isExpense: false,
    },
    {
        id: 2,
        description: "Water bill",
        value: 20,
        isExpense: true,
    },
    {
        id: 3,
        description: "Rent",
        value: 300,
        isExpense: true,
    },
    {
        id: 4,
        description: "Power bill",
        value: 50,
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

    const [incomeTotal, setIncomeTotal] = useState(0)
    const [expensesTotal, setExpensesTotal] = useState(0)
    const [total, setTotal] = useState(0)

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

    const store = createStore((state = (initialEntries), action) => {
      console.log(action);
      let newEntries
      switch (action.type) {
        case 'ADD_ENTRY':
          newEntries = state.concat({...action.payload})
          return newEntries
        case 'REMOVE_ENTRY':
          newEntries = state.filter(entry => entry.id !== action.payload.id)
          return newEntries
        default:
          return state
      }
    })
    store.subscribe(() => {
      console.log('store: ', store.getState());
    })
    const payload_add = {
      id: 5,
      description: "Hello from Redux",
      value: 100,
      isExpense: false
    }
    const payload_remove = {
      id: 1
    }

    const addEntryRedux = (payload) => {
      return {type: 'ADD_ENTRY', payload: payload_add}
    }
    const removeEntryRedux = (id) => {
      return {type: 'REMOVE_ENTRY', payload: id}
    }

    store.dispatch(addEntryRedux(payload_add))
    store.dispatch(addEntryRedux(payload_add))
    store.dispatch(addEntryRedux(payload_add))
    store.dispatch(removeEntryRedux(payload_remove))
    
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
                    value={total}
                    size="small"
                />

                <DisplayBalances expensesTotal={expensesTotal} incomeTotal={incomeTotal}/>

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
