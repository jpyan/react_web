import React from 'react';
import nba from 'nba';
import { Profile } from './Profile';
import { DataViewContainer } from './DataViewContainer';
import { SearchBar} from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';


export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo( { PlayerID: nba.findPlayer(playerName).playerId } )
                .then((info) => {
                    console.log(info)
                    // copy info.playerHeadlineStats[0] and add to info.commonPlayerInfo[0]
                    const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                    this.setState({playerInfo: playerInfo});
                })
    }


    render() {
        return (
            <div className="main">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                <div className="player">
                        <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                        <Profile playerInfo={this.state.playerInfo} />
                    </div>
            </div>
        );
    }
}
