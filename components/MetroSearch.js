import React, { Component } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native"
import { Button, Input, Icon } from "react-native-elements"
import { connect } from 'react-redux'
import actions from '../actions'

class MetroSearch extends Component {
    constructor(props) {
        super(props)
        this.clearSearchCriteria = this.clearSearchCriteria.bind(this)
    }

    clearSearchCriteria() {
        const { updateSearch } = this.props
        updateSearch({ origin: '', destination: '', stationQuery:'' })
    }

    render() {
        const { origin, destination, loading } = this.props
        const { updatePage, updateSearch, findShortestPath } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.searchView}>
                    <TouchableOpacity
                        onPress={() => {
                            if(!loading) {
                                updateSearch({ stationQuery: origin || '' })
                                updatePage("searchOrigin")
                            }
                        }}
                        style={styles.searchTouchableOpacity}>
                        <Input
                            inputContainerStyle={styles.searchInput}
                            leftIcon={
                                <Icon
                                    name='home'
                                    type='entypo'
                                    color='#929FAA'
                                    size={20}
                                />
                            }
                            inputStyle={styles.searchText}
                            placeholder="From station"
                            autoFocus={false}
                            placeholderTextColor="#929FAA"
                            editable={false}
                            value={(origin || '').substring(0, 30)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if(!loading) {
                                updateSearch({ stationQuery: destination || '' })
                                updatePage("searchDestination")
                            }
                        }}
                        style={styles.searchTouchableOpacity}>
                        <Input
                            leftIcon={
                                <Icon
                                    name='target'
                                    type='material-community'
                                    color='#929FAA'
                                    size={20}
                                />
                            }
                            inputContainerStyle={styles.searchInput}
                            inputStyle={styles.searchText}
                            placeholder="To station"
                            autoFocus={false}
                            placeholderTextColor="#929FAA"
                            editable={false}
                            value={(destination || '').substring(0, 30)}
                        />
                    </TouchableOpacity>
                    <View style={styles.buttons}>
                        <Button
                            title='CLEAR'
                            onPress={() => { !loading && this.clearSearchCriteria() }}
                            buttonStyle={styles.clearButton}
                        />
                        <Button
                            title="SEARCH"
                            onPress={() => findShortestPath(origin, destination)}
                            buttonStyle={styles.searchButton}
                            loading={loading}
                            disabled={!origin || !destination || loading || (origin===destination)}
                            disabledStyle={ (loading)? styles.searchButton : styles.disabledSearchButton }
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F1F3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchView: {
        width: 300,
        height: 400,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#DBDFE3',
        borderWidth: 1
    },
    searchTouchableOpacity: {
        width: 270,
        marginVertical: 10
    },
    searchInput: {
        width: 270,
        height: 50,
        borderWidth: 2,
        borderColor: "#DBDFE3",
    },
    buttons: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButton: {
        width: 130,
        height: 50,
        backgroundColor: '#485F71',
        margin: 5,
        borderRadius: 30
    },
    searchButton: {
        width: 130,
        height: 50,
        backgroundColor: '#3799CF',
        margin: 5,
        borderRadius: 30
    },
    disabledSearchButton: {
        width: 130,
        height: 50,
        backgroundColor: '#CBD1D7',
        margin: 5,
        borderRadius: 30
    },
    searchText: {
        fontSize: 16,
        color: 'black'
    }
})

const mapStateToProps = (state) => {
    const { origin, destination, loading } = state.search
    return { origin, destination, loading }
}

export default connect(mapStateToProps, actions)(MetroSearch)