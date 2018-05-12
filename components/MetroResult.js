import React, { Component } from "react"
import { StyleSheet, ScrollView, Text, View } from "react-native"
import { Card, Icon, ListItem } from "react-native-elements"
import { connect } from 'react-redux'
import actions from '../actions'
import moment from 'moment'

class MetroResult extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { shortestPath } = this.props
        const { departureStationName,
            arrivalStationName,
            stationsCount,
            transfersCount,
            itinerary } = shortestPath

        const stationsCountStr = (stationsCount > 1) ? `${stationsCount} stops` : `${stationsCount} stop`
        const transfersCountStr = (transfersCount > 1) ? `${transfersCount} connections` : `${transfersCount} connection`

        const linesCard = itinerary.map((itineraryPart, i) => {
            const stationsList = itineraryPart.stationsNames.map((stationName, j) =>
                <ListItem
                    key={j}
                    title={stationName}
                    leftIcon={{ name: 'location-on', 
                                type: 'material', 
                                color: '#929FAA'
                             }}
                    containerStyle={styles.containerStyle}
                />)
            return (<Card title={itineraryPart.line} key={i}>
                        <View style={styles.linesCard}>
                            {stationsList}
                        </View>
                    </Card>)
        })

        return (
            <ScrollView style={styles.container}>
                <Card>
                    <View style={styles.infoCard}>
                        <Text style={{ flex: 1, textAlign: 'left', fontWeight: 'bold'}}>{stationsCountStr}</Text>
                        <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold'}}>{transfersCountStr}</Text>
                    </View>
                </Card>
                <Card>
                    <View style={styles.endPointsCard}>
                        <Icon
                            name='home'
                            type='entypo'
                            color='#929FAA'
                        />
                    <Text style={styles.endPointsText}>{departureStationName}</Text>
                    </View>
                </Card>
                { linesCard }
                <Card containerStyle={{ marginBottom: 20 }}>
                    <View style={styles.endPointsCard}>
                        <Icon
                                name='target'
                                type='material-community'
                                color='#929FAA'
                        />
                        <Text style={styles.endPointsText}>{arrivalStationName}</Text>
                    </View>
                </Card>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F1F3'
    },
    infoCard: {
        flex: 1,
        flexDirection: 'row'
    },
    endPointsCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    endPointsText: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    linesCard: {
        flex: 1
    },
    containerStyle: {
        padding:2
    }
})

const mapStateToProps = (state) => {
    const { shortestPath } = state.result
    return { shortestPath }
}

export default connect(mapStateToProps, actions)(MetroResult)