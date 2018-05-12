import React, { Component } from "react"
import { StyleSheet, ScrollView, Text, View } from "react-native"
import { Card, Icon } from "react-native-elements"
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

        return (
            <ScrollView style={styles.container}>
                <Text>Results page</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F1F3'
    },
    mainCard: {
        flex: 1,
        flexDirection: 'row'
    }
})

const mapStateToProps = (state) => {
    const { shortestPath } = state.result
    return { shortestPath, origin, destination }
}

export default connect(mapStateToProps, actions)(MetroResult)