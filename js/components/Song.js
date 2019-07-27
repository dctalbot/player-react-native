import React from 'react'
import { StyleSheet, View } from 'react-native'
import ThemedText from './ThemedText'
import ListItemTime from './ListItemTime'
import ListItemWrapper from './ListItemWrapper'

const SongName = props => (
  <ThemedText style={styles.songName} numberOfLines={2}>
    {props.name}
  </ThemedText>
)

const SongDetails = props => (
  <ThemedText style={styles.songDetails} numberOfLines={1}>
    {props.artist}
    {props.album ? ` • ${props.album}` : ''}
    {/* {props.label && props.year ? ` (${props.label}, ${props.year})` : ''} */}
  </ThemedText>
)

export default (Song = props => (
  <ListItemWrapper>
    <View style={styles.textWrapper}>
      <SongName name={props.data.name} />
      <SongDetails
        artist={props.data.artist}
        album={props.data.album}
        // label={props.data.label}
        // year={props.data.year}
      />
    </View>
    <ListItemTime at={props.data.at} />
  </ListItemWrapper>
))

const styles = StyleSheet.create({
  textWrapper: {
    maxWidth: '85%'
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 3
  },
  songDetails: {
    fontSize: 13
  }
})
