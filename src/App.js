import { Container } from "semantic-ui-react";
import "./App.css";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import { useEffect, useState } from "react";
import EntryLines from "./components/EntryLines";
import ModalEdit from "./components/ModalEdit";
import { useSelector, useDispatch } from 'react-redux'
import { getAllEntries } from "./actions/entries.actions";

function App() {

    const [incomeTotal, setIncomeTotal] = useState(0)
    const [expensesTotal, setExpensesTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [entry, setEntry] = useState(null)

    const entries = useSelector(state => state.entries)
    const { isOpen, id } = useSelector(state => state.modals)

    const dispatch = useDispatch()

    useEffect(() => {
        const index = entries.findIndex(entry => entry.id === id)
        setEntry(entries[index])
    }, [isOpen, id, entries]);

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

    

    useEffect(()=> {
      dispatch(getAllEntries())
    }, [])


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
                />

                <MainHeader type="h3" title="Add new Transaction" />
                <NewEntryForm />
                <ModalEdit
                    isOpen={isOpen}
                    {...entry}
                />
            </Container>
        </div>
    );
}

export default App;
