import React from "react";
import { formatMs, Grid } from '@material-ui/core';
import youtube from "./api/youtube";
import { SearchBar, VideoList, VideoDetail } from './components';

class App extends React.Component {

    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount(){
        this.handelSubmit('iraqi songs')
    }

    onVideoSelect = (video) => {
        this.setState( {selectedVideo: video} ) 
    }

    handelSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyCsP_N6D1Mns_xPiLN-zrFtvX-hR5fk3sw',
                q: searchTerm
            }
        });

        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0]})
    }

    render() {
        const { selectedVideo, videos } = this.state;
        return (
            <Grid justifyContent="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handelSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        )
    }
}

export default App;