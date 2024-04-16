import React from 'react';
import { View, Text, ScrollView } from 'react-native';

interface TraditionDetailsProps {
  tradition: {
    title: string;
    arabic: string;
    english: string;
    references: string[];
    notes: string[];
  };
}

class TraditionDetails extends React.Component<TraditionDetailsProps> {
  render() {
    const { tradition } = this.props;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{tradition.title}</Text>
          <Text style={{ marginBottom: 10 }}>{tradition.arabic}</Text>
          <Text style={{ marginBottom: 10 }}>{tradition.english}</Text>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>References:</Text>
            {tradition.references.map((reference, index) => (
              <Text key={index}>{reference}</Text>
            ))}
          </View>
          
          {tradition.notes.length > 0 && (
            <View>
              <Text style={{ fontWeight: 'bold' }}>Notes:</Text>
              {tradition.notes.map((note, index) => (
                <Text key={index}>{note}</Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default TraditionDetails;
