import { Accordion } from 'native-base';
import * as React from 'react';
import { List } from 'react-native-paper';
import { Text } from 'react-native';

const AccordionTab = ({title,bodyText}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  // </List.Section>
  //   <List.Accordion
  //     title="Uncontrolled Accordion"
  //     left={props => <List.Icon {...props} icon="folder" />}>
  //     <List.Item title="First item" />
  //     <List.Item title="Second item" />
  //   </List.Accordion> 

  return (
    // <List.Section title={title}>
     
     <List.Accordion
        title={title}
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        {
          bodyText
        }
      </List.Accordion>
   
  );
};

export default AccordionTab;