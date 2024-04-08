import { Checkbox, Form, Segment } from "semantic-ui-react";

function EntryForm({value, setValue, description, setDescription, isExpense, setIsExpense}) {
    return (
        <>
            <Form.Group>
                <Form.Input
                    icon="tags"
                    width={12}
                    label="Description"
                    placeholder="New shinny thing"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Input
                    width={4}
                    label="Value"
                    placeholder="100.00"
                    icon="dollar"
                    iconPosition="left"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Form.Group>
            <Segment compact>
                <Checkbox toggle label='is expense' checked={isExpense} onChange={() => setIsExpense(!isExpense)}/>
            </Segment>
        </>
    );
}

export default EntryForm;
