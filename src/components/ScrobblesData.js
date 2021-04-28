import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUser, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';

export const ScrobblesData = ({ userName, apiKey }) => {
    const [scrobbles, updateScrobbles] = useState({});

    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${userName}&api_key=${apiKey}&nowplaying=true&format=json`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('error');
            })
            .then(data => updateScrobbles(data))
            .catch(() => updateScrobbles({ error: 'Sumthin went wrong :(' }));
    });

    const resultsData = () => {
        const { error } = scrobbles;
        const track = scrobbles?.recenttracks?.track;
        console.log(track);
        
        // Show error message
        if (error) {
            return (
                <p>{error}</p>
            )
        }

        // Show 'Loading' paragraph when track info is not available
        if (!track) {
            return (
                <p>Loading..</p>
            )
        }

        const image = track[0].image.find(img => img.size === 'large');
        let imageLarge = 'defaultImageUrl';
        if (image && image['#text']) {
            imageLarge = image['#text'];
        }

        const name = track[0].name;
        const artist = track[0].artist['#text'];
        const album = track[0].album['#text'];
        const url = track[0].url;
        

        // Check if music is currenly playing and
        // return info about current song
        if (track.length > 0) {
            const trarray = track[0];
            if (trarray['@attr'] && trarray['@attr']['nowplaying']) {
                    return (
                        <div className='container'>
                            <div className='playingStatus'>
                                    <p>Now playing</p> 
                            </div>
                            <div className='trackInfo'>
                                <div className='trackImage'>
                                    <a href={url} target='_blank' rel='noreferrer'>
                                        <img src={imageLarge} alt='Album cover' />
                                    </a>
                                </div>
                                <div className='trackDetails'>
                                    <div className='detailItem'>
                                        <p className='detailHeader'><FontAwesomeIcon icon={faMusic} /> Track</p>
                                        <p className='trackName scrollText'>{name}</p>
                                    </div>
                                    <div className='detailItem'>
                                        <p className='detailHeader'><FontAwesomeIcon icon={faUser} /> Artist</p>
                                        <p className='trackArtist scrollText'>{artist}</p>
                                    </div>
                                    <div className='detailItem'>
                                        <p className='detailHeader'><FontAwesomeIcon icon={faRecordVinyl} /> Album</p>
                                        <p className='trackAlbum scrollText'>{album}</p>
                                    </div>    
                                </div>
                            </div>
                            <div className='recentTracks'>
                                <hr />
                                <div className='recentItem'>
                                    <p className='recentName'>{track[1].name}</p>
                                    <p>{track[1].artist['#text']}</p>
                                    <p className='recentDate'>Listened {track[1].date['#text'] + ' UTC+0'}</p>
                                </div>
                                <hr />
                                <div className='recentItem'>
                                    <p className='recentName'>{track[2].name}</p>
                                    <p>{track[2].artist['#text']}</p>
                                    <p className='recentDate'>Listened {track[2].date['#text'] + ' UTC+0'}</p>
                                </div>
                                <hr />
                                <div className='recentItem'>
                                    <p className='recentName'>{track[3].name}</p>
                                    <p>{track[3].artist['#text']}</p>
                                    <p className='recentDate'>Listened {track[3].date['#text'] + ' UTC+0'}</p>
                                </div>
                            </div>
                        </div>
                    )
            }
        }

        // Return info about recent listened track
        // if music is not currently playing
        return (
            <div className='container'>
                <div className='playingStatus'>
                    <p>Recently played tracks</p>
                </div>
                <div className='recentTracks'>
                    <hr />
                    <div className='recentItem'>
                        <p className='recentName'>{track[1].name}</p>
                        <p>{track[1].artist['#text']}</p>
                        <p className='recentDate'>Listened {track[1].date['#text'] + ' UTC+0'}</p>
                    </div>
                    <hr />
                    <div className='recentItem'>
                        <p className='recentName'>{track[2].name}</p>
                        <p>{track[2].artist['#text']}</p>
                        <p className='recentDate'>Listened {track[2].date['#text'] + ' UTC+0'}</p>
                    </div>
                    <hr />
                    <div className='recentItem'>
                        <p className='recentName'>{track[3].name}</p>
                        <p>{track[3].artist['#text']}</p>
                        <p className='recentDate'>Listened {track[3].date['#text'] + ' UTC+0'}</p>
                    </div>
                    <hr />
                    <div className='recentItem'>
                        <p className='recentName'>{track[4].name}</p>
                        <p>{track[4].artist['#text']}</p>
                        <p className='recentDate'>Listened {track[4].date['#text'] + ' UTC+0'}</p>
                    </div>
                    <hr />
                    <div className='recentItem'>
                        <p className='recentName'>{track[5].name}</p>
                        <p>{track[5].artist['#text']}</p>
                        <p className='recentDate'>Listened {track[5].date['#text'] + ' UTC+0'}</p>
                    </div>
                </div>
            </div>  
        )
    }
    return resultsData();
}

export default ScrobblesData;