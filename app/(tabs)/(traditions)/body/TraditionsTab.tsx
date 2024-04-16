import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import TraditionDataService, { Tradition } from '../../../../store/TraditionDataService';
import TraditionDetails from './TraditionDetails';

interface TraditionsTabState {
  selectedVolume: number;
  selectedTradition: Tradition | null;
}

class TraditionsTab extends React.Component<{}, TraditionsTabState> {
  traditionDataService: TraditionDataService;

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedVolume: 1,
      selectedTradition: null,
    };
    this.traditionDataService = new TraditionDataService();
  }

  render() {
    const tabTitle = [1, 2, 3, 4, 5, 6, 7]; // Volumes

    if (this.state.selectedTradition) {
      // do the navigation instead
      return (
        <TraditionDetails tradition={this.state.selectedTradition} />
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabTitle.map((volume, index) => (
            <TouchableOpacity
              key={index}
              style={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: this.state.selectedVolume === volume ? 'lightgray' : 'white',
                margin: 5,
              }}
              onPress={() => this.setState({ selectedVolume: volume })}
            >
              <Text>{`Volume ${volume}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView>
          {this.renderTraditionList(this.state.selectedVolume)}
        </ScrollView>
      </SafeAreaView>
    );
  }

  renderTraditionList(volume: number) {
    const traditions = this.traditionDataService.getTraditionsByVolume(volume);

    return (
      <View>
        {traditions.map((tradition) => (
          <TouchableOpacity
            key={tradition.id}
            style={{ padding: 10 }}
            onPress={() => this.setState({ selectedTradition: tradition })}
          >
            <Text>{tradition.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default TraditionsTab;
