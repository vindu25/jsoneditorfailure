import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import dynamic from 'next/dynamic';
import Container from "@material-ui/core/Container";

const Editor = dynamic(
  () => import('../src/components/JSONEditorReact'),
  {ssr: false}
);

const testPayload = {
  "firstName": "John",
  "lastName": "Wick",
  "address": {
    "street1": "221B Baker Street",
    "city": "London",
    "country": "UK",
    "zipcode": "NW1 6XE",
  }
};

export default function Anomaly() {

  const [editorText, setEditorText] = React.useState(JSON.stringify(testPayload, null, 2));
  const [mode, setMode] = React.useState('tree');

  const onTextChange = (text) => {
    setEditorText(JSON.stringify(JSON.parse(text || {}), null, 2));
  };

  const onModeChange = (mode) => {
    setMode(mode)
  };

  const onCreateMenu = (items, node) => {
    console.log('items:', items, 'node:', node);
    return items
  };

  const onValidation = (json) => {
    const errors = [];
    console.log(json);
    return errors;
  };

  const onValidationError = (error) => {
    console.log(`onve`, error);
  };

  const onEdit = (node) => {
    console.log(node);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Card variant={"outlined"}>
            <CardContent style={{height: '535px'}}>
              <Editor
                text={editorText}
                mode={mode}
                modes={['tree', 'view', 'code']}
                indentation={4}
                onChangeText={onTextChange}
                onModeChange={onModeChange}
                onCreateMenu={onCreateMenu}
                onValidationError={onValidationError}
                onValidate={onValidation}
                // onEditable={onEdit} // Commented out as it is causing an issue.
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
