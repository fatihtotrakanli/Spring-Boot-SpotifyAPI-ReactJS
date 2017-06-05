import React, {Component} from 'react';
import Rating from "pre-rating/lib/Rating";
import "./SpotifyApp.css";
import PropTypes from "prop-types";

export default class TableItem extends Component {

    static propTypes:Map = {
        /**
         * Data of Albums and Artists
         */
        data: PropTypes.object.isRequired,
        /**
         * Image URL
         */
        image: PropTypes.string
    };

    render() {

        let data = this.props.data;
        let image = this.props.image;

        return (
            <tr>
                <td className="alignTd"><img src={image} alt="55x55" width="55"
                                                                           height="55"/></td>
                <td className="alignTd">{data.artists[0].name}</td>
                <td className="alignTd">{data.name}</td>
                <td className="alignTd">{data.album.name}</td>
                <td className="alignTd">{data.album.album_type}</td>
                <td className="alignTd">{data.type}</td>
                <td className="alignTd"><Rating size={0}
                                                currentValue={data.popularity / 10}
                                                disabled
                /></td>
                <td className="alignTd"><i className="fa fa-play" aria-hidden="true"
                                           onClick={this.__playButtonClick.bind(undefined, data.preview_url)}/>
                </td>
            </tr>
        );
    }

    __playButtonClick = (url) => {
        window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
    };
}
