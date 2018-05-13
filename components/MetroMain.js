import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { connect } from 'react-redux'
import { Header, Icon } from "react-native-elements"
import MetroSearch from "./MetroSearch"
import MetroResult from "./MetroResult"
import MetroSearchStation from "./MetroSearchStation"
import actions from '../actions'

class MetroMain extends Component {
    constructor(props) {
        super(props)
        this.goHome = this.goHome.bind(this)
    }

    goHome() {
        const { updatePage, updateSearch, updateResult } = this.props
        updatePage('search')
        updateSearch({ stationQuery: '' })
        updateResult({ shortestPath: {} })
    }

    componentDidMount() {
        const { findStations } = this.props
        findStations()
    }

    render() {
        const { page, loading } = this.props

        const backButton = (page !== "search") ? 
            (<Icon
            name='arrow-back'
            color='#ffffff'
            onPress={() => { !loading && this.goHome() }}
            />) : null

        return (<View style={styles.container}>
            <Header
                centerComponent={{ text: 'Paris Metro Dijkstra\'s Path', style: styles.headerText }}
                leftComponent={ backButton }
                outerContainerStyles={ styles.header }
            />
            {page === "search" && <MetroSearch />}
            {page === "searchOrigin" && <MetroSearchStation target="origin" />}
            {page === "searchDestination" && <MetroSearchStation target="destination" />}
            {page === "result" && <MetroResult />}
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 10,
        height: 50,
        backgroundColor: '#152836'
    },
    headerText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize:18
    }
})

const mapStateToProps = (state) => {
    const { page } = state.app
    const { loading } = state.search
    return { page }
}

export default connect(mapStateToProps, actions)(MetroMain)