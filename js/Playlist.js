import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'

import { Container } from 'flux/utils'
import OnAirStore from './flux/OnAirStore'
import Song from './components/Song'
import Separator from './components/Separator'
import {
  windowStyles,
  headerStyles,
  listStyles,
  bannerStyles,
  basicInfoBoxStyles
} from './styles/components'
import { colors } from './styles/main'
import { ScrollView } from 'react-native-gesture-handler'
import Moment from 'moment'

class Playlist extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Playlist'),
      ...headerStyles
    }
  }

  static getStores() {
    return [OnAirStore]
  }

  static calculateState(prevState) {
    return {
      on_air: OnAirStore.getState() //todo create a songs state and only update that
    }
  }

  constructor() {
    super()

    this.state = {
      on_air: {
        name: '',
        dj: '',
        dj_url: '',
        beginning: '',
        ending: '',
        times: '',
        show_notes: null,
        songs: [],
        semester_id: -1
      }
    }
  }

  componentDidMount() {
    this.fetchPlaylist().then(() => {
      this.props.navigation.setParams({ title: this.state.on_air.name })
    })
  }

  fetchPlaylist() {
    return new Promise((resolve, reject) => {
      fetch('https://app.wcbn.org/playlist.json')
        .then(response => response.json())
        .then(data => {
          data.on_air.songs.forEach(song => {
            song.at = Moment(song.at).format('h:mm A')
          })
          this.setState({
            on_air: data.on_air
          })
          resolve()
        })
    })
  }

  renderHeader = () => {
    return (
      <View style={listStyles.sectionHeader}>
        <Text style={listStyles.sectionHeaderText}>Recent Songs</Text>
      </View>
    )
  }

  renderBanner() {
    return (
      <TouchableOpacity
        style={bannerStyles}
        onPress={() =>
          this.props.navigation.navigate('Profile', {
            url: this.state.on_air.dj_url,
            title: this.state.on_air.dj
          })
        }
      >
        <Text style={bannerStyles.text}>On the air: </Text>
        <Text style={bannerStyles.host}>{this.state.on_air.dj}</Text>
        <Text style={bannerStyles.arrow}>→</Text>
      </TouchableOpacity>
    )
  }

  renderSongs() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.on_air.songs}
          renderItem={({ item }) => <Song data={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={() => (
            <Separator color={colors.grayHighlight} />
          )}
        />
      </ScrollView>
    )
  }

  renderNotice() {
    return (
      <View style={basicInfoBoxStyles}>
        <Text style={{ color: colors.inactive }}>
          No recent songs to display
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={windowStyles.container}>
        {this.renderBanner()}
        <Separator color={colors.inactive} />
        {this.state.on_air.songs.length
          ? this.renderSongs()
          : this.renderNotice()}
      </View>
    )
  }
}

export default Container.create(Playlist)
