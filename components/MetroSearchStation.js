import React, { Component } from "react"
import { StyleSheet, View, Platform, ScrollView } from "react-native"
import { ListItem, SearchBar } from "react-native-elements"
import {connect} from 'react-redux'
import actions from '../actions'

class MetroSearchStation extends Component {
    constructor(props) {
        super(props)
        this.selectStation = this.selectStation.bind(this)
    }

    selectStation(station) {
        const { target } = this.props
        const { updateSearch, updatePage } = this.props
        if (target === "origin") {
            updateSearch({ origin: station, stationQuery:'' })
        } else {
            updateSearch({ destination: station, stationQuery:'' })
        }
        updatePage("search")
    }

    render() {
        const { stationQuery, allStations } = this.props
        const { updateSearch } = this.props
        const displayedStationsList = (stationQuery.length >= 1) ?
            <ScrollView>
                {
                    allStations
                        .filter(station => station.toLowerCase().startsWith(stationQuery.toLowerCase()))
                        .map((station, i) => (
                            <ListItem
                                key={i}
                                title={station}
                                chevron
                                bottomDivider
                                onPress={() => this.selectStation(station)}
                            />
                        ))
                }
            </ScrollView> : null

        return (
            <View style={styles.container}>
                <SearchBar
                    value={stationQuery}
                    onChangeText={stationQuery => {
                        updateSearch({ stationQuery });
                    }}
                    platform={Platform.OS}
                    placeholder='Type here...' />
                { displayedStationsList }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F1F3'
    }
})

const mapStateToProps = (state) => {
    const { stationQuery, allStations } = state.search
    return { stationQuery, allStations }
}

export default connect(mapStateToProps, actions)(MetroSearchStation)