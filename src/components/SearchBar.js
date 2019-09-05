import React from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';
const Option = AutoComplete.Option;

// put in main bc its easy to pass info to profile and DataViewContainer
export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    onSelect = (playerName) => {
        this.props.loadPlayerInfo(playerName);
    }

    handleSearch = (value) => {
        // console.log('Match:', nba.searchPlayers(value)); 
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(({ fullName, playerId }) =>
                <Option key={playerId} value={fullName}>
                     {/*get player id for find image*/}
                    <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}/>
                    <span className="player-option-label">{fullName}</span>
                </Option>
            ),
        });
    }

    render() {
        window.nba = nba;

        const { dataSource } = this.state;
        return (
            <AutoComplete
                className="search-bar"
                dataSource={dataSource}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA player"
                size='large'
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search"/>} />
            </AutoComplete>
        );
    }
}
