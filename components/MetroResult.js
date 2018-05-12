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

        /* 
            const linesList = itinerary.map((itineraryPart) => {
                const stationsList = itineraryPart.stationsNames.map((stationName) =>
                    <List.Item><Icon name='angle down' />{ stationName }</List.Item>);
                return (
                    <Container>
                        <Header size='small' dividing textAlign='center'>
                            <Icon name='subway' />{itineraryPart.line}
                        </Header>
                        <List>
                            { stationsList }
                        </List>
                    </Container>
                );
            });
        */

        const stationsCountStr = (stationsCount > 1) ? `${stationsCount} stops` : `${stationsCount} stop`
        const transfersCountStr = (transfersCount > 1) ? `${transfersCount} connections` : `${transfersCount} connection`

        return (
            <ScrollView style={styles.container}>
                <Card>
                    <View style={styles.infoCard}>
                        <Text style={{ flex: 1, textAlign: 'left' }}>{stationsCountStr}</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>{transfersCountStr}</Text>
                    </View>
                </Card>
                <Card>
                    <View style={styles.endPointsCard}>
                        <Text style={{ flex: 1, textAlign: 'center' }}>{departureStationName}</Text>
                    </View>
                </Card>
                {itinerary.map((itineraryPart) => {
                    <Card title={itineraryPart.line}>
                        <View style={styles.endPointsCard}>
                            {itineraryPart.stationsNames.map((stationName, i) => {
                                <ListItem
                                    key={i}
                                    title={stationName}
                                />
                            })}
                        </View>
                    </Card>
                })}
                <Card>
                    <View style={styles.endPointsCard}>
                        <Text style={{ flex: 1, textAlign: 'center' }}>{arrivalStationName}</Text>
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
    },
    linesCard: {
        flex: 1,
    }
})

const mapStateToProps = (state) => {
    const { shortestPath } = state.result
    return { shortestPath, origin, destination }
}

export default connect(mapStateToProps, actions)(MetroResult)